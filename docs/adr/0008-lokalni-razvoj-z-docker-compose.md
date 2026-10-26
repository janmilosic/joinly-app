---
status: sprejeto
datum: 26-10-2026
---

# Lokalni razvoj z Docker Compose

## Kontekst in problem

Za razvoj potrebujem delujočo bazo CockroachDB, kasneje pa tudi backend in frontend. Okolje in shema baze naj se postavita enako na vsakem računalniku, gesla in nastavitve povezav pa ne smejo biti zapisani v kodi ali v repozitoriju.

## Obravnavane možnosti

* Docker Compose
* Ročna namestitev CockroachDB na računalnik
* Oblačna baza CockroachDB Cloud

## Odločitev

Izbrana možnost: Docker Compose, ker lahko z enim ukazom docker compose up zaženem bazo in ostale storitve z vedno enakimi nastavitvami, brez nameščanja programov v sistem. Shema baze bo zapisana v SQL datotekah v repozitoriju, ki se izvedejo ob postavitvi baze. Tako je postavitev ponovljiva, spremembe sheme pa so vidne v Gitu.

Ročna namestitev se razlikuje med operacijskimi sistemi in jo je težje ponoviti. Oblačna baza zahteva internetno povezavo, ima omejitve brezplačne različice in ne omogoča hitrega brisanja in ponovne postavitve razvojnih podatkov. Nastavitve in skrivnosti bodo shranjene v datoteki .env, ki ni v repozitoriju.

### Posledice

* Dobro, ker je razvojno okolje ponovljivo in enako na vsakem računalniku.
* Dobro, ker lahko bazo kadarkoli izbrišem in jo s SQL datotekami znova postavim.
* Dobro, ker skrivnosti niso shranjene v repozitoriju.
* Slabo, ker mora biti Docker nameščen in med delovanjem porablja dodatne vire.
* Slabo, ker se .env ne deli prek Gita, zato jo moram ročno prenesti ali ponovno zapisati.