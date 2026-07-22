# Telegrami bot — juhend

See dokument kirjeldab, kuidas Telegrami bot on projektis integreeritud, milliseid teateid see saadab ja kuidas töötab reaalajas veebivestlus (Live Chat).

## Mis bot teeb

Bot saadab automaatseid teavitusi erinevate veebilehel toimuvate sündmuste kohta. Koodibaasis on järgmised sündmused (triggerid), mis panevad boti sõnumit saatma:

- **Üldised kontaktivormid ja Lead Magnetid** (`/api/telegram-lead/route.ts`): Saadab teavituse, kui keegi laeb alla tasuta materjali või täidab üldise kontaktivormi.
- **Koolitusele registreerimine** (`/api/course-registration/route.ts`): Teavitab uuest koolitusele registreerujast (nimi, e-post, telefon, märkused jne).
- **Töötukassa päring** (`/api/grant-inquiry/route.ts`): Teavitab, kui keegi esitab Töötukassa toetuse vormi (sisaldab isikukoodi valideerimist).
- **Küsimustiku / Testi vastused** (`/api/quiz-submit/route.ts`): Saadab kliendi poolt täidetud testi tulemused ja andmed.
- **Sihtgrupi valik** (`/api/audience-submit/route.ts`): Teavitab spetsiifilise "Audience" vormi täitmisest (kui kasutaja valib oma probleemid ja eesmärgid).
- **Live Chat (reaalajas vestlus)** (`/api/chat/send/route.ts`): Teavitab uuest vestluse sõnumist ja saadab kasutaja sisestatud kontaktandmed (lead rikastamine).
- **Live Chat automaatvastus** (`/api/chat/trigger-fallback/route.ts`): Saadab administraatorile süsteemiteavituse, kui bot saatis kliendile automaatse vastuse (kuna administraator ei vastanud õigeaegselt).

## Kuidas teateid saada

Teavituste saamiseks tuleb seadistada Telegrami bot ja ühendada see veebilehega:

1. **Loo bot:** Mine Telegramis [@BotFather](https://t.me/botfather) juurde ja loo uus bot (käsklus `/newbot`). Kopeeri saadud **Bot Token**.
2. **Loo vestlus:** Tee Telegramis uus grupp (või kasuta olemasolevat) ning lisa loodud bot sinna gruppi.
3. **Leia Chat ID:** Kirjuta gruppi suvaline sõnum ja kasuta mõnda tööriista (nt @RawDataBot), et teada saada selle grupi **Chat ID** (tavaliselt miinusmärgiga number, nt `-100123456789`).
4. **Seadista keskkonnamuutujad (Environment Variables):**
   Lisa serveri seadetesse (nt Vercelis või `.env` failis) järgmised väärtused:
   - `TELEGRAM_BOT_TOKEN="sinu_boti_token"`
   - `TELEGRAM_CHAT_ID="-100123456789"`

**Kuidas teated välja näevad:**
Sõnumid tulevad selgelt vormindatult koos vastavate emojidega. Näiteks sihtgrupi vormi täitmisel näeb sõnum välja selline:
```
🎯 UUS TEGEVUS: SIHTGRUPPI VALIK

📝 Küsimustik: "Koolituse sihtgrupi valik"

🔥 VALITUD PROBLEEMID:
• "Protsessid on ebaefektiivsed"
...
```

## Live chat — kuidas vastata

Veebilehe all paremas nurgas olev reaalajas vestlus (Live Chat) on otse ühendatud Telegramiga. Kui külastaja kirjutab lehel sõnumi, tuleb see Telegrami gruppi.

**Kuidas külastajale vastata:**
1. Bot saadab Telegrami gruppi teate: `💬 Uus sõnum reaalajas vestlusest (Live Chat) ... Sõnum: Tere!`
2. **VÄGA OLULINE:** Külastajale vastamiseks pead Telegramis **vastama (Reply) täpselt sellele boti sõnumile**. (Paremklikk sõnumil / hoia all -> "Reply" / "Vasta").
3. Kirjuta oma vastus ja saada see ära.
4. Süsteem saab su vastuse kätte, leiab õige kasutaja sessiooni ja kuvab vastuse automaatselt veebilehel külastaja vestlusaknas.

## Sanity seadistus

**Selles projektis EI OLE Telegrami boti ega Live Chati tehnilised seaded Sanity CMS-is.**
- Boti käitumine, sihtkoha grupid ja vastuste loogika juhindub puhtalt keskkonnamuutujatest (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) ja koodist.
- Live Chati komponendi (`FloatingContactAndres.tsx`) seaded on sisse ehitatud koodi, seega CMS-i kaudu ei saa boti sisse/välja lülitada või selle tekste muuta. Kõik tekstid ja seaded muudetakse otse lähtekoodis.

## Tehnilised detailid (arendajale)

- **Bot Tokeni ja Chat ID asukoht:** Kasutusel on env muutujad `TELEGRAM_BOT_TOKEN` ja `TELEGRAM_CHAT_ID`.
- **Funktsioonid:** Sõnumite saatmiseks kasutatakse peamiselt `sendTelegramText` ja `sendTelegramMessageDetailed` funktsioone (asuvad failis `src/lib/telegram/server.ts`).
- **Webhook URL:** Et Live Chati vastused Telegramist veebilehele jõuaksid, peab Telegrami API-le olema seadistatud webhook. Endpoint, mis seda haldab, on:
  `https://[sinu-domeen.ee]/api/webhook/telegram`
- **Kuidas testida lokaalselt:** 
  1. Lokaalseks testimiseks kasuta näiteks Ngroki (`ngrok http 3000`), et saada avalik URL.
  2. Registreeri webhook Telegrami API kaudu: 
     `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<ngrok-url>/api/webhook/telegram`
  3. Kirjuta lokaalsel veebilehel chati sõnum -> see jõuab Telegrami -> vasta Telegramis kasutades "Reply" -> sõnum ilmub lokaalsel lehel läbi SSE (`/api/chat/stream`).

## Levinud probleemid

**Bot ei saada teateid veebilehelt Telegrami**
- **Mida kontrollida:** 
  - Kas `TELEGRAM_BOT_TOKEN` ja `TELEGRAM_CHAT_ID` on Vercelis / `.env` failis õigesti seadistatud?
  - Kas bot on lisatud Telegrami gruppi ja tal on õigus sõnumeid kirjutada?
  - Kas Verceli logides on vigu seoses `api/course-registration` või muude endpointidega? (Otsi märksõna `Telegram failed`).

**Live chat ei tööta (vastused Telegramist ei jõua veebilehele)**
- **Mida kontrollida:**
  - Kas administraator kasutas Telegramis vastamiseks kindlasti **"Reply"** (Vasta) funktsiooni? Kui kirjutada lihtsalt gruppi uus sõnum, ei oska süsteem seda veebilehe külastajaga siduda.
  - Kas webhook on õigesti seadistatud? (Endpoint `/api/webhook/telegram` peab olema Telegrami poolt ligipääsetav).
  - Kas veebilehitsejas ei ole blokeeritud Server-Sent Events (SSE) ühendus (`/api/chat/stream`)? Võrguprobleemide korral võib ühendus katkeda.
