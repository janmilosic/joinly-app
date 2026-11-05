INSERT INTO categories (name, description) VALUES
  ('Pohodništvo', 'Pohodi in izleti v hribe'),
  ('Tek', 'Skupinski teki'),
  ('Kolesarjenje', 'Cestno in gorsko kolesarjenje'),
  ('Skupinska vadba', 'Vadbe na prostem in v dvorani')
ON CONFLICT (name) DO NOTHING;