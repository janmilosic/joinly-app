import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/", async (_req, res) => {
  const result = await pool.query("SELECT id, name FROM categories ORDER BY name");
  res.json(result.rows);
});

export default router;