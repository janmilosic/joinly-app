# 03 Podatkovni model
Jan Milošič
## Opis
Podatkovni model aplikacije Joinly temelji na relacijski podatkovni bazi CockroachDB. Entitete so med seboj povezane s primarnimi in tujimi ključi, kar omogoča povezovanje uporabnikov z dogodki, spremljanje prijav ter ocenjevanje in moderiranje vsebin. 

*Podatkovni model je za zdaj le osnova in se lako tekom razvoja spremeni

**Glavne entitete:**
- users: uporabniki in njihove vloge. 
- categories: kategorije dogodkov.
-  events: dogodki in njihove podrobnosti.
-  participations: prijave uporabnikov na dogodke.
-  reviews: ocene in komentarji.
-  reports: prijave neprimernih vsebin.
## Vizualizacija:
```mermaid
erDiagram
    USERS ||--o{ EVENTS : organizes
    CATEGORIES ||--o{ EVENTS : categorizes
    USERS ||--o{ PARTICIPATIONS : registers
    EVENTS ||--o{ PARTICIPATIONS : contains
    USERS ||--o{ REVIEWS : writes
    EVENTS ||--o{ REVIEWS : receives
    USERS ||--o{ REPORTS : submits
    USERS o|--o{ REPORTS : handles
    EVENTS o|--o{ REPORTS : reported
    REVIEWS o|--o{ REPORTS : reported

    USERS {
        UUID id PK
        STRING email UK
        STRING password_hash
        STRING display_name
        STRING role
        BOOLEAN is_blocked
        TIMESTAMPTZ created_at
    }

    CATEGORIES {
        UUID id PK
        STRING name UK
        STRING description
    }

    EVENTS {
        UUID id PK
        UUID organizer_id FK
        UUID category_id FK
        STRING title
        STRING description
        STRING location_name
        STRING region
        TIMESTAMPTZ starts_at
        TIMESTAMPTZ ends_at
        STRING difficulty
        INT capacity
        STRING status
    }

    PARTICIPATIONS {
        UUID id PK
        UUID event_id FK
        UUID user_id FK
        STRING status
        BOOLEAN attended
        TIMESTAMPTZ created_at
    }

    REVIEWS {
        UUID id PK
        UUID event_id FK
        UUID author_id FK
        INT rating
        STRING comment
        BOOLEAN is_hidden
        TIMESTAMPTZ created_at
    }

    REPORTS {
        UUID id PK
        UUID reporter_id FK
        UUID event_id FK
        UUID review_id FK
        STRING reason
        STRING status
        UUID handled_by FK
        TIMESTAMPTZ created_at
    }
```