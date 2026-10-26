---
status: sprejeto
datum: 26-10-2026
---

# CockroachDB kot podatkovna baza

## Kontekst in problem

Aplikacija hrani uporabnike, dogodke, kategorije, prijave na dogodke, ocene in prijave neprimernih vsebin. Pomembna je konsistentnost, saj dogodek ne sme imeti več prijav, kot ima mest, uporabnik pa se na isti dogodek ne sme prijaviti dvakrat. Izbrati moram podatkovno bazo, ki to zanesljivo podpira.

## Obravnavane možnosti

* CockroachDB
* PostgreSQL
* MySQL
* MongoDB

## Odločitev

Izbrana možnost: CockroachDB, ker je relacijska baza, ki podpira tuje ključe, unikatne omejitve in transakcije. To potrebujem za pravilno delovanje prijav na dogodke. Združljiva je s PostgreSQL, zato lahko uporabljam knjižnico pg in DataGrip. CockroachDB obravnavamo tudi pri drugem predmetu, zato lahko znanje uporabim in poglobim na konkretnem projektu.

PostgreSQL bi bil tehnično enakovredna in nekoliko preprostejša izbira. Glavna prednost CockroachDB je zame to, da jo že spoznavam, prehod na PostgreSQL pa bi bil zaradi združljivosti razmeroma enostaven. MySQL je podoben, MongoDB sem zavrnil, ker so podatki relacijski in bi povezave med dokumenti moral reševati znotraj aplikacije.

### Posledice

* Dobro, ker omejitve v bazi varujejo podatke tudi, če aplikacija naredi napako.
* Dobro, ker lahko uporabljam orodja in knjižnice iz ekosistema PostgreSQL.
* Dobro, ker bi bil prehod na PostgreSQL ob potrebi preprost.
* Slabo, ker CockroachDB privzeto uporablja najstrožjo izolacijo transakcij. Ob sočasnih zahtevah lahko transakcija vrne napako, ki jo moramo obravnavati v backendu.
* Slabo, ker nekatere funkcije PostgreSQL niso podprte ali delujejo drugače.
* Slabo, ker je porazdeljena baza za projekt te velikosti nepotrebna.
