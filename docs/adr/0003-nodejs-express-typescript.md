---
status: sprejeto
datum: 26-10-2026
---

# Node.js, Express in TypeScript za backend

## Kontekst in problem

Backend mora zagotavljati REST API, skrbeti za prijavo uporabnikov, preverjati pravice in poslovna pravila npr. da se uporabnik ne more prijaviti na poln dogodek ali dvakrat na isti dogodek, ter komunicirati s podatkovno bazo. Izbrati moram jezik in ogrodje za strežniški del.

## Obravnavane možnosti

* Node.js z Express in TypeScriptom
* NestJS
* Fastify
* Spring Boot

## Odločitev

Izbrana možnost: Node.js z Express in TypeScriptom, ker Express poznam, je preprost in hitro omogoči postavitev APIja. Backend je napisan v istem jeziku kot frontend, zato mi ni treba preklapljati med jeziki.

NestJS ponuja vnaprej določeno strukturo projekta, vendar prinaša veliko novih konceptov, kot so moduli, dekoratorji, injiciranje odvisnosti, kar jih ne poznam. Fastify je hitrejši od Expressa, a hitrost pri aplikaciji te velikosti ni ključna, gradiva in primerov uporabe pa je zanj manj. Spring Boot bi pomenil drug jezik in obsežnejše ogrodje, kot ga projekt potrebuje.

### Posledice

* Dobro, ker celoten projekt uporablja en jezik.
* Dobro, ker je Express minimalističen in ga hitro postavim.
* Dobro, ker obstaja veliko pripravljenih vmesnih programov, za piškotke, cors itd.
* Slabo, ker Express ne določa strukture projekta. Delitev na poti, kontrolerje in storitve moram uvesti sam in se je držati.
* Slabo, ker uporaba TypeScripta z Expressom zahteva dodatno nastavitev prevajanja.
* Slabo, ker moram preverjanje vhodnih podatkov dodati sam, npr. s knjižnico za validacijo.
