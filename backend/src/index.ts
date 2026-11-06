import express from "express";
import cookieParser from "cookie-parser";
import { pool } from "./db";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", async (_req, res) => {
  const result = await pool.query("SELECT now() AS time");
  res.json({ status: "ok", dbTime: result.rows[0].time });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend teče na http://localhost:${PORT}`);
});