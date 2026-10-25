# 05 Uporabniške zgodbe
Jan Milošič

## US-01 – Registracija
- **Povezana funkcionalnost:** Prijava in registracija uporabnika
- **Uporabniška vloga:** Gost
- **Uporabniška zgodba:** Kot gost se želim registrirati z epoštnim naslovom in geslom, da se lahko prijavim na dogodke.
- **Acceptance criteria:**
  - Registracijski obrazec vsebuje polja za ime, epoštni naslov, geslo in ponovitev gesla.
  - Sistem registracije ne dovoli, če je epoštni naslov napačen, geslo krajše od 8 znakov ali če se gesli ne ujemata.
  - Če je epoštni naslov že registriran, sistem prikaže obvestilo in računa ne ustvari.
  - Po uspešni registraciji se uporabnik shrani v bazo z zaščitenim geslom in preusmeri na prijavo.

## US-02 – Prijava in odjava
- **Povezana funkcionalnost:** Prijava in registracija uporabnika
- **Uporabniška vloga:** Gost
- **Uporabniška zgodba:** Kot gost, ki ima račun, se želim prijaviti in odjaviti.
- **Acceptance criteria:**
  - Ob pravilnem epoštnem naslovu in geslu se uporabnik prijavi in preusmeri na seznam dogodkov.
  - Ob napačnih podatkih sistem prikaže obvestilo "Napačen epoštni naslov ali geslo".
  - Prijavljen uporabnik ima v glavi strani gumb "Odjava", po kliku nanj pa se odjavi.

## US-03 – Pregled seznama dogodkov
- **Povezana funkcionalnost:** Pregled nad dogodki
- **Uporabniška vloga:** Gost
- **Uporabniška zgodba:** Kot gost želim pregledati seznam objavljenih dogodkov, da vidim, katere aktivnosti so na voljo.
- **Acceptance criteria:**
  - Seznam dogodkov je viden brez prijave.
  - Vsak dogodek prikazuje naslov, kategorijo, datum, uro in lokacijo.
  - Dogodki so razvrščeni po datumu, na eni strani jih je največ 12.
  - Če ni nobenega dogodka, sistem prikaže obvestilo "Trenutno ni objavljenih dogodkov."

## US-04 – Urejanje dogodka
- **Povezana funkcionalnost:** Urejanje in brisanje dogodkov
- **Uporabniška vloga:** Organizator
- **Uporabniška zgodba:** Kot organizator želim urediti svoj dogodek, da lahko popravim podatke, če se spremenijo načrti.
- **Acceptance criteria:**
  - Gumb "Uredi dogodek" vidi samo organizator tega dogodka.
  - Obrazec se odpre z obstoječimi podatki, po shranjevanju so spremembe takoj vidne.
  - Največjega števila udeležencev ni mogoče zmanjšati pod število že prijavljenih.
  - Tujega dogodka ni mogoče urejati, sistem takšno zahtevo zavrne.

## US-05 – Brisanje dogodka
- **Povezana funkcionalnost:** Urejanje in brisanje dogodkov
- **Uporabniška vloga:** Organizator
- **Uporabniška zgodba:** Kot organizator želim izbrisati svoj dogodek, da ga ni več na seznamu, če ga ne bo.
- **Acceptance criteria:**
  - Dogodek lahko izbriše samo njegov organizator.
  - Pred brisanjem sistem zahteva potrditev.
  - Po potrditvi dogodek izgine s seznama dogodkov.

## US-06 – Ustvarjanje in objava dogodka
- **Povezana funkcionalnost:** Ustvarjanje in objava dogodkov
- **Uporabniška vloga:** Organizator
- **Uporabniška zgodba:** Kot organizator želim ustvariti in objaviti dogodek, da se lahko drugi uporabniki nanj prijavijo.
- **Acceptance criteria:**
  - Obrazec vsebuje naslov, opis, kategorijo, lokacijo, regijo, začetek, konec, težavnost in največje število udeležencev.
  - Sistem dogodka ne shrani, če kakšno polje ni izpolnjeno, če je začetek v preteklosti, konec pred začetkom ali število udeležencev manjše od 1.
  - Po kliku na "Objavi dogodek" se dogodek prikaže na seznamu in je povezan z organizatorjem.

## US-07 – Iskanje dogodkov
- **Povezana funkcionalnost:** Iskanje in filtriranje dogodkov
- **Uporabniška vloga:** Član
- **Uporabniška zgodba:** Kot član želim iskati dogodke po naslovu, da hitro najdem dogodek, ki ga iščem.
- **Acceptance criteria:**
  - Nad seznamom dogodkov je iskalno polje.
  - Iskanje deluje pri vnosu vsaj 3 znakov in ne razlikuje med velikimi in malimi črkami.
  - Če ni zadetkov, sistem prikaže obvestilo "Ni zadetkov".

## US-08 – Filtriranje dogodkov
- **Povezana funkcionalnost:** Iskanje in filtriranje dogodkov
- **Uporabniška vloga:** Član
- **Uporabniška zgodba:** Kot član želim filtrirati dogodke, da najdem tiste, ki mi ustrezajo.
- **Acceptance criteria:**
  - Na voljo so filtri za kategorijo, regijo, težavnost, datum od in do ter "Samo dogodki s prostimi mesti".
  - Seznam prikaže samo dogodke, ki ustrezajo vsem izbranim filtrom.
  - Gumb "Počisti" ponastavi filtre in prikaže vse dogodke.

## US-09 – Prijava na dogodek
- **Povezana funkcionalnost:** Prijava in odjava od dogodka
- **Uporabniška vloga:** Član
- **Uporabniška zgodba:** Kot član se želim prijaviti na dogodek, da si zagotovim mesto.
- **Acceptance criteria:**
  - Gumb "Prijavi se na dogodek" je viden, če je še kakšno mesto prosto in uporabnik še ni prijavljen.
  - Po prijavi se število prijavljenih poveča za 1, gumb pa se spremeni v "Odjavi se".
  - Če je dogodek poln, je gumb onemogočen in ima napis "Dogodek je poln".
  - Uporabnik se na isti dogodek ne more prijaviti dvakrat.

## US-10 – Odjava od dogodka
- **Povezana funkcionalnost:** Prijava in odjava od dogodka
- **Uporabniška vloga:** Član
- **Uporabniška zgodba:** Kot član se želim odjaviti od dogodka, da sprostim mesto, če se ga ne morem udeležiti.
- **Acceptance criteria:**
  - Gumb "Odjavi se" je viden samo uporabniku, ki je prijavljen na dogodek.
  - Po odjavi se prijava prekliče in število prijavljenih se zmanjša za 1.
  - Dogodek izgine s seznama prihajajočih prijav na profilu.

## US-11 – Osnovni podatki dogodka
- **Povezana funkcionalnost:** Pregled podrobnosti dogodka
- **Uporabniška vloga:** Gost
- **Uporabniška zgodba:** Kot gost želim videti osnovne podatke dogodka, da se odločim, ali me zanima, še preden se registriram.
- **Acceptance criteria:**
  - Gost vidi naslov, kategorijo, datum, uro in lokacijo dogodka.
  - Opisa, organizatorja in števila prijavljenih gost ne vidi, namesto njih je prikazan poziv k prijavi ali registraciji.
  - Gost nima gumba za prijavo na dogodek.

## US-12 – Vse podrobnosti dogodka
- **Povezana funkcionalnost:** Pregled podrobnosti dogodka
- **Uporabniška vloga:** Član
- **Uporabniška zgodba:** Kot član želim videti vse podrobnosti dogodka, da se lahko odločim, ali se mu pridružim.
- **Acceptance criteria:**
  - Stran prikazuje opis, kategorijo, lokacijo, datum in uro, težavnost in organizatorja.
  - Prikazano je število prijavljenih in prostih mest.
  - Če ni več prostih mest, je prikazana oznaka "Dogodek je poln".

## US-13 – Seznam prijavljenih na dogodek
- **Povezana funkcionalnost:** Pregled podrobnosti dogodka
- **Uporabniška vloga:** Organizator
- **Uporabniška zgodba:** Kot organizator želim videti, kdo je prijavljen na moj dogodek, da imam pregled nad udeleženci.
- **Acceptance criteria:**
  - Na strani lastnega dogodka je seznam prijavljenih z imenom in datumom prijave.
  - Seznam vidi samo organizator tega dogodka.
  - Če ni prijavljenih, sistem prikaže obvestilo "Za ta dogodek še ni prijav."

## US-14 – Profil in prihajajoče prijave
- **Povezana funkcionalnost:** Uporabniški profil in zgodovina
- **Uporabniška vloga:** Član
- **Uporabniška zgodba:** Kot član želim na profilu videti svoje podatke in prihajajoče prijave, da vem, na katere dogodke grem.
- **Acceptance criteria:**
  - Profil prikazuje ime, epoštni naslov in datum registracije.
  - Zavihek "Prihajajoče prijave" prikazuje dogodke, ki se še niso začeli, razvrščene po datumu.
  - Če uporabnik nima prijav, sistem prikaže obvestilo "Nimate prihajajočih prijav."

## US-15 – Zgodovina dogodkov
- **Povezana funkcionalnost:** Uporabniški profil in zgodovina
- **Uporabniška vloga:** Član
- **Uporabniška zgodba:** Kot član želim videti dogodke, ki sem se jih udeležil ali jih organiziral, da imam pregled nad svojimi preteklimi aktivnostmi.
- **Acceptance criteria:**
  - Zavihek "Zgodovina udeležbe" prikazuje pretekle dogodke, na katere je bil uporabnik prijavljen, od najnovejšega.
  - Zavihek "Organizirani dogodki" prikazuje dogodke, ki jih je uporabnik ustvaril.
  - Če je seznam prazen, sistem prikaže ustrezno obvestilo.
