# Joinly app

Joinly je spletna aplikacija za iskanje, organizacijo in prijavo na športne in druge dogodke. Uporabniki lahko pregledujejo dogodke, se nanje prijavijo, jih ocenijo ali pa ustvarijo svoje.

## Uporabljene tehnologije

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Podatkovna baza:** CockroachDB
- **Avtentikacija:** JWT
- **Razvoj:** Docker, Docker Compose

## Dokumentacija

- Zasnova rešitve ([povezava](docs/01-zasnova-resitve.md))
- Funkcionalnosti in obseg ([povezava](docs/02-funkcionalnosti-in-obseg.md))
- Podatkovni model ([povezava](docs/03-podatkovni-model.md))
- Arhitektura in tehnologije ([povezava](docs/04-arhitektura-in-tehnoloski-sklad.md))
- Uporabniške zgodbe ([povezava](docs/05-uporabniske-zgodbe.md))
- Wireframes ([povezava](docs/06-wireframes.md))
- Arhitekturne odločitve ([povezava](docs/adr/))

## Struktura projekta

- **frontend/** – spletna aplikacija
- **backend/** – strežniški del aplikacije
- **db/** – schema podatkovne baze
- **docs/** – dokumentacija projekta

## Lokalni zagon

### Kaj potrebujemo pred zagonom
- Node.js
- Docker Desktop
- Git

### 1. Kloniranje repozitorija

```bash
git clone https://github.com/janmilosic/joinly-app.git
cd joinly-app
```

### 2. Nastavitve okolja

```bash
cp .env.example .env
```

### 3. Zagon podatkovne baze

```bash
docker compose up -d
```

### 4. Zagon backenda
```bash

cd backend
npm install
npm run dev
```
Backend je dostopen na http://localhost:3000

### 5. Zagon frontenda

```bash
cd frontend
npm install
npm run dev
```
Aplikacija je dostopna na http://localhost:5173


### Ponastavitev podatkovne baze

```bash
docker compose down -v
docker compose up -d
```

## Avtor

Jan Milošič