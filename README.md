# GlobeTirtha - Holy & Vacation Booking Website

A responsive, user-friendly booking website prototype for:
- Pilgrimage / holy place booking (example: Tirupati in Andhra Pradesh)
- Vacation and mixed travel planning
- Geo-location based discovery of destinations globally
- Online assistance for travel planning steps

## Features

- Global destination catalog with latitude/longitude
- Filters by search text, country, region/state, and travel type
- Live geo search by query (for example: Dubai, Qatar) using runtime geocoding and nearby place discovery
- Live current-location mode with configurable radius
- Booking form with purpose, date, and traveler details
- Smart assistance panel that generates place-specific planning guidance
- Quick action for Tirupati darshan flow
- Mobile-friendly responsive UI

## Run Locally

No build tools required.

1. Open folder `holy-vacation-booking`
2. Open `index.html` in a browser

For backend booking status storage (recommended):

1. Open terminal in `holy-vacation-booking`
2. Run `node backend/server.js`
3. Keep server running at `http://localhost:8787`

Single local host URL:

1. Start server with `node backend/server.js`
2. Open `http://localhost:8787/`

Optional with VS Code Live Server:

1. Open this folder in VS Code
2. Start Live Server on `index.html`

## File Structure

- `index.html` - page structure
- `styles.css` - modern visual theme and responsive design
- `app.js` - destination data, filtering, booking logic, assistant logic
- `backend/server.js` - booking request API + status API + provider webhook endpoint
- `backend/data/bookings.json` - persisted booking records
- `backend/provider-connectors.json` - provider integration registry template
- `package.json` - Node start scripts for deployment
- `render.yaml` - Render deployment configuration

## Notes

This implementation now has dynamic geo discovery for places worldwide.

Real booking synchronization to external provider databases and provider-origin SMS/email confirmations require official partner integrations.

Notification behavior in current build:

- Booking records now track email and SMS notification states.
- If `EMAIL_WEBHOOK_URL` or `SMS_WEBHOOK_URL` is not configured, the UI will show `NOT_CONFIGURED`.
- This is why a Tirupati booking does not currently send a real SMS or email from your local app.

In production, integrate:
- Real booking APIs for temples/attractions/flights/hotels
- Auth and secure payments
- Official ticketing systems for each destination
- Localization and accessibility audits
- Provider webhooks for booking confirmation callbacks and notification status

## Confirmation Safety Rule

- Do not treat a booking as official until status is `CONFIRMED_BY_PROVIDER`.
- `PENDING_PARTNER_CONFIRMATION` means user request is captured, but provider has not confirmed yet.
- If backend is unavailable, fallback mode stores booking locally only and must not be presented as official.

## Public Deployment

Recommended first deployment path:

1. Push this project to GitHub.
2. Create a free account in Render.
3. Create a new web service in Render.
4. Connect your GitHub repository.
5. Render will detect `render.yaml`.
6. Deploy using the free plan.
7. Set `WEBSITE_URL` to your Render URL, for example `https://globetirtha.onrender.com`.
8. After deploy, verify:
	- `/`
	- `/api/health`
	- `/robots.txt`
	- `/sitemap.xml`

Free hosting note:

- Render free hosting gives you a public URL like `https://globetirtha.onrender.com`.
- That is enough to share the site publicly and even submit it to Google for indexing.
- Free plans may sleep after inactivity, so the first open can be slow.

Previous generic deployment flow:

1. Push this project to GitHub.
2. Create a new web service in Render.
3. Point Render to this repository.
4. Use `npm start` as the start command.
5. Set env var `WEBSITE_URL` to your real public domain or Render URL.
6. After deploy, verify:
	- `/`
	- `/api/health`
	- `/robots.txt`
	- `/sitemap.xml`

## Custom Domain and Google Search

To make users find GlobeTirtha on Google:

1. Minimum free path: use your Render URL such as `https://globetirtha.onrender.com`.
2. Open Google Search Console.
3. Verify the deployed site property.
4. Submit `https://globetirtha.onrender.com/sitemap.xml`.
5. Keep `robots.txt` publicly reachable.
6. Wait for Google to crawl and index the site.

If you want a branded result like `globetirtha.com`, then:

1. Buy a domain such as `globetirtha.com`.
2. Connect that domain to your hosting provider.
3. Set `WEBSITE_URL=https://www.globetirtha.com` in hosting.
4. Verify the custom domain in Google Search Console.
5. Submit `https://www.globetirtha.com/sitemap.xml`.

Important:

- A website does not appear in Google only because it is coded.
- It must be publicly deployed, reachable by crawlers, attached to a real domain, and submitted for indexing.
