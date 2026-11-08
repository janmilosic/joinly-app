import { Router } from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

const DIFFICULTIES = ["lahko", "srednje", "zahtevno"];

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