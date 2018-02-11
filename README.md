# Kvaak.codes
**Kvaak.codes** on Petja Tourun näkemys ja toteutus Vincitin kesähaasteesta, jossa haettiin Vincitin ankkabongaajille sovellusta havaintojensa kirjaamiseksi.

## Demo
Ohjelmaa voinee testata livenä osoitteessa [kvaak.codes](https://kvaak.codes/). Frontti tekee pyyntöjä tehtävänannossa osoitettuun yksinkertaiseen palvelinsovellukseen. Asennusohjeita seuraamalla, ohjelman saa tekemään pyyntöjä myös muihin urleihin.

## Asennusohjeet
1. Kloonaa Github-repo ja vaihda kloonattuun kansioon
2. Tee tarvittavat muutokset `src/Config.js` tiedostoon
3. Aja `yarn` depsien lataamiseksi ja asentamiseksi
4. Aja valintasi mukaan joko `yarn run build-prod` tai `yarn run build-dev`. Näistä ensimmäinen komento tuottaa minifoitua koodia. Devausversiossa minifointia ei tehdä ja lisäksi *webpack* jatkaa tiedostojen muutosten tarkkailua.
5. Vaihda kansioon `dist`
6. Aja `python3 -m http.server $KVAAK_PORT`. Frontti avautuu `$KVAAK_PORT` muuttujan mukaiseen porttiin. Olisin voinut käyttää frontin hostaamiseen myös Express.js:ää mutta halusin keskittyä tehtävänannossa pyydettyyn fronttisovellukseen, joten päädyin kevyempään ratkaisuun, vaatien kylläkin että `python3` on asennettuna.
7. Valmis bongailemaan ankkoja :muscle: