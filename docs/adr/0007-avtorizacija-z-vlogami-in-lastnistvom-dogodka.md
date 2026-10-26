---
status: sprejeto
datum: 26-10-2026
---

# Avtorizacija z vlogami in lastništvom dogodka

## Kontekst in problem

Aplikacija ima vloge gosta, člana, organizatorja in moderatorja. Organizator sme urejati, odpovedati in pregledovati prijave samo pri dogodkih, ki jih je ustvaril sam. Odločiti se moram, kako bodo pravice organizatorja zapisane. Lahko so, kot posebna vloga uporabnika ali izpeljane iz tega, kdo je dogodek ustvaril.

## Obravnavane možnosti

* Vloga uporabnika in lastništvo dogodka
* Organizator kot posebna vloga
* Ločena tabela pravic za vsakega uporabnika in dogodek

## Odločitev

Izbrana možnost: vloga uporabnika in lastništvo dogodka, ker lahko vsak prijavljen uporabnik ustvari dogodek in s tem postane njegov organizator. Pravice organizatorja backend preveri tako, da primerja ID organizatorja dogodka z IDjem prijavljenega uporabnika.

Posebna vloga organizator ne bi rešila glavnega problema, saj bi moral lastništvo dogodka vseeno preverjati. Uporabnik bi poleg tega moral najprej pridobiti vlogo, kar je nepotrebno. Ločena tabela pravic je za ta obseg prezapletena. Smiselna bi bila pri soorganizatorjih, ki so načrtovani kot kasnejša nadgradnja.

### Posledice

* Dobro, ker je model preprost in ima vloga uporabnika le dve vrednosti.
* Dobro, ker uporabniku ni treba posebej pridobiti pravice za organizacijo dogodkov.
* Slabo, ker ni mogoče omejiti, kdo sme ustvarjati dogodke.
* Slabo, ker bodo implementacija soorganizatorjev zahtevali spremembo modela.