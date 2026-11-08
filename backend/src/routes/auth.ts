import { Router } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db";

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

export default router;