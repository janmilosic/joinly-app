import express from "express";
import cookieParser from "cookie-parser";
import { pool } from "./db";
import authRoutes from "./routes/auth";
import { readUser } from "./middleware/auth";
import categoryRoutes from "./routes/categories";
import eventRoutes from "./routes/events";
import participationRoutes from "./routes/participations";
import userRoutes from "./routes/users";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(readUser);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events", participationRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", async (_req, res) => {
  const result = await pool.query("SELECT now() AS time");
  res.json({ status: "ok", dbTime: result.rows[0].time });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend teče na http://localhost:${PORT}`);
});