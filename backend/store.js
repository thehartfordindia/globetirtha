"use strict";

/**
 * Storage abstraction for GlobeTirtha.
 *
 * - If DATABASE_URL is set, data is stored in PostgreSQL (durable, survives
 *   restarts and redeploys) — ideal with Neon / Supabase / Render Postgres.
 * - If DATABASE_URL is NOT set, it transparently falls back to local JSON files
 *   so local development and the current deployment keep working unchanged.
 *
 * The rest of the app calls the same async API regardless of backend.
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const COMMUNITY_FILE = path.join(DATA_DIR, "community.json");
const DATABASE_URL = process.env.DATABASE_URL || "";

let pool = null;
let initPromise = null;

function usingDb() {
  return Boolean(DATABASE_URL);
}

function mode() {
  return usingDb() ? "postgres" : "file";
}

/* ---------- file helpers (fallback) ---------- */

function readJsonFile(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (_error) {
    return fallback;
  }
}

function writeJsonFile(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2));
}

function readSeedCommunity() {
  const seed = readJsonFile(COMMUNITY_FILE, { reviews: [], places: [] });
  return {
    reviews: Array.isArray(seed.reviews) ? seed.reviews : [],
    places: Array.isArray(seed.places) ? seed.places : [],
  };
}

/* ---------- initialisation ---------- */

async function ensureReady() {
  if (!usingDb()) return;
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const { Pool } = require("pg");
    const needsSsl = !/localhost|127\.0\.0\.1/.test(DATABASE_URL);
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: needsSsl ? { rejectUnauthorized: false } : false,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    await pool.query(
      "CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS reviews (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())"
    );
    await pool.query(
      "CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())"
    );

    // Seed the community tables on first run so the site never looks empty.
    const seeded = await pool.query("SELECT (SELECT count(*) FROM reviews) + (SELECT count(*) FROM places) AS total");
    if (Number(seeded.rows[0].total) === 0) {
      const seed = readSeedCommunity();
      for (const review of seed.reviews) {
        await pool.query(
          "INSERT INTO reviews (id, data, created_at) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
          [review.id, review, review.createdAt || new Date().toISOString()]
        );
      }
      for (const place of seed.places) {
        await pool.query(
          "INSERT INTO places (id, data, created_at) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
          [place.id, place, place.createdAt || new Date().toISOString()]
        );
      }
    }
  })();
  return initPromise;
}

/* ---------- bookings ---------- */

async function getBookings() {
  await ensureReady();
  if (usingDb()) {
    const result = await pool.query("SELECT data FROM bookings ORDER BY created_at ASC");
    return result.rows.map((row) => row.data);
  }
  const list = readJsonFile(BOOKINGS_FILE, []);
  return Array.isArray(list) ? list : [];
}

async function saveBookings(bookings) {
  await ensureReady();
  if (usingDb()) {
    for (const booking of bookings) {
      await pool.query(
        "INSERT INTO bookings (id, data, created_at) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data",
        [booking.id, booking, booking.createdAt || new Date().toISOString()]
      );
    }
    return;
  }
  writeJsonFile(BOOKINGS_FILE, bookings);
}

/* ---------- community ---------- */

async function getCommunity() {
  await ensureReady();
  if (usingDb()) {
    const [reviews, places] = await Promise.all([
      pool.query("SELECT data FROM reviews ORDER BY created_at DESC LIMIT 500"),
      pool.query("SELECT data FROM places ORDER BY created_at DESC LIMIT 500"),
    ]);
    return {
      reviews: reviews.rows.map((row) => row.data),
      places: places.rows.map((row) => row.data),
    };
  }
  return readSeedCommunity();
}

async function addReview(review) {
  await ensureReady();
  if (usingDb()) {
    await pool.query(
      "INSERT INTO reviews (id, data, created_at) VALUES ($1, $2, $3)",
      [review.id, review, review.createdAt]
    );
    return;
  }
  const data = readSeedCommunity();
  data.reviews.push(review);
  writeJsonFile(COMMUNITY_FILE, data);
}

async function addPlace(place) {
  await ensureReady();
  if (usingDb()) {
    await pool.query(
      "INSERT INTO places (id, data, created_at) VALUES ($1, $2, $3)",
      [place.id, place, place.createdAt]
    );
    return;
  }
  const data = readSeedCommunity();
  data.places.push(place);
  writeJsonFile(COMMUNITY_FILE, data);
}

module.exports = {
  mode,
  ensureReady,
  getBookings,
  saveBookings,
  getCommunity,
  addReview,
  addPlace,
};
