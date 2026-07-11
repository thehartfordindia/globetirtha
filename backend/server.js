const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 8787;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "change-me";
const DATA_FILE = path.join(__dirname, "data", "bookings.json");
const APP_ROOT = path.join(__dirname, "..");
const WEBSITE_URL = process.env.WEBSITE_URL || `http://localhost:${PORT}`;
const EMAIL_WEBHOOK_URL = process.env.EMAIL_WEBHOOK_URL || "";
const SMS_WEBHOOK_URL = process.env.SMS_WEBHOOK_URL || "";

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
    if (error) {
      return sendJson(res, 404, { error: "Static file not found" });
    }

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
    if (error) {
      return sendJson(res, 404, { error: "Static file not found" });
    }

    const html = data.replaceAll("__WEBSITE_URL__", WEBSITE_URL);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    });
    res.end(html);
  });
}

function sendText(res, statusCode, body, contentType) {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-cache",
  });
  res.end(body);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function createBookingId() {
  return `GB-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function buildNotification(channel, recipient, booking) {
  const configured = channel === "email" ? Boolean(EMAIL_WEBHOOK_URL) : Boolean(SMS_WEBHOOK_URL);
  return {
    channel,
    recipient,
    status: configured ? "PENDING_SEND" : "NOT_CONFIGURED",
    lastAttemptAt: null,
    deliveredAt: null,
    detail: configured
      ? "Queued for outbound notification dispatch."
      : `No ${channel.toUpperCase()} provider configured on the server.`,
    bookingId: booking.id,
  };
}

async function dispatchNotification(notification, payload) {
  const webhookUrl = notification.channel === "email" ? EMAIL_WEBHOOK_URL : SMS_WEBHOOK_URL;
  if (!webhookUrl || !notification.recipient) {
    notification.status = !notification.recipient ? "MISSING_RECIPIENT" : "NOT_CONFIGURED";
    notification.detail = !notification.recipient
      ? `No ${notification.channel} recipient was provided.`
      : `No ${notification.channel.toUpperCase()} provider configured on the server.`;
    return notification;
  }

  notification.lastAttemptAt = new Date().toISOString();

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      notification.status = "FAILED_TO_SEND";
      notification.detail = `${notification.channel.toUpperCase()} gateway returned HTTP ${response.status}.`;
      return notification;
    }

    notification.status = "SENT_TO_GATEWAY";
    notification.deliveredAt = new Date().toISOString();
    notification.detail = `${notification.channel.toUpperCase()} request accepted by outbound gateway.`;
    return notification;
  } catch (error) {
    notification.status = "FAILED_TO_SEND";
    notification.detail = `${notification.channel.toUpperCase()} dispatch failed: ${error.message}`;
    return notification;
  }
}

async function dispatchNotificationsForBooking(booking) {
  if (!Array.isArray(booking.notifications)) {
    return booking;
  }

  const payloadBase = {
    event: "BOOKING_REQUEST_RECEIVED",
    bookingId: booking.id,
    destinationName: booking.destinationName,
    spot: booking.spot,
    status: booking.status,
    websiteUrl: WEBSITE_URL,
  };

  for (const notification of booking.notifications) {
    await dispatchNotification(notification, {
      ...payloadBase,
      channel: notification.channel,
      recipient: notification.recipient,
      customerName: booking.customer?.name || "Customer",
      message:
        `Booking ${booking.id} is ${booking.status}. ` +
        `Travel only after CONFIRMED_BY_PROVIDER.`,
    });
  }

  return booking;
}

function minutesBetween(fromIso, toDate) {
  const from = new Date(fromIso).getTime();
  return Math.max(0, Math.floor((toDate.getTime() - from) / 60000));
}

function getSlaPolicy(purpose, accommodationNights) {
  const spotMax = purpose === "pilgrimage" ? 20 : purpose === "both" ? 25 : 12;
  const stayMax = accommodationNights > 0 ? (purpose === "pilgrimage" ? 15 : 10) : 0;
  const globalMax = Math.max(spotMax, stayMax || 0);

  return {
    checkEverySeconds: 30,
    globalMaxWaitMinutes: globalMax,
    spotMaxWaitMinutes: spotMax,
    stayMaxWaitMinutes: stayMax,
    userMessage:
      "Most providers confirm in a few minutes; if delayed beyond SLA, booking is escalated for support/rebook/refund.",
  };
}

function evaluateBookingLifecycle(booking) {
  const now = new Date();
  const elapsedMinutes = minutesBetween(booking.createdAt, now);
  const components = booking.components || [];

  let hasRejected = false;
  let allConfirmed = components.length > 0;
  let hasOverduePending = false;

  components.forEach((component) => {
    if (component.status === STATUS.rejected) hasRejected = true;
    if (component.status !== STATUS.confirmed) allConfirmed = false;
    if (
      component.status === "PENDING_PROVIDER" &&
      elapsedMinutes > Number(component.maxWaitMinutes || booking.sla?.globalMaxWaitMinutes || 20)
    ) {
      hasOverduePending = true;
      component.status = "PENDING_PROVIDER_DELAYED";
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
    booking.nextAction =
      "Escalate to operations desk now. Offer user alternate options or refund within SLA breach policy.";
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
  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === "GET" && (req.url === "/" || req.url === "/app")) {
    return sendHtmlFile(res, path.join(APP_ROOT, "index.html"));
  }

  if (req.method === "GET" && req.url === "/styles.css") {
    return sendFile(res, path.join(APP_ROOT, "styles.css"));
  }

  if (req.method === "GET" && req.url === "/app.js") {
    return sendFile(res, path.join(APP_ROOT, "app.js"));
  }

  if (req.method === "GET" && req.url === "/robots.txt") {
    return sendText(
      res,
      200,
      `User-agent: *\nAllow: /\nSitemap: ${WEBSITE_URL}/sitemap.xml\n`,
      "text/plain; charset=utf-8"
    );
  }

  if (req.method === "GET" && req.url === "/sitemap.xml") {
    return sendText(
      res,
      200,
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `  <url><loc>${WEBSITE_URL}/</loc></url>\n` +
        `  <url><loc>${WEBSITE_URL}/api</loc></url>\n` +
        `</urlset>\n`,
      "application/xml; charset=utf-8"
    );
  }

  if (req.method === "GET" && req.url === "/site.webmanifest") {
    return sendJson(res, 200, {
      name: "GlobeTirtha",
      short_name: "GlobeTirtha",
      start_url: "/",
      display: "standalone",
      background_color: "#f3f7f6",
      theme_color: "#0b6f53",
      description: "Holy place and vacation booking website with global geo discovery.",
    });
  }

  if (req.method === "GET" && req.url === "/api") {
    return sendJson(res, 200, {
      ok: true,
      docs: [
        "GET /api/health",
        "POST /api/bookings",
        "GET /api/bookings/:id",
        "POST /api/provider-webhook",
      ],
    });
  }

  if (req.method === "GET" && req.url === "/api/health") {
    return sendJson(res, 200, { ok: true, service: "globetirtha-booking-api" });
  }

  if (req.method === "POST" && req.url === "/api/bookings") {
    try {
      const payload = await parseJsonBody(req);
      const bookings = readBookings();
      const accommodationNights = Number(payload.accommodationNights || 0);
      const sla = getSlaPolicy(payload.purpose, accommodationNights);

      const booking = {
        id: createBookingId(),
        status: STATUS.pending,
        createdAt: new Date().toISOString(),
        destinationId: payload.destinationId,
        destinationName: payload.destinationName,
        spot: payload.spot,
        date: payload.date,
        purpose: payload.purpose,
        accommodationNights,
        customer: payload.customer,
        notes: payload.notes,
        source: payload.source,
        providerReference: null,
        paymentStatus: "AUTHORIZED_HOLD",
        paymentPolicy: {
          holdUntilStatus: [STATUS.confirmed, STATUS.rejected, STATUS.escalated],
          captureOn: STATUS.confirmed,
          refundOn: [STATUS.rejected],
        },
        components: [
          {
            type: "spot",
            label: payload.spot || "Destination Slot",
            status: "PENDING_PROVIDER",
            maxWaitMinutes: sla.spotMaxWaitMinutes,
          },
          ...(accommodationNights > 0
            ? [
                {
                  type: "accommodation",
                  label: `${accommodationNights} night(s) accommodation`,
                  status: "PENDING_PROVIDER",
                  maxWaitMinutes: sla.stayMaxWaitMinutes,
                },
              ]
            : []),
        ],
        sla,
        notifications: [],
      };

      booking.notifications = [
        buildNotification("email", payload.customer?.email || "", booking),
        buildNotification("sms", payload.customer?.phone || "", booking),
      ];

      evaluateBookingLifecycle(booking);
      await dispatchNotificationsForBooking(booking);
      bookings.push(booking);
      writeBookings(bookings);
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
    const booking = bookings[index];
    if (!booking) return sendJson(res, 404, { error: "Booking not found" });
    return sendJson(res, 200, booking);
  }

  if (req.method === "POST" && req.url === "/api/provider-webhook") {
    const incomingSecret = req.headers["x-webhook-secret"];
    if (incomingSecret !== WEBHOOK_SECRET) {
      return sendJson(res, 401, { error: "Unauthorized webhook" });
    }

    try {
      const payload = await parseJsonBody(req);
      const bookings = readBookings();
      const index = bookings.findIndex((item) => item.id === payload.bookingId);
      if (index < 0) return sendJson(res, 404, { error: "Booking not found" });

      if (payload.componentType) {
        const component = (bookings[index].components || []).find((item) => item.type === payload.componentType);
        if (component && payload.status) {
          component.status = payload.status;
        }
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
});
