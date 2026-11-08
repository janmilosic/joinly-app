import { Router } from "express";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

function toProfileEvent(row: any) {
  return {
    id: row.id,
    title: row.title,
    startsAt: row.starts_at,
    locationName: row.location_name,
    categoryName: row.category_name,
  };
}

router.get("/me", requireAuth, async (req, res) => {
  const userId = req.user!.id;

  const userResult = await pool.query(
    "SELECT display_name, email, created_at FROM users WHERE id = $1",
    [userId]
  );
  const user = userResult.rows[0];

  const upcoming = await pool.query(
    `SELECT e.id, e.title, e.starts_at, e.location_name, c.name AS category_name
     FROM participations p
     JOIN events e ON e.id = p.event_id
     JOIN categories c ON c.id = e.category_id
     WHERE p.user_id = $1 AND p.status = 'registered' AND e.starts_at > now()
     ORDER BY e.starts_at ASC`,
    [userId]
  );

  const history = await pool.query(
    `SELECT e.id, e.title, e.starts_at, e.location_name, c.name AS category_name
     FROM participations p
     JOIN events e ON e.id = p.event_id
     JOIN categories c ON c.id = e.category_id
     WHERE p.user_id = $1 AND p.status = 'registered' AND e.starts_at <= now()
     ORDER BY e.starts_at DESC`,
    [userId]
  );

  const organized = await pool.query(
    `SELECT e.id, e.title, e.starts_at, e.location_name, c.name AS category_name
     FROM events e
     JOIN categories c ON c.id = e.category_id
     WHERE e.organizer_id = $1
     ORDER BY e.starts_at DESC`,
    [userId]
  );

  res.json({
    displayName: user.display_name,
    email: user.email,
    createdAt: user.created_at,
    upcoming: upcoming.rows.map(toProfileEvent),
    history: history.rows.map(toProfileEvent),
    organized: organized.rows.map(toProfileEvent),
  });
});

export default router;