import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/register", async (req, res) => {
  const { displayName, email, password, passwordConfirm } = req.body;

  if (!displayName || !email || !password || !passwordConfirm) {
    res.status(400).json({ error: "Izpolnite vsa polja." });
    return;
  }
  if (!EMAIL_REGEX.test(email)) {
    res.status(400).json({ error: "Epoštni naslov ni veljaven." });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "Geslo mora imeti vsaj 8 znakov." });
    return;
  }
  if (password !== passwordConfirm) {
    res.status(400).json({ error: "Gesli se ne ujemata." });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [normalizedEmail]);
  if (existing.rows.length > 0) {
    res.status(409).json({ error: "Uporabnik s tem epoštnim naslovom že obstaja." });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3)",
    [normalizedEmail, passwordHash, displayName.trim()]
  );

  res.status(201).json({ message: "Registracija uspešna." });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    String(email || "").trim().toLowerCase(),
  ]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password || "", user.password_hash))) {
    res.status(401).json({ error: "Napačen epoštni naslov ali geslo" });
    return;
  }

  if (user.is_blocked) {
    res.status(403).json({ error: "Vaš račun je blokiran." });
    return;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    role: user.role,
  });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Odjava uspešna." });
});

router.get("/me", requireAuth, async (req, res) => {
  const result = await pool.query(
    "SELECT id, display_name, email, role FROM users WHERE id = $1",
    [req.user!.id]
  );
  const user = result.rows[0];

  if (!user) {
    res.status(401).json({ error: "Uporabnik ne obstaja." });
    return;
  }

  res.json({
    id: user.id,
    displayName: user.display_name,
    email: user.email,
    role: user.role,
  });
});

export default router;