---
status: sprejeto
datum: 26-10-2026
---

# Ločen frontend in backend, ki komunicirata prek REST API

## Kontekst in problem

Joinly app ima javni del, ki ga vidijo gostje, in dele, ki so dostopni samo prijavljenim uporabnikom, organizatorjem in moderatorjem. Podatki, kot so opis dogodka ali seznam prijavljenih morajo ostati skriti glede na vlogo uporabnika. Odločiti se moramo, ali bo aplikacija en projekt, ki strani generira na strežniku ali ločen frontend in backend.

## Obravnavane možnosti

* Ločen frontend in backend, ki komunicirata prek REST API
* Ločen frontend in backend, ki komunicirata prek GraphQL
* Full-stack ogrodje, ki združi oboje npr. Next.js

## Odločitev

Izbrana možnost: ločen frontend in backend z REST API, ker jasno loči prikaz podatkov od poslovne logike in preverjanja pravic. Vsa pravila dostopa so na enem mestu, v backendu, frontend pa skrbi samo za prikazovanje vsebine. Pregled, ustvarjanje, urejanje in brisanje dogodkov, prijava in odjava ter ocene se naravno preslikajo v REST vire in HTTP metode, npr. GET /events ali POST /events/:id/participations. REST poznam, Express pa ga podpira brez dodatnih knjižnic, backend pa lahko testiram s Postmanom, tudi če še frontend ne obstaja.

GraphQL bi za to aplikacijo dodal nepotrebno kompleksnost, Next.js pa bi združil oba dela v en projekt vendar ogrodja ne poznam dovolj dobro.

### Posledice

* Dobro, ker so pravice preverjene samo v backendu. Gostu backend opisa dogodka sploh ne pošlje, namesto da bi ga frontend samo skril.
* Dobro, ker lahko frontend in backend razvijam, testiram in zaganjam neodvisno.
* Dobro, ker HTTP statusne kode jasno povejo za katero napaka gre.
* Dobro, ker lahko isti API kasneje uporablja tudi za drug projekt ali nadgradnjo npr. mobilna aplikacija.
* Slabo, ker imam dva projekta z ločenimi odvisnostmi, nastavitvami in zagonom.
* Slabo, ker se tipi podatkov med frontendom in backendom ne delijo samodejno, zato moram ob spremembi API-ja obe strani uskladiti ročno.
