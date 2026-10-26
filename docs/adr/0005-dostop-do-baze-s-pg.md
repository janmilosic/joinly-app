---
status: sprejeto
datum: 26-10-2026
---

# Dostop do baze s knjižnico pg

## Kontekst in problem

Backend mora izvajati poizvedbe nad CockroachDB. Odločiti se moram, ali bom SQL poizvedbe pisal sam ali ša bom uporabil ORM. 

## Obravnavane možnosti

* Knjižnica pg z ročno pisanimi SQL poizvedbami
* Prisma
* TypeORM

## Odločitev

Izbrana možnost: pg z ročno pisanimi poizvedbami, ker imam tako popoln nadzor nad tem, kaj se izvede v bazi. To je pomembno pri filtriranju dogodkov po več kriterijih hkrati, pri štetju prostih mest in pri transakcijah ob prijavi na dogodek. Hkrati pa ta pristop že dobro poznam in lahko utrjujem znanje SQL, poizvedbe pa lahko najprej preizkusim v DataGripu.

ORMji pospešijo pisanje preprostih operacij, vendar skrijejo, kateri SQL se dejansko izvede, kar otežuje iskanje napak. Podpora ORMjev za CockroachDB pa je slabša. 

### Posledice

* Dobro, ker vidim točno, kateri SQL se izvede, kar olajša iskanje napak.
* Dobro, ker lahko poizvedbe preizkusim v DataGripu in jih neposredno prenesem v kodo.
* Dobro, ker ima projekt manj odvisnosti.
* Slabo, ker je pri preprostih operacijah več ročnega pisanja kode.
* Slabo, ker rezultati poizvedb niso samodejno tipizirani in moram tipe pisati ročno.
* Slabo, ker je možnost, da je aplikacija ranljiva za SQL injection.
