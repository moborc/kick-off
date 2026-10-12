# Dela Kick-off och English Explorers Grammar med eleverna

Båda sidorna är förberedda för **GitHub Pages**. De består av färdiga webbfiler och behöver varken Supabase, elevkonton eller API-nycklar. Eleverna öppnar sidan och börjar träna direkt.

## Paketen

| Paket | Innehåll |
|---|---|
| `Kick_Off_GitHub_Pages.zip` | Kick-off English Lab med 69 aktiviteter, tre stödnivåer, bokkopplingar och 16 inbäddade bilder. |
| `English_Explorers_Grammar_GitHub_Pages.zip` | Grammar med 20 områden, tre nivåer, varierade frågeurval, memory, Word Match, skrivträning, bilder och övriga övningsformer. |

I varje paket finns en mapp som heter **webb**. Det är innehållet i den mappen som ska laddas upp till GitHub. Instruktioner och kontrollresultat följer också med i paketet.

## 1. Publicera Kick-off

1. Packa upp `Kick_Off_GitHub_Pages.zip` på datorn.
2. Skapa ett GitHub-repository, exempelvis `kick-off`. Ett publikt repository är det enkla alternativet för GitHub Pages; stöd för privata repositories beror på abonnemang.
3. Välj **Add file → Upload files** i repositoryt.
4. Ladda upp **innehållet i webb-mappen** till repositoryts rot. `index.html` ska ligga direkt där. Kick-offs kod, övningar och bilder finns i den filen. Ta även med `.nojekyll` om den visas i filhanteraren.
5. Välj **Commit changes**.
6. Öppna **Settings → Pages**.
7. Under **Build and deployment** väljer du **Deploy from a branch**.
8. Välj **main**, mappen **/(root)** och **Save**.
9. Vänta tills GitHub visar att sidan är publicerad. Öppna adressen i Pages-inställningarna.

Adressen brukar bli `https://DITT-ANVANDARNAMN.github.io/kick-off/`. Använd den adress GitHub faktiskt visar.

## 2. Publicera Grammar

Gör samma steg i ett separat repository, exempelvis `english-explorers-grammar`.

Ladda upp allt i paketets **webb-mapp**:

- `index.html`
- `app.js`
- `data.js`
- `styles.css`
- hela mappen `assets`, med alla bilder
- `.nojekyll`, om den visas

Behåll mappstrukturen. `assets` ska ligga bredvid `index.html`, och bilderna ska ligga inuti `assets`. Välj sedan **Settings → Pages → Deploy from a branch → main → /(root)**.

Du behöver inte fylla i `config.js`, skapa konton eller köra SQL för dessa två sidor.

## 3. Kontrollera före elevtestet

1. Öppna den publicerade adressen i ett privat/inkognito-fönster. Övningarna ska öppnas utan inloggning.
2. Prova även på en mobil eller elevdator.
3. I Kick-off: välj nivå, öppna ett ordspel, en grammatikövning och en bildövning. Kontrollera att bilderna syns och att en avslutad omgång visar återkoppling.
4. I Grammar: välj ett område och en nivå. Starta en ny omgång och kontrollera att urvalet varierar.
5. I Grammar Memory: välj två kort som inte passar ihop. De ska visas i cirka två sekunder och sedan vändas tillbaka med en liten animation.
6. Skriv några meningar i Grammar. Byt övning och gå tillbaka: utkastet ska finnas kvar i samma flik. Välj **Om sidan → Rensa** när du vill börja om.
7. Kopiera adressen från GitHub Pages och dela den med eleverna, exempelvis via Haldor eller som länk i ditt personliga planeringsverktyg.

## Resultat och skrivutkast

**Kick-off:** resultat och skrivutkast finns i sidans minne. De försvinner när sidan laddas om eller stängs.

**Grammar:** historik, nivåval och skrivutkast sparas med `sessionStorage`, alltså tillfälligt i den aktuella fliken. De finns kvar vid vanlig omladdning och när eleven växlar mellan övningar i samma flik. Lagringen gäller flikens session och rensas normalt när fliken stängs. Vissa webbläsare kan återställa en session när stängda flikar återöppnas; använd sidans **Rensa** om du vill tömma innehållet direkt.

Ingen av sidorna efterfrågar elevnamn eller skickar elevernas svar och resultat till en databas. Det finns ingen resultatsammanställning för läraren eller synkronisering mellan elevens enheter.

Det här är separata GitHub-exporter. De tidigare versionerna och deras lagring har inte ändrats.

## Uppdatera sidorna senare

Du kan ersätta webbfilerna i samma GitHub-repository när vi gör en ny version. Pages publicerar den nya versionen och samma adress kan fortsätta användas.

Jag kan också hjälpa till att ändra filerna direkt i GitHub när jag har repositorylänken och åtkomst med skrivrättigheter. Ett publikt repository kan läsas via länken; att lägga in ändringar kräver autentiserad åtkomst. Ändringar kan då granskas innan de förs in och publiceras.

För Grammar följer de redigerbara innehållskällorna med: `make_content.py`, `content_banks.py` och `make_visuals.py`. De kan återskapa `webb/data.js` och SVG-bilderna. Befintliga PNG-bilder ingår i `webb/assets`. Python behövs bara för sådana innehållsändringar, inte för uppladdningen. Ingen JavaScript-byggprocess behövs.

## Om något inte fungerar

| Problem | Kontrollera |
|---|---|
| GitHub visar 404 | Pages publicerar `main` och `/(root)`, och `index.html` ligger i repositoryts rot. |
| Grammar visar en tom eller ofullständig sida | `app.js`, `data.js` och `styles.css` ligger bredvid `index.html`. |
| Bilder saknas i Grammar | Hela `assets`-mappen har laddats upp och filnamnen är oförändrade. |
| Du ser en äldre version | Vänta tills GitHub publicerat ändringen och gör en hård omladdning med Ctrl+F5. |
| Du kan inte spara ett utkast | Fliklagringen kan vara blockerad i webbläsaren. Övningarna fungerar ändå; kopiera texten om du vill behålla den. |

## Kontrollerade filer

Kick-offs övningskatalog, 69 aktivitetsstarter, facit, en full grammatikomgång, kapitelkopplingar och inbäddade bilder har kontrollerats med en liten DOM-adapter. Grammar har kontrollerats i 540 kombinationer av område, nivå och övningsform, inklusive frågeurval, rättning, memory-timers, animationer, Word Match, skrivutkast och lokala bilder. JavaScript-syntax och relativa filreferenser är också kontrollerade.

Layouten har inte provklickats i en riktig webbläsare i denna miljö. Testa därför de publicerade sidorna enligt stegen ovan innan första elevpasset.

GitHubs officiella guider: [skapa en Pages-sida](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) och [välj publiceringskälla](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Förberett 12 oktober 2026.
