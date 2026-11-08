import { Router } from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

const DIFFICULTIES = ["lahko", "srednje", "zahtevno"];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const PAGE_SIZE = 12;

router.get("/", async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const countResult = await pool.query(
    "SELECT count(*) AS total FROM events WHERE status = 'published' AND starts_at > now()"
  );
  const total = countResult.rows[0].total;

  const result = await pool.query(
    `SELECT e.id, e.title, e.location_name, e.region, e.starts_at, e.difficulty, e.capacity,
            c.name AS category_name,
            (SELECT count(*) FROM participations p
              WHERE p.event_id = e.id AND p.status = 'registered') AS participant_count
     FROM events e
     JOIN categories c ON c.id = e.category_id
     WHERE e.status = 'published' AND e.starts_at > now()
     ORDER BY e.starts_at ASC
     LIMIT $1 OFFSET $2`,
    [PAGE_SIZE, offset]
  );

  const events = result.rows.map((e) => ({
    id: e.id,
    title: e.title,
    locationName: e.location_name,
    region: e.region,
    startsAt: e.starts_at,
    difficulty: e.difficulty,
    categoryName: e.category_name,
    capacity: req.user ? e.capacity : undefined,
    participantCount: req.user ? e.participant_count : undefined,
  }));

  res.json({
    events,
    page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  });
});

router.get("/:id", async (req, res) => {
  if (!UUID_REGEX.test(req.params.id)) {
    res.status(404).json({ error: "Dogodek ne obstaja." });
    return;
  }

  const result = await pool.query(
    `SELECT e.*, c.name AS category_name, u.display_name AS organizer_name,
            (SELECT count(*) FROM participations p
              WHERE p.event_id = e.id AND p.status = 'registered') AS participant_count
     FROM events e
     JOIN categories c ON c.id = e.category_id
     JOIN users u ON u.id = e.organizer_id
     WHERE e.id = $1`,
    [req.params.id]
  );
  const e = result.rows[0];

  if (!e) {
    res.status(404).json({ error: "Dogodek ne obstaja." });
    return;
  }

  const basic = {
    id: e.id,
    title: e.title,
    categoryId: e.category_id,
    categoryName: e.category_name,
    startsAt: e.starts_at,
    endsAt: e.ends_at,
    locationName: e.location_name,
    region: e.region,
  };

  if (!req.user) {
    res.json(basic);
    return;
  }

  res.json({
    ...basic,
    description: e.description,
    difficulty: e.difficulty,
    organizerName: e.organizer_name,
    capacity: e.capacity,
    participantCount: e.participant_count,
    isOrganizer: e.organizer_id === req.user.id,
  });
});

router.post("/", requireAuth, async (req, res) => {
  const { title, description, categoryId, locationName, region, startsAt, endsAt, difficulty, capacity } =
    req.body;

  if (!title || !description || !categoryId || !locationName || !region || !startsAt || !endsAt || !difficulty || !capacity) {
    res.status(400).json({ error: "Izpolnite vsa polja." });
    return;
  }

  const start = new Date(startsAt);
  const end = new Date(endsAt);

  if (start <= new Date()) {
    res.status(400).json({ error: "Začetek dogodka ne sme biti v preteklosti." });
    return;
  }
  if (end <= start) {
    res.status(400).json({ error: "Konec dogodka mora biti po začetku." });
    return;
  }
  if (!Number.isInteger(Number(capacity)) || Number(capacity) < 1) {
    res.status(400).json({ error: "Število udeležencev mora biti vsaj 1." });
    return;
  }
  if (!DIFFICULTIES.includes(difficulty)) {
    res.status(400).json({ error: "Neveljavna težavnost." });
    return;
  }

  const result = await pool.query(
    `INSERT INTO events
       (organizer_id, category_id, title, description, location_name, region, starts_at, ends_at, difficulty, capacity)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id`,
    [req.user!.id, categoryId, title.trim(), description.trim(), locationName.trim(), region, start, end, difficulty, Number(capacity)]
  );

  res.status(201).json({ id: result.rows[0].id });
});

export default router;