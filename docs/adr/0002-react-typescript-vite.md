---
status: sprejeto
datum: 26-10-2026
---

# React, TypeScript in Vite za frontend

## Kontekst in problem

Uporabniški vmesnik vsebuje seznam dogodkov z iskanjem in filtri, obrazce za ustvarjanje in urejanje dogodkov, različne prikaze glede na vlogo uporabnika, profil z zavihki in statistiko organizatorja. Potrebujem orodje za razvoj spletne aplikacije, ki dobro deluje v brskalniku.

## Obravnavane možnosti

* React s TypeScriptom in Vite
* Vue
* Angular
* HTML, CSS, JavaScript

## Odločitev

Izbrana možnost: React s TypeScriptom in Vite, ker React že poznam in ima velik ekosistem knjižnic, ki jih potrebujem, kot so React Router za navigacijo med stranmi in Recharts za prikaz statistike. TypeScript že med pisanjem kode opozori na napake pri delu s podatki iz APIja, npr. napačno ime polja ali manjkajočo vrednost. Vite omogoča hiter razvojni strežnik in je danes običajen način za postavitev novega React projekta. Prav tako pa omogoča hot reload, za lažje razvijanje aplikacije.

Vue je po zmožnostih podoben, vendar ga ne poznam, zato bi porabil več časa za učenje. Angular je obsežno ogrodje z veliko koncepti, ki so za projekt te velikosti nepotrebni. Osnoven HTML, CSS in JavaScript pa je za takšen projekt zelo potraten in se dandanes skoraj več samostojno ne uporablja.

### Posledice

* Dobro, ker tehnologijo poznam in lahko hitreje začnem z razvojem.
* Dobro, ker je na voljo veliko knjižnic, primerov in dokumentacije.
* Slabo, ker je React knjižnica in ne celotno ogrodje. Obrazce, upravljanje stanja in klice APIja moram organizirati sam.
* Slabo, ker TypeScript zahteva dodatne nastavitve in pisanje tipov za vse odgovore APIja.
