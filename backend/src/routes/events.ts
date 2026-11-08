import { Router } from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

const PAGE_SIZE = 12;
const DIFFICULTIES = ["lahko", "srednje", "zahtevno"];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function validateEvent(body: any): string | null {
  const { title, description, categoryId, locationName, region, startsAt, endsAt, difficulty, capacity } = body;

  if (!title || !description || !categoryId || !locationName || !region || !startsAt || !endsAt || !difficulty || !capacity) {
    return "Izpolnite vsa polja.";
  }
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  if (start <= new Date()) return "Začetek dogodka ne sme biti v preteklosti.";
  if (end <= start) return "Konec dogodka mora biti po začetku.";
  if (!Number.isInteger(Number(capacity)) || Number(capacity) < 1) return "Število udeležencev mora biti vsaj 1.";
  if (!DIFFICULTIES.includes(difficulty)) return "Neveljavna težavnost.";
  return null;
}

export async function findEvent(id: string) {
  if (!UUID_REGEX.test(id)) return null;
  const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
  return result.rows[0] ?? null;
}

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

  res.json({ events, page, totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)) });
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

  const registration = await pool.query(
    "SELECT 1 FROM participations WHERE event_id = $1 AND user_id = $2 AND status = 'registered'",
    [e.id, req.user.id]
  );

  res.json({
    ...basic,
    description: e.description,
    difficulty: e.difficulty,
    organizerName: e.organizer_name,
    capacity: e.capacity,
    participantCount: e.participant_count,
    isOrganizer: e.organizer_id === req.user.id,
    isRegistered: registration.rows.length > 0,
  });
});

router.post("/", requireAuth, async (req, res) => {
  const error = validateEvent(req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const { title, description, categoryId, locationName, region, startsAt, endsAt, difficulty, capacity } = req.body;

  const result = await pool.query(
    `INSERT INTO events
       (organizer_id, category_id, title, description, location_name, region, starts_at, ends_at, difficulty, capacity)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id`,
    [req.user!.id, categoryId, title.trim(), description.trim(), locationName.trim(), region,
     new Date(startsAt), new Date(endsAt), difficulty, Number(capacity)]
  );

  res.status(201).json({ id: result.rows[0].id });
});

router.put("/:id", requireAuth, async (req, res) => {
  const event = await findEvent(req.params.id as string);
  if (!event) {
    res.status(404).json({ error: "Dogodek ne obstaja." });
    return;
  }

  if (event.organizer_id !== req.user!.id) {
    res.status(403).json({ error: "Urejate lahko samo svoje dogodke." });
    return;
  }

  const error = validateEvent(req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const countResult = await pool.query(
    "SELECT count(*) AS n FROM participations WHERE event_id = $1 AND status = 'registered'",
    [event.id]
  );
  const registered = countResult.rows[0].n;

  if (Number(req.body.capacity) < registered) {
    res.status(400).json({
      error: `Največjega števila udeležencev ni mogoče zmanjšati pod število že prijavljenih (${registered}).`,
    });
    return;
  }

  const { title, description, categoryId, locationName, region, startsAt, endsAt, difficulty, capacity } = req.body;

  await pool.query(
    `UPDATE events
     SET category_id = $1, title = $2, description = $3, location_name = $4, region = $5,
         starts_at = $6, ends_at = $7, difficulty = $8, capacity = $9
     WHERE id = $10`,
    [categoryId, title.trim(), description.trim(), locationName.trim(), region,
     new Date(startsAt), new Date(endsAt), difficulty, Number(capacity), event.id]
  );

  res.json({ id: event.id });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const event = await findEvent(req.params.id as string);
  if (!event) {
    res.status(404).json({ error: "Dogodek ne obstaja." });
    return;
  }

  if (event.organizer_id !== req.user!.id) {
    res.status(403).json({ error: "Izbrišete lahko samo svoje dogodke." });
    return;
  }

  await pool.query("DELETE FROM events WHERE id = $1", [event.id]);
  res.json({ message: "Dogodek izbrisan." });
});

export default router;