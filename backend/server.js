const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 8787;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "change-me";
const DATA_FILE = path.join(__dirname, "data", "bookings.json");
const APP_ROOT = path.join(__dirname, "..");
const WEBSITE_URL = process.env.WEBSITE_URL || `http://localhost:${PORT}`;

const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || "").toLowerCase();
const SMS_PROVIDER = (process.env.SMS_PROVIDER || "").toLowerCase();
const EMAIL_WEBHOOK_URL = process.env.EMAIL_WEBHOOK_URL || "";
const SMS_WEBHOOK_URL = process.env.SMS_WEBHOOK_URL || "";
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER || "";
const NOTIFY_TIMEOUT_MS = Number(process.env.NOTIFY_TIMEOUT_MS || 8000);

const STATUS = {
    pending: "PENDING_PARTNER_CONFIRMATION",
    confirmed: "CONFIRMED_BY_PROVIDER",
    rejected: "REJECTED_BY_PROVIDER",
    escalated: "ESCALATED_MANUAL_REVIEW",
};

function readBookings() {
    try {
          const raw = fs.readFileSync(DATA_FILE, "utf8");
          return JSON.parse(raw);
    } catch (_error) {
          return [];
    }
}

function writeBookings(bookings) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
}

function sendJson(res, statusCode, body) {
    res.writeHead(statusCode, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, x-webhook-secret",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    });
    res.end(JSON.stringify(body));
}

function sendFile(res, filePath) {
    fs.readFile(filePath, (error, data) => {
          if (error) return sendJson(res, 404, { error: "Static file not found" });
          const ext = path.extname(filePath).toLowerCase();
          const contentTypes = {
                  ".html": "text/html; charset=utf-8",
                  ".css": "text/css; charset=utf-8",
                  ".js": "application/javascript; charset=utf-8",
                  ".json": "application/json; charset=utf-8",
          };
          res.writeHead(200, {
                  "Content-Type": contentTypes[ext] || "application/octet-stream",
                  "Cache-Control": "no-cache",
          });
          res.end(data);
    });
}

function sendHtmlFile(res, filePath) {
    fs.readFile(filePath, "utf8", (error, data) => {
          if (error) return sendJson(res, 404, { error: "Static file not found" });
          const html = data.replaceAll("__WEBSITE_URL__", WEBSITE_URL);
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
          res.end(html);
    });
}

function sendText(res, statusCode, body, contentType) {
    res.writeHead(statusCode, { "Content-Type": contentType, "Cache-Control": "no-cache" });
    res.end(body);
}

function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => { try { resolve(body ? JSON.parse(body) : {}); } catch (e) { reject(e); } });
          req.on("error", reject);
    });
}

function createBookingId() {
    return `GB-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function getNotificationProvider(channel) {
    const explicit = (channel === "email" ? EMAIL_PROVIDER : SMS_PROVIDER) || "";
    if (explicit) return explicit;
    if (channel === "email") {
          if (SENDGRID_API_KEY && EMAIL_FROM) return "sendgrid";
          if (EMAIL_WEBHOOK_URL) return "webhook";
          return "none";
    }
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER) return "twilio";
    if (SMS_WEBHOOK_URL) return "webhook";
    return "none";
}

function isProviderConfigured(channel, provider) {
    if (provider === "sendgrid") return Boolean(SENDGRID_API_KEY && EMAIL_FROM);
    if (provider === "twilio") return Boolean(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER);
    if (provider === "webhook") return Boolean(channel === "email" ? EMAIL_WEBHOOK_URL : SMS_WEBHOOK_URL);
    return false;
}

function buildNotification(channel, recipient, booking) {
    const provider = getNotificationProvider(channel);
    const configured = isProviderConfigured(channel, provider);
    return {
          channel, provider, recipient,
          status: configured ? "PENDING_SEND" : "NOT_CONFIGURED",
          lastAttemptAt: null, deliveredAt: null,
          detail: configured
            ? `Queued for outbound ${channel.toUpperCase()} dispatch via ${provider}.`
                  : `No ${channel.toUpperCase()} provider configured on the server.`,
          bookingId: booking.id,
    };
}

function buildCustomerMessage(payload) {
    return (
          `GlobeTirtha Booking ${payload.bookingId}\n` +
          `Destination: ${payload.destinationName} — ${payload.spot}\n` +
          `Status: ${payload.status}\n` +
          `IMPORTANT: Do not travel until status is CONFIRMED_BY_PROVIDER.\n` +
          `Check status: ${payload.websiteUrl}`
        );
}

function buildSmsMessage(payload) {
    return `GlobeTirtha ${payload.bookingId}: ${payload.status}.`;
}

async function sendViaSendGrid(notification, payload) {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${SENDGRID_API_KEY}` },
          body: JSON.stringify({
                  personalizations: [{ to: [{ email: notification.recipient }] }],
                  from: { email: EMAIL_FROM, name: "GlobeTirtha Bookings" },
                  subject: `GlobeTirtha Booking Received — ${payload.bookingId}`,
                  content: [{ type: "text/plain", value: payload.message }],
          }),
          signal: AbortSignal.timeout(NOTIFY_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`SendGrid returned HTTP ${res.status}`);
}

async function sendViaTwilio(notification, payload) {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    const form = new URLSearchParams({ To: notification.recipient, From: TWILIO_FROM_NUMBER, Body: payload.message });
    const basic = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
    const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${basic}` },
          body: form,
          signal: AbortSignal.timeout(NOTIFY_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Twilio returned HTTP ${res.status}`);
}

async function sendViaWebhook(notification, payload) {
    const webhookUrl = notification.channel === "email" ? EMAIL_WEBHOOK_URL : SMS_WEBHOOK_URL;
    const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(NOTIFY_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Webhook gateway returned HTTP ${res.status}`);
}

async function dispatchNotification(notification, payload) {
    if (!notification.recipient) {
          notification.status = "MISSING_RECIPIENT";
          notification.detail = `No ${notification.channel} recipient was provided.`;
          return notification;
    }
    const provider = notification.provider || getNotificationProvider(notification.channel);
    notification.provider = provider;
    if (!isProviderConfigured(notification.channel, provider)) {
          notification.status = "NOT_CONFIGURED";
          notification.detail = `No ${notification.channel.toUpperCase()} provider configured on the server.`;
          return notification;
    }
    notification.lastAttemptAt = new Date().toISOString();
    try {
          if (provider === "sendgrid") await sendViaSendGrid(notification, payload);
          else if (provider === "twilio") await sendViaTwilio(notification, payload);
          else await sendViaWebhook(notification, payload);
          notification.status = "SENT_TO_GATEWAY";
          notification.deliveredAt = new Date().toISOString();
          notification.detail = `${notification.channel.toUpperCase()} accepted by ${provider} gateway.`;
    } catch (error) {
          notification.status = "FAILED_TO_SEND";
          notification.detail = `${notification.channel.toUpperCase()} dispatch failed via ${provider}: ${error.message}`;
    }
    return notification;
}

async function dispatchNotificationsForBooking(booking) {
    if (!Array.isArray(booking.notifications)) return booking;
    const payloadBase = {
          event: "BOOKING_REQUEST_RECEIVED",
          bookingId: booking.id,
          destinationName: booking.destinationName,
          spot: booking.spot,
          status: booking.status,
          websiteUrl: `${WEBSITE_URL}/?booking=${booking.id}`,
    };
    for (const notification of booking.notifications) {
          await dispatchNotification(notification, {
                  ...payloadBase,
                  channel: notification.channel,
                  recipient: notification.recipient,
                  customerName: booking.customer?.name || "Customer",
                  message: notification.channel === "sms" ? buildSmsMessage(payloadBase) : buildCustomerMessage(payloadBase),
          });
    }
    return booking;
}

function persistBookingNotifications(booking) {
    try {
          const all = readBookings();
          const index = all.findIndex((item) => item.id === booking.id);
          if (index >= 0) {
                  all[index].notifications = booking.notifications;
                  writeBookings(all);
          }
    } catch (_error) {
          // Background persistence failure is non-fatal; status remains PENDING_SEND until retried.
    }
}

function dispatchNotificationsInBackground(booking) {
    dispatchNotificationsForBooking(booking)
          .then(() => persistBookingNotifications(booking))
          .catch(() => {});
}

function minutesBetween(fromIso, toDate) {
    return Math.max(0, Math.floor((toDate.getTime() - new Date(fromIso).getTime()) / 60000));
}

function getSlaPolicy(purpose, accommodationNights) {
    const spotMax = purpose === "pilgrimage" ? 20 : purpose === "both" ? 25 : 12;
    const stayMax = accommodationNights > 0 ? (purpose === "pilgrimage" ? 15 : 10) : 0;
    return {
          checkEverySeconds: 30,
          globalMaxWaitMinutes: Math.max(spotMax, stayMax || 0),
          spotMaxWaitMinutes: spotMax,
          stayMaxWaitMinutes: stayMax,
          userMessage: "Most providers confirm in a few minutes; if delayed beyond SLA, booking is escalated for support/rebook/refund.",
    };
}

function evaluateBookingLifecycle(booking) {
    const now = new Date();
    const elapsedMinutes = minutesBetween(booking.createdAt, now);
    const components = booking.components || [];
    let hasRejected = false, allConfirmed = components.length > 0, hasOverduePending = false;
    components.forEach((c) => {
          if (c.status === STATUS.rejected) hasRejected = true;
          if (c.status !== STATUS.confirmed) allConfirmed = false;
          if (c.status === "PENDING_PROVIDER" && elapsedMinutes > Number(c.maxWaitMinutes || booking.sla?.globalMaxWaitMinutes || 20)) {
                  hasOverduePending = true;
                  c.status = "PENDING_PROVIDER_DELAYED";
          }
    });
    if (hasRejected) {
          booking.status = STATUS.rejected;
          booking.paymentStatus = "REFUND_REQUIRED";
          booking.nextAction = "Offer alternate slot/provider or immediate refund flow.";
    } else if (allConfirmed) {
          booking.status = STATUS.confirmed;
          booking.paymentStatus = "CAPTURED";
          booking.nextAction = "Send final voucher and provider-confirmed ticket details.";
    } else if (hasOverduePending) {
          booking.status = STATUS.escalated;
          booking.paymentStatus = "AUTHORIZED_HOLD";
          booking.nextAction = "Escalate to operations desk. Offer user alternate options or refund within SLA breach policy.";
    } else {
          booking.status = STATUS.pending;
          booking.paymentStatus = "AUTHORIZED_HOLD";
          booking.nextAction = "Continue provider polling/webhook wait and keep user informed.";
    }
    booking.elapsedMinutes = elapsedMinutes;
    booking.etaMinutesRemaining = Math.max(0, Number(booking.sla?.globalMaxWaitMinutes || 20) - elapsedMinutes);
    booking.updatedAt = new Date().toISOString();
    return booking;
}

const server = http.createServer(async (req, res) => {
    if (req.method === "OPTIONS") return sendJson(res, 200, { ok: true });
    if (req.method === "GET" && (req.url === "/" || req.url === "/app")) return sendHtmlFile(res, path.join(APP_ROOT, "index.html"));
    if (req.method === "GET" && req.url === "/styles.css") return sendFile(res, path.join(APP_ROOT, "styles.css"));
    if (req.method === "GET" && req.url === "/app.js") return sendFile(res, path.join(APP_ROOT, "app.js"));
    if (req.method === "GET" && req.url === "/robots.txt") return sendText(res, 200, `User-agent: *\nAllow: /\nSitemap: ${WEBSITE_URL}/sitemap.xml\n`, "text/plain; charset=utf-8");
    if (req.method === "GET" && req.url === "/sitemap.xml") return sendText(res, 200, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${WEBSITE_URL}/</loc></url>\n  <url><loc>${WEBSITE_URL}/api</loc></url>\n</urlset>\n`, "application/xml; charset=utf-8");
    if (req.method === "GET" && req.url === "/site.webmanifest") return sendJson(res, 200, { name: "GlobeTirtha", short_name: "GlobeTirtha", start_url: "/", display: "standalone", background_color: "#f3f7f6", theme_color: "#0b6f53", description: "Holy place and vacation booking website with global geo discovery." });
    if (req.method === "GET" && req.url === "/api") return sendJson(res, 200, { ok: true, docs: ["GET /api/health", "POST /api/bookings", "GET /api/bookings/:id", "POST /api/provider-webhook"] });
    if (req.method === "GET" && req.url === "/api/health") return sendJson(res, 200, { ok: true, service: "globetirtha-booking-api", notifications: { emailProvider: getNotificationProvider("email"), smsProvider: getNotificationProvider("sms") } });

                                   if (req.method === "POST" && req.url === "/api/bookings") {
                                         try {
                                                 const payload = await parseJsonBody(req);
                                                 const bookings = readBookings();
                                                 const accommodationNights = Number(payload.accommodationNights || 0);
                                                 const sla = getSlaPolicy(payload.purpose, accommodationNights);
                                                 const booking = {
                                                           id: createBookingId(), status: STATUS.pending, createdAt: new Date().toISOString(),
                                                           destinationId: payload.destinationId, destinationName: payload.destinationName,
                                                           spot: payload.spot, date: payload.date, purpose: payload.purpose, accommodationNights,
                                                           customer: payload.customer, notes: payload.notes, source: payload.source,
                                                           providerReference: null, paymentStatus: "AUTHORIZED_HOLD",
                                                           paymentPolicy: { holdUntilStatus: [STATUS.confirmed, STATUS.rejected, STATUS.escalated], captureOn: STATUS.confirmed, refundOn: [STATUS.rejected] },
                                                           components: [
                                                             { type: "spot", label: payload.spot || "Destination Slot", status: "PENDING_PROVIDER", maxWaitMinutes: sla.spotMaxWaitMinutes },
                                                                       ...(accommodationNights > 0 ? [{ type: "accommodation", label: `${accommodationNights} night(s) accommodation`, status: "PENDING_PROVIDER", maxWaitMinutes: sla.stayMaxWaitMinutes }] : []),
                                                                     ],
                                                           sla, notifications: [],
                                                 };
                                                 booking.notifications = [
                                                           buildNotification("email", payload.customer?.email || "", booking),
                                                           buildNotification("sms", payload.customer?.phone || "", booking),
                                                         ];
                                                 evaluateBookingLifecycle(booking);
                                                 bookings.push(booking);
                                                 writeBookings(bookings);
                                                 dispatchNotificationsInBackground(booking);
                                                 return sendJson(res, 201, booking);
                                         } catch (_error) {
                                                 return sendJson(res, 400, { error: "Invalid booking payload" });
                                         }
                                   }

                                   if (req.method === "GET" && req.url.startsWith("/api/bookings/")) {
                                         const id = decodeURIComponent(req.url.replace("/api/bookings/", ""));
                                         const bookings = readBookings();
                                         const index = bookings.findIndex((item) => item.id === id);
                                         if (index < 0) return sendJson(res, 404, { error: "Booking not found" });
                                         bookings[index] = evaluateBookingLifecycle(bookings[index]);
                                         writeBookings(bookings);
                                         return sendJson(res, 200, bookings[index]);
                                   }

                                   if (req.method === "POST" && req.url === "/api/provider-webhook") {
                                         if (req.headers["x-webhook-secret"] !== WEBHOOK_SECRET) return sendJson(res, 401, { error: "Unauthorized webhook" });
                                         try {
                                                 const payload = await parseJsonBody(req);
                                                 const bookings = readBookings();
                                                 const index = bookings.findIndex((item) => item.id === payload.bookingId);
                                                 if (index < 0) return sendJson(res, 404, { error: "Booking not found" });
                                                 if (payload.componentType) {
                                                           const component = (bookings[index].components || []).find((item) => item.type === payload.componentType);
                                                           if (component && payload.status) component.status = payload.status;
                                                 }
                                                 bookings[index].status = payload.status || bookings[index].status;
                                                 bookings[index].providerReference = payload.providerReference || bookings[index].providerReference;
                                                 bookings[index] = evaluateBookingLifecycle(bookings[index]);
                                                 writeBookings(bookings);
                                                 return sendJson(res, 200, bookings[index]);
                                         } catch (_error) {
                                                 return sendJson(res, 400, { error: "Invalid webhook payload" });
                                         }
                                   }

                                   return sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
    console.log(`GlobeTirtha Booking API listening on http://localhost:${PORT}`);
    console.log(`Email provider: ${getNotificationProvider("email")} | SMS provider: ${getNotificationProvider("sms")}`);
});
