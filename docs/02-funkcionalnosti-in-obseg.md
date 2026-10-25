# 02 Funkcionalnosti in obseg
Jan Milošič
## Uporabniške vloge:
1. **Gost (neprijavljen uporabnik)**
Lahko:
- preglejuje objavljene dogodke
- vidi osnovne podrobnosti dogodka, kot je lokacija, čas in vrsta
- se registrira

Ne more: 
- se priavit na dogodek
- upravljati dogodkov
- podati ocene ali komentarja
- videti podrobnih informacij o dogodku

2. **Član (prijavljen uporabnik)**
Lahko:
- vse kar lahko gost
- se prijavi na dogodek
- ureja svoj profil in vidi zgodovino svoje udeležbe
- oceni dogodek in komentira
- prijavi neprimeren dogodek

Ne more:
- pregledati seznama prijavljenih na dogodek
- moderirati vsebine
- ustvariti svojega dogodka

3. **Organizator**
Lahko:
- ureja dogodek in ga objavi
- dogodek odpove
- vidi seznam prijavljenih na dogodek, ki ga je ustvaril

Ne more:
- urejati tujih dogodkov
- spreminjati ali brisati ocen in komentarjev
- ocenjevati lastnega dogodka
- moderirati vsebine

4. **Moderator**
Lahko:
- vse kar lahko član, razen urejanja profila in prgleda nad preteklimi dogodki
- odstrani neprimerne komentarje in objave
- blokira uporabnika
- upravlja kategorije dogodkov

Ne more:
- urejati vsebine dogodkov drugih
- se prijaviti na dogodek
- spreminjati komentarjev in ocen

## Predvidene funkcionalnosti:
- Osnovne funkcionalnosti (MVP): prijava, registracija uporabnika, pregled nad dogodki, urejanje in brisanje
- Ustvarjanje in objava dogodkov (MVP): Organizator lahko ustvari in objavi dogodek z opisom, datumom, lokacijo, kategorijo, težavnostjo in omejitvijo števila udeležencev.
- Iskanje in filtriranje dogodkov (MVP): Uporabnik lahko išče in filtrira dogodke glede na vrsto aktivnosti, datum, lokacijo, težavnost in število prostih mest.
- Prijava in odjava od dogodka (MVP): Uporabnik se lahko prijavi na dogodek ali svojo prijavo prekliče. Sistem pri tem preveri razpoložljiva mesta.
- Pregled podrobnosti dogodka (MVP): uporabnik si lahko ogleda opis, lokacijo, datum, težavnost, organizatorja in število prijavljenih udeležencev.
- Uporabniški profil in zgodovina (MVP): Uporabnik lahko pregleda svoje osnovne podatke, prihajajoče prijave in zgodovino dogodkov, ki se jih je udeležil ali jih je organiziral.
- Odpoved dogodka: Organizator lahko odpove objavljen dogodek, uporabniki, prijavljeni nanj, pa lahko vidijo njegovo spremenjeno stanje.
- Zaključek dogodka: Po predvidenem terminu se dogodek označi kot zaključen, nove prijave pa niso več mogoče.
- Ocenjevanje in komentiranje dogodkov: Udeleženci lahko po izvedenem dogodku oddajo oceno in komentar o svoji izkušnji.
- Statistika organizatorja: Profil organizatorja prikazuje podatke, kot so število organiziranih dogodkov in povprečna ocena.
- Prijava neprimernih vsebin: Uporabnik lahko prijavi neprimeren dogodek ali komentar ter navede razlog za prijavo.
- Moderiranje vsebin: Moderator lahko obravnava prijavljene vsebine, odstrani neprimerne objave in ukrepa proti uporabnikom, ki kršijo pravila uporabe.
- Upravljanje kategorij dogodkov – Moderator lahko dodaja in ureja kategorije, po katerih uporabniki razvrščajo in iščejo dogodke.

**Ključne funkcionalnosti:**
- Prijava, registracija uporabnika, pregled nad dogodki, urejanje in brisanje
- Ustvarjanje in objava dogodkov
- Iskanje in filtriranje dogodkov
- Prijava in odjava od dogodka
- Pregled podrobnosti dogodka
- Uporabniški profil in zgodovina

## Kasnejše nadgradnje
- Zemljevid dogodkov: prikaz lokacij dogodkov na zemljevidu in iskanje dogodkov v bližini uporabnika.
- Obvestila: obveščanje uporabnikov o spremembah in odpovedih dogodkov.
- Sledenje organizatorjem: možnost spremljanja priljubljenih organizatorjev in njihovih novih dogodkov.
- Priporočila dogodkov: predlogi dogodkov glede na interese uporabnika in njegove pretekle aktivnosti.
- Ponavljajoči se dogodki: možnost ustvarjanja dogodkov, ki se ponavljajo v določenih časovnih intervalih.
- Komunikacija med udeleženci: možnost izmenjave sporočil in dogovarjanja pred dogodkom.
- Soorganizatorji: možnost, da pri organizaciji istega dogodka sodeluje več organizatorjev.
- Statistika in analitika: pregled priljubljenosti dogodkov, kategorij in udeležbe.

## Out of scope
- Plačila in plačljivi dogodki: aplikacija ne bo omogočala plačevanja ali nakupa vstopnic.
- Klepet in zasebna sporočila: uporabniki ne bodo mogli neposredno komunicirati prek klepeta v aplikaciji.
- Napredne družabne funkcionalnosti: aplikacija ne bo vključevala prijateljstev in všečkov.
- Mobilna aplikacija: razvita bo spletna aplikacija, prilagojena uporabi na računalnikih, tablicah in mobilnih napravah.
- E-poštna in potisna obvestila: aplikacija ne bo pošiljala obvestil prek e-pošte ali potisnih sporočil.
- Zemljevidi in GPX-poti: prikaz lokacij na zemljevidu ter nalaganje in prikaz poti ne bosta vključena.
- Prijava prek zunanjih ponudnikov: prijava z računi Google, Apple in drugimi zunanjimi ponudniki ne bo podprta. 