const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const store = require("./store");

const PORT = process.env.PORT || 8787;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "change-me";
const DATA_FILE = path.join(__dirname, "data", "bookings.json");
const COMMUNITY_FILE = path.join(__dirname, "data", "community.json");
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

// Server-side sanitisation (defense-in-depth). The frontend also escapes on render.
function cleanText(value, maxLen) {
    if (typeof value !== "string") return "";
    return value
          .replace(/[<>]/g, "")
          .replace(/[\u0000-\u001f\u007f]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, maxLen);
}

function clampNumber(value, min, max, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
}

function communityStats(data) {
    const reviews = data.reviews || [];
    const places = data.places || [];
    const byDest = {};
    reviews.forEach((r) => {
          if (!byDest[r.destinationId]) byDest[r.destinationId] = { sum: 0, count: 0 };
          byDest[r.destinationId].sum += r.rating;
          byDest[r.destinationId].count += 1;
    });
    const ratings = {};
    Object.keys(byDest).forEach((id) => {
          const { sum, count } = byDest[id];
          ratings[id] = { avg: Math.round((sum / count) * 10) / 10, count };
    });
    const contributors = new Set();
    reviews.forEach((r) => contributors.add((r.author || "").toLowerCase()));
    places.forEach((p) => contributors.add((p.author || "").toLowerCase()));
    contributors.delete("");
    const averageRating = reviews.length
          ? Math.round((reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) * 10) / 10
          : 0;
    return {
          totalReviews: reviews.length,
          totalPlaces: places.length,
          contributors: contributors.size,
          averageRating,
          ratings,
    };
}

// Lightweight in-memory per-IP throttle to deter spam on public write endpoints.
const rateBuckets = new Map();
function isRateLimited(ip) {
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxPerWindow = 15;
    const recent = (rateBuckets.get(ip) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    rateBuckets.set(ip, recent);
    return recent.length > maxPerWindow;
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

function statusLine(status, providerReference) {
    if (status === STATUS.confirmed) {
          return `Great news — your booking is CONFIRMED! You are all set to travel.` +
            (providerReference ? `\nProvider reference: ${providerReference}` : "");
    }
    if (status === STATUS.rejected) {
          return `Unfortunately this booking could not be confirmed. Our team is arranging a refund or an alternate option and will contact you.`;
    }
    if (status === STATUS.escalated) {
          return `Your booking is taking a little longer than usual. Our team is following up with the provider and will update you shortly.`;
    }
    return `IMPORTANT: Do not travel until status is CONFIRMED_BY_PROVIDER.`;
}

function buildCustomerMessage(payload) {
    return (
          `GlobeTirtha Booking ${payload.bookingId}\n` +
          `Destination: ${payload.destinationName} — ${payload.spot}\n` +
          `Status: ${payload.status}\n` +
          `${statusLine(payload.status, payload.providerReference)}\n` +
          `Check status: ${payload.websiteUrl}`
        );
}

function buildSmsMessage(payload) {
    if (payload.status === STATUS.confirmed) {
          return `GlobeTirtha ${payload.bookingId}: CONFIRMED! You are all set. Details: ${payload.websiteUrl}`;
    }
    if (payload.status === STATUS.rejected) {
          return `GlobeTirtha ${payload.bookingId}: could not be confirmed. Refund/rebook in progress. ${payload.websiteUrl}`;
    }
    return `GlobeTirtha ${payload.bookingId}: ${payload.status}.`;
}

function emailSubjectForStatus(status, bookingId) {
    if (status === STATUS.confirmed) return `Your GlobeTirtha booking is CONFIRMED — ${bookingId}`;
    if (status === STATUS.rejected) return `Update on your GlobeTirtha booking — ${bookingId}`;
    if (status === STATUS.escalated) return `We are following up on your GlobeTirtha booking — ${bookingId}`;
    return `GlobeTirtha Booking Received — ${bookingId}`;
}

function eventForStatus(status) {
    if (status === STATUS.confirmed) return "BOOKING_CONFIRMED";
    if (status === STATUS.rejected) return "BOOKING_REJECTED";
    if (status === STATUS.escalated) return "BOOKING_ESCALATED";
    return "BOOKING_REQUEST_RECEIVED";
}

async function sendViaSendGrid(notification, payload) {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${SENDGRID_API_KEY}` },
          body: JSON.stringify({
                  personalizations: [{ to: [{ email: notification.recipient }] }],
                  from: { email: EMAIL_FROM, name: "GlobeTirtha Bookings" },
                  subject: payload.subject || `GlobeTirtha Booking Received — ${payload.bookingId}`,
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
          event: eventForStatus(booking.status),
          bookingId: booking.id,
          destinationName: booking.destinationName,
          spot: booking.spot,
          status: booking.status,
          providerReference: booking.providerReference || null,
          subject: emailSubjectForStatus(booking.status, booking.id),
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

async function persistBookingNotifications(booking) {
    try {
          const all = await store.getBookings();
          const index = all.findIndex((item) => item.id === booking.id);
          if (index >= 0) {
                  all[index].notifications = booking.notifications;
                  await store.saveBookings([all[index]]);
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

const ADMIN_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>GlobeTirtha — Partner / Ops Console</title>
<style>
  :root { --green:#0b6f53; --bg:#f3f7f6; --card:#fff; --muted:#5c6b66; --danger:#b3261e; }
  * { box-sizing:border-box; }
  body { margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif; background:var(--bg); color:#12211c; }
  header { background:var(--green); color:#fff; padding:16px 20px; }
  header h1 { margin:0; font-size:18px; }
  header p { margin:4px 0 0; font-size:13px; opacity:.85; }
  main { max-width:900px; margin:0 auto; padding:20px; }
  .bar { display:flex; gap:8px; flex-wrap:wrap; align-items:center; background:var(--card); padding:14px; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,.08); }
  .bar input { flex:1; min-width:180px; padding:10px; border:1px solid #cdd8d4; border-radius:8px; font-size:14px; }
  button { cursor:pointer; border:0; border-radius:8px; padding:10px 14px; font-size:14px; font-weight:600; }
  .btn-primary { background:var(--green); color:#fff; }
  .btn-confirm { background:#0b6f53; color:#fff; }
  .btn-reject { background:var(--danger); color:#fff; }
  .btn-primary:disabled { opacity:.5; cursor:not-allowed; }
  #msg { margin:12px 0; font-size:14px; min-height:18px; }
  .card { background:var(--card); border-radius:12px; padding:16px; margin:14px 0; box-shadow:0 1px 3px rgba(0,0,0,.08); }
  .card h3 { margin:0 0 6px; font-size:16px; }
  .meta { font-size:13px; color:var(--muted); margin:2px 0; }
  .pill { display:inline-block; padding:3px 9px; border-radius:999px; font-size:12px; font-weight:700; }
  .s-pending { background:#fff4d6; color:#8a6100; }
  .s-confirmed { background:#d8f3e6; color:#0b6f53; }
  .s-rejected { background:#fadad7; color:var(--danger); }
  .s-escalated { background:#e5defb; color:#5b3fb0; }
  .comp { display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding:8px 0; border-top:1px solid #eef2f0; }
  .comp .label { flex:1; min-width:140px; font-size:14px; }
  .empty { text-align:center; color:var(--muted); padding:30px; }
</style>
</head>
<body>
<header>
  <h1>GlobeTirtha — Partner / Ops Console</h1>
  <p>Simulates the vendor confirming bookings via the provider webhook. For testing/operations only.</p>
</header>
<main>
  <div class="bar">
    <input id="secret" type="password" placeholder="Webhook secret (x-webhook-secret)" autocomplete="off" />
    <button class="btn-primary" id="load">Load bookings</button>
    <button class="btn-primary" id="refresh" title="Reload list">↻</button>
  </div>
  <div id="msg"></div>
  <div id="list"></div>
</main>
<script>
  var secretEl = document.getElementById("secret");
  var msgEl = document.getElementById("msg");
  var listEl = document.getElementById("list");

  function setMsg(t, isErr) { msgEl.textContent = t || ""; msgEl.style.color = isErr ? "#b3261e" : "#0b6f53"; }
  function statusClass(s) {
    if (s === "CONFIRMED_BY_PROVIDER") return "s-confirmed";
    if (s === "REJECTED_BY_PROVIDER") return "s-rejected";
    if (s === "ESCALATED_MANUAL_REVIEW") return "s-escalated";
    return "s-pending";
  }
  function esc(x) { return String(x == null ? "" : x).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  function loadBookings() {
    var secret = secretEl.value.trim();
    if (!secret) { setMsg("Enter the webhook secret first.", true); return; }
    setMsg("Loading...", false);
    fetch("/api/admin/bookings", { headers: { "x-webhook-secret": secret } })
      .then(function(r){ if (r.status === 401) throw new Error("Wrong secret (401)."); if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function(items){ render(items); setMsg(items.length + " booking(s) loaded.", false); })
      .catch(function(e){ setMsg(e.message, true); listEl.innerHTML = ""; });
  }

  function confirmComponent(bookingId, componentType, newStatus) {
    var secret = secretEl.value.trim();
    setMsg("Sending " + newStatus + " for " + componentType + "...", false);
    fetch("/api/provider-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-webhook-secret": secret },
      body: JSON.stringify({ bookingId: bookingId, componentType: componentType, status: newStatus, providerReference: "OPS-" + Date.now() })
    })
      .then(function(r){ if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function(){ setMsg("Updated. Reloading...", false); loadBookings(); })
      .catch(function(e){ setMsg(e.message, true); });
  }

  function render(items) {
    if (!items.length) { listEl.innerHTML = '<div class="empty">No bookings yet.</div>'; return; }
    items.sort(function(a,b){ return (b.createdAt||"").localeCompare(a.createdAt||""); });
    var html = "";
    items.forEach(function(b){
      html += '<div class="card">';
      html += '<h3>' + esc(b.destinationName || b.destinationId || "Booking") + ' — ' + esc(b.spot || "") + '</h3>';
      html += '<div class="meta">ID: ' + esc(b.id) + ' · ' + esc(b.date || "") + ' · ' + esc(b.purpose || "") + '</div>';
      html += '<div class="meta">Customer: ' + esc((b.customer && b.customer.name) || "-") + ' · ' + esc((b.customer && b.customer.phone) || "-") + '</div>';
      html += '<div class="meta">Booking status: <span class="pill ' + statusClass(b.status) + '">' + esc(b.status) + '</span> · Payment: ' + esc(b.paymentStatus || "-") + '</div>';
      (b.components || []).forEach(function(c){
        var done = c.status === "CONFIRMED_BY_PROVIDER" || c.status === "REJECTED_BY_PROVIDER";
        html += '<div class="comp">';
        html += '<span class="label">' + esc(c.label || c.type) + ' <span class="pill ' + statusClass(c.status) + '">' + esc(c.status) + '</span></span>';
        if (!done) {
          html += '<button class="btn-confirm" onclick="confirmComponent(\\'' + esc(b.id) + '\\',\\'' + esc(c.type) + '\\',\\'CONFIRMED_BY_PROVIDER\\')">Confirm</button>';
          html += '<button class="btn-reject" onclick="confirmComponent(\\'' + esc(b.id) + '\\',\\'' + esc(c.type) + '\\',\\'REJECTED_BY_PROVIDER\\')">Reject</button>';
        }
        html += '</div>';
      });
      html += '</div>';
    });
    listEl.innerHTML = html;
  }

  document.getElementById("load").addEventListener("click", loadBookings);
  document.getElementById("refresh").addEventListener("click", loadBookings);
  secretEl.addEventListener("keydown", function(e){ if (e.key === "Enter") loadBookings(); });
</script>
</body>
</html>`;

const server = http.createServer(async (req, res) => {
    if (req.method === "OPTIONS") return sendJson(res, 200, { ok: true });
    const pathname = (req.url || "/").split("?")[0];
    if (req.method === "GET" && pathname === "/admin") return sendText(res, 200, ADMIN_HTML, "text/html; charset=utf-8");
    if (req.method === "GET" && (pathname === "/" || pathname === "/app")) return sendHtmlFile(res, path.join(APP_ROOT, "index.html"));
    if (req.method === "GET" && req.url === "/styles.css") return sendFile(res, path.join(APP_ROOT, "styles.css"));
    if (req.method === "GET" && req.url === "/app.js") return sendFile(res, path.join(APP_ROOT, "app.js"));
    if (req.method === "GET" && req.url === "/googleeb15c89d223d87ec.html") return sendText(res, 200, "google-site-verification: googleeb15c89d223d87ec.html", "text/html; charset=utf-8");
    if (req.method === "GET" && req.url === "/robots.txt") return sendText(res, 200, `User-agent: *\nAllow: /\nSitemap: ${WEBSITE_URL}/sitemap.xml\n`, "text/plain; charset=utf-8");
    if (req.method === "GET" && req.url === "/sitemap.xml") return sendText(res, 200, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${WEBSITE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>\n  <url><loc>${WEBSITE_URL}/#community</loc><changefreq>daily</changefreq><priority>0.8</priority></url>\n  <url><loc>${WEBSITE_URL}/#destinations</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n</urlset>\n`, "application/xml; charset=utf-8");
    if (req.method === "GET" && req.url === "/site.webmanifest") return sendJson(res, 200, { name: "GlobeTirtha", short_name: "GlobeTirtha", start_url: "/", display: "standalone", background_color: "#f3f7f6", theme_color: "#0b6f53", description: "Holy place and vacation booking website with global geo discovery." });
    if (req.method === "GET" && req.url === "/api") return sendJson(res, 200, { ok: true, docs: ["GET /api/health", "POST /api/bookings", "GET /api/bookings/:id", "POST /api/provider-webhook", "GET /api/community", "POST /api/reviews", "POST /api/places"] });
    if (req.method === "GET" && req.url === "/api/health") return sendJson(res, 200, { ok: true, service: "globetirtha-booking-api", storage: store.mode(), notifications: { emailProvider: getNotificationProvider("email"), smsProvider: getNotificationProvider("sms") } });

    if (req.method === "GET" && req.url === "/api/community") {
          const data = await store.getCommunity();
          const byNewest = (a, b) => (a.createdAt < b.createdAt ? 1 : -1);
          const reviews = [...data.reviews].sort(byNewest).slice(0, 200);
          const places = [...data.places].sort(byNewest).slice(0, 200);
          return sendJson(res, 200, { reviews, places, stats: communityStats(data) });
    }

    if (req.method === "POST" && req.url === "/api/reviews") {
          const ip = req.socket.remoteAddress || "unknown";
          if (isRateLimited(ip)) return sendJson(res, 429, { error: "Too many submissions. Please slow down and try again shortly." });
          try {
                  const payload = await parseJsonBody(req);
                  const author = cleanText(payload.author, 60);
                  const destinationId = cleanText(payload.destinationId, 60);
                  const destinationName = cleanText(payload.destinationName, 120);
                  const title = cleanText(payload.title, 100);
                  const text = cleanText(payload.text, 800);
                  const location = cleanText(payload.location, 80);
                  const rating = Math.round(clampNumber(payload.rating, 1, 5, 0));
                  if (!author || !destinationId || !text || !rating) {
                            return sendJson(res, 400, { error: "author, destinationId, rating and text are required." });
                  }
                  const review = {
                            id: "rev-" + crypto.randomBytes(6).toString("hex"),
                            destinationId, destinationName, author, location,
                            rating, title, text, createdAt: new Date().toISOString(),
                  };
                  await store.addReview(review);
                  const data = await store.getCommunity();
                  return sendJson(res, 201, { review, stats: communityStats(data) });
          } catch (_error) {
                  return sendJson(res, 400, { error: "Invalid review payload" });
          }
    }

    if (req.method === "POST" && req.url === "/api/places") {
          const ip = req.socket.remoteAddress || "unknown";
          if (isRateLimited(ip)) return sendJson(res, 429, { error: "Too many submissions. Please slow down and try again shortly." });
          try {
                  const payload = await parseJsonBody(req);
                  const author = cleanText(payload.author, 60);
                  const name = cleanText(payload.name, 100);
                  const country = cleanText(payload.country, 60);
                  const region = cleanText(payload.region, 80);
                  const continent = cleanText(payload.continent, 40) || "Other";
                  const spotType = cleanText(payload.spotType, 40) || "Community Spot";
                  const note = cleanText(payload.note, 500);
                  const allowedTypes = ["holy", "vacation", "mixed"];
                  const type = allowedTypes.includes(payload.type) ? payload.type : "mixed";
                  const lat = clampNumber(payload.lat, -90, 90, 0);
                  const lon = clampNumber(payload.lon, -180, 180, 0);
                  if (!author || !name || !country) {
                            return sendJson(res, 400, { error: "author, name and country are required." });
                  }
                  const place = {
                            id: "ugc-" + crypto.randomBytes(6).toString("hex"),
                            name, country, region: region || country, continent,
                            type, spotType, note, author, lat, lon,
                            createdAt: new Date().toISOString(),
                  };
                  await store.addPlace(place);
                  const data = await store.getCommunity();
                  return sendJson(res, 201, { place, stats: communityStats(data) });
          } catch (_error) {
                  return sendJson(res, 400, { error: "Invalid place payload" });
          }
    }

    if (req.method === "GET" && req.url === "/api/admin/bookings") {
          if (req.headers["x-webhook-secret"] !== WEBHOOK_SECRET) return sendJson(res, 401, { error: "Unauthorized" });
          const bookings = (await store.getBookings()).map((b) => evaluateBookingLifecycle(b));
          await store.saveBookings(bookings);
          return sendJson(res, 200, bookings);
    }

                                   if (req.method === "POST" && req.url === "/api/bookings") {
                                         try {
                                                 const payload = await parseJsonBody(req);
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
                                                 await store.saveBookings([booking]);
                                                 dispatchNotificationsInBackground(booking);
                                                 return sendJson(res, 201, booking);
                                         } catch (_error) {
                                                 return sendJson(res, 400, { error: "Invalid booking payload" });
                                         }
                                   }

                                   if (req.method === "GET" && req.url.startsWith("/api/bookings/")) {
                                         const id = decodeURIComponent(req.url.replace("/api/bookings/", ""));
                                         const bookings = await store.getBookings();
                                         const index = bookings.findIndex((item) => item.id === id);
                                         if (index < 0) return sendJson(res, 404, { error: "Booking not found" });
                                         bookings[index] = evaluateBookingLifecycle(bookings[index]);
                                         await store.saveBookings([bookings[index]]);
                                         return sendJson(res, 200, bookings[index]);
                                   }

                                   if (req.method === "POST" && req.url === "/api/provider-webhook") {
                                         if (req.headers["x-webhook-secret"] !== WEBHOOK_SECRET) return sendJson(res, 401, { error: "Unauthorized webhook" });
                                         try {
                                                 const payload = await parseJsonBody(req);
                                                 const bookings = await store.getBookings();
                                                 const index = bookings.findIndex((item) => item.id === payload.bookingId);
                                                 if (index < 0) return sendJson(res, 404, { error: "Booking not found" });
                                                 if (payload.componentType) {
                                                           const component = (bookings[index].components || []).find((item) => item.type === payload.componentType);
                                                           if (component && payload.status) component.status = payload.status;
                                                 }
                                                 bookings[index].status = payload.status || bookings[index].status;
                                                 bookings[index].providerReference = payload.providerReference || bookings[index].providerReference;
                                                 bookings[index] = evaluateBookingLifecycle(bookings[index]);
                                                 const updatedBooking = bookings[index];
                                                 const shouldNotify = [STATUS.confirmed, STATUS.rejected].includes(updatedBooking.status) && updatedBooking.lastNotifiedStatus !== updatedBooking.status;
                                                 if (shouldNotify) updatedBooking.lastNotifiedStatus = updatedBooking.status;
                                                 await store.saveBookings([updatedBooking]);
                                                 if (shouldNotify) dispatchNotificationsInBackground(updatedBooking);
                                                 return sendJson(res, 200, updatedBooking);
                                         } catch (_error) {
                                                 return sendJson(res, 400, { error: "Invalid webhook payload" });
                                         }
                                   }

                                   return sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
    console.log(`GlobeTirtha Booking API listening on http://localhost:${PORT}`);
    console.log(`Email provider: ${getNotificationProvider("email")} | SMS provider: ${getNotificationProvider("sms")}`);
    console.log(`Storage backend: ${store.mode()}`);
    store
          .ensureReady()
          .then(() => console.log(`Storage ready (${store.mode()})`))
          .catch((error) => console.error("Storage init failed, falling back where possible:", error.message));
});
