import { Router } from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";
import { findEvent } from "./events";

const router = Router();

router.post("/:id/participation", requireAuth, async (req, res) => {
  const event = await findEvent(req.params.id as string);
  if (!event) {
    res.status(404).json({ error: "Dogodek ne obstaja." });
    return;
  }
  if (req.user!.role === "moderator") {
    res.status(403).json({ error: "Moderator se ne more prijaviti na dogodek." });
    return;
  }
  if (event.organizer_id === req.user!.id) {
    res.status(400).json({ error: "Na svoj dogodek se ne morete prijaviti." });
    return;
  }
  if (event.status !== "published" || new Date(event.starts_at) <= new Date()) {
    res.status(400).json({ error: "Prijava na ta dogodek ni več mogoča." });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query("SELECT id FROM events WHERE id = $1 FOR UPDATE", [event.id]);

    const existing = await client.query(
      "SELECT status FROM participations WHERE event_id = $1 AND user_id = $2",
      [event.id, req.user!.id]
    );
    if (existing.rows[0]?.status === "registered") {
      await client.query("ROLLBACK");
      res.status(409).json({ error: "Na ta dogodek ste že prijavljeni." });
      return;
    }

    const countResult = await client.query(
      "SELECT count(*) AS n FROM participations WHERE event_id = $1 AND status = 'registered'",
      [event.id]
    );
    if (countResult.rows[0].n >= event.capacity) {
      await client.query("ROLLBACK");
      res.status(409).json({ error: "Dogodek je poln." });
      return;
    }

    if (existing.rows.length > 0) {
      await client.query(
        "UPDATE participations SET status = 'registered', created_at = now() WHERE event_id = $1 AND user_id = $2",
        [event.id, req.user!.id]
      );
    } else {
      await client.query(
        "INSERT INTO participations (event_id, user_id) VALUES ($1, $2)",
        [event.id, req.user!.id]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ message: "Prijava uspešna." });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
});

router.delete("/:id/participation", requireAuth, async (req, res) => {
  const result = await pool.query(
    `UPDATE participations SET status = 'cancelled'
     WHERE event_id = $1 AND user_id = $2 AND status = 'registered'
     RETURNING id`,
    [req.params.id as string, req.user!.id]
  );

  if (result.rows.length === 0) {
    res.status(404).json({ error: "Na ta dogodek niste prijavljeni." });
    return;
  }

  res.json({ message: "Odjava uspešna." });
});

export default router;