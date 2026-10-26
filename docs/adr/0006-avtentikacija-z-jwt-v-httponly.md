---
status: sprejeto
datum: 26-10-2026
---

# Avtentikacija z JWT v piškotku httpOnly

## Kontekst in problem

Uporabniki se registrirajo in prijavljajo z epoštnim naslovom in geslom. Backend mora pri vsaki zahtevi vedeti, kdo je uporabnik in kakšno vlogo ima. Odločiti se moram, kako bo brskalnik hranil podatek o prijavi in kako ga bo backend preverjal.

## Obravnavane možnosti

* JWT žeton v piškotku httpOnly
* JWT žeton v localStorage
* Strežniška seja shranjena v bazi, brskalnik hrani samo ID seje

## Odločitev

Izbrana možnost: JWT v piškotku httpOnly, ker backendu ni treba hraniti stanja prijave. Vsaka zahteva vsebuje žeton, ki ga backend preveri s podpisom, brez dodatne poizvedbe v bazo. Do piškotka httpOnly JavaScript v brskalniku ne more dostopati, zato žetona ni mogoče ukrasti. To je glavna slabost hrambe v localStorage, kjer je žeton dostopen vsaki skripti na strani. Strežniške seje bi bile enako varne, vendar zahtevajo dodatno tabelo sej in poizvedbo ob vsaki zahtevi. Gesla bodo v bazi shranjena samo kot zgoščena vrednost z algoritmom bcrypt.

### Posledice

* Dobro, ker backend ne potrebuje tabele sej.
* Dobro, ker je žeton zaščiten pred krajo.
* Dobro, ker brskalnik piškotek pošilja samodejno in frontendu ni treba upravljati žetona.
* Slabo, ker se piškotek pošilja samodejno, zato je potrebna zaščita pred napadi.
* Slabo, ker žeton velja do izteka. Blokiran uporabnik bi lahko aplikacijo še nekaj časa uporabljal, zato mora imeti žeton kratko veljavnost