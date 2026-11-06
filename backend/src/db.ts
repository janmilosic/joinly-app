import path from "path";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

pg.types.setTypeParser(20, (val) => parseInt(val, 10));

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});