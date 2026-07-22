/** Vaikimisi privaatsuspoliitika (kui Sanity dokument puudub või väli „Lehe sisu“ on tühi). */
export default function PrivacyPolicyStaticArticle() {
  return (
    <>
      <section className="space-y-4" aria-labelledby="sec-intro">
        <h2
          id="sec-intro"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          1. Ülevaade
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Käesolev privaatsuspoliitika kirjeldab, kuidas Andres Kase (edaspidi &quot;meie&quot;, &quot;ettevõte&quot;)
          töötleb isikuandmeid, kui külastate meie veebilehte, kasutate meie teenuseid või võtate meiega ühendust.
          Me austame teie privaatsust ja töötleme isikuandmeid kooskõlas Euroopa Liidu üldise andmekaitsemäärusega
          (GDPR) ja Eesti isikuandmete kaitse seadusega.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-controller">
        <h2
          id="sec-controller"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          2. Andmetöötleja
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Vastutav andmetöötleja isikuandmete suhtes, mida töödeldakse käesoleva poliitika kohaselt:
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Andres Kase</span>
          </li>
          <li>E-post: andreskase@tootmisjuhtimine.ee</li>
          <li>Telefon: +372 51 38 403</li>
          <li>Asukoht: Eesti</li>
        </ul>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Kui teie ettevõtte või isikuandmete puhul kehtib teine juriidiline isik (nt koolitus läbi partneri),
          täpsustatakse vastutavat töötlejat lepingus või eraldi teates.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-data">
        <h2 id="sec-data" className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl">
          3. Milliseid andmeid me võime koguda?
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Sõltuvalt teie tegevusest saidil võime töödelda järgmisi andmekategooriaid:
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Identifitseerimis- ja kontaktandmed:</span>{' '}
            nimi, e-posti aadress, telefoninumber, ettevõtte nimi — näiteks päringu vormist, e-kirjast või
            registreerimisest koolitusele.
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Suhtluse sisu:</span> teie sõnumi tekst,
            manused ja muu teave, mida te meile edastate.
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Tehnilised ja kasutusandmed:</span>{' '}
            IP-aadress, brauseri tüüp, seadme tüüp, ligikaudne asukoht (riik/linn), külastatud lehed, viitav URL,
            ajatempel — tüüpiliselt logifailide või analüütika kaudu, kui see on lubatud ja seadistatud.
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Küpsised ja kohalik salvestus:</span>{' '}
            nt nõusoleku mälu (localStorage) küpsiste teavituse jaoks, sessiooniküpsised saidi toimimiseks.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Me ei kogu teadlikult eriliiki isikuandmeid (nt terviseandmeid), kui see ei tulene otseselt teie
          vabatahtlikust päringust või lepingust ja ei ole selleks eraldi õiguslikku alust.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-purposes">
        <h2
          id="sec-purposes"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          4. Töötluse eesmärgid ja õiguslikud alused
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Töötleme isikuandmeid üksnes konkreetsetel eesmärkidel ja vastavalt GDPR-i artiklile 6 järgmistel alustel:
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Lepingu täitmine või eettevalmistus</span>{' '}
            (GDPR art 6 lg 1 p b): koolituse, konsultatsiooni või muu teenuse pakkumine, broneeringud, arveldus.
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Õigustatud huvi</span> (GDPR art 6 lg 1 p
            f): veebilehe turvalisus, pettuste vältimine, statistika (kui kasutatakse ja on huvi tasakaalustatud),
            teenuse täiustamine — välja arvatud juhul, kui teie huvid või põhiõigused kaaluvad üle.
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Nõusolek</span> (GDPR art 6 lg 1 p a):
            näiteks mitte-hädavajalikud küpsised, turundussõnumid või uudiskiri, kui olete eraldi nõustunud. Nõusoleku
            võite igal ajal tagasi võtta ilma, et see mõjutaks tagasivõtmisele eelneva töötluse seaduslikkust.
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Juriidiline kohustus</span> (GDPR art 6 lg
            1 p c): näiteks raamatupidamise või maksunõuete täitmine.
          </li>
        </ul>
      </section>

      <section className="space-y-4" aria-labelledby="sec-cookies">
        <h2
          id="sec-cookies"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          5. Küpsised ja sarnased tehnoloogiad
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Meie veebileht võib kasutada küpsiseid ja brauseri salvestusruumi (sh localStorage), et tagada saidi
          toimimine, meelde jätta teie eelistusi või — teie nõusolekul — analüüsida liiklust ja parandada
          kasutajakogemust.
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Hädavajalikud küpsised / salvestus:</span>{' '}
            vajalikud saidi põhifunktsioonideks (nt sessioon, turvalisus).
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Eelistuste küpsised:</span> nt küpsiste
            nõusoleku valik (salvestatud kuni te muudate või kustutate need brauserist).
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Analüütika- või turundusküpsised:</span>{' '}
            kasutatakse ainult pärast teie nõusolekut, kui selline funktsioon on sisse lülitatud.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Brauseri seadistustes saate küpsiseid hallata või kustutada. Märkus: mõned funktsioonid ei pruugi ilma
          vajalike küpsisteta korralikult töötada.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-recipients">
        <h2
          id="sec-recipients"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          6. Kellele andmeid edastatakse?
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Isikuandmeid ei müüda. Andmeid võidakse jagada usaldusväärsete töötlejatega, kes aitavad teenust pakkuda,
          näiteks:
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Hosting ja infrastruktuur</span> —
            veebilehe majutus (nt pilveteenuse pakkuja).
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Sisuhaldus (CMS)</span> — näiteks Sanity
            või muu platvorm, kust laetakse avalikku sisu (blogi, lehekülgede tekstid).
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">E-posti või kliendisuhte tarkvara</span> —
            kui kasutate meiega suhtlemiseks kolmanda osapoole teenust.
          </li>
          <li>
            <span className="font-semibold text-[rgb(var(--text-primary))]">Õigusnõuded:</span> ametiasutused, kui
            seadus seda nõuab.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Töötlejatega sõlmitakse vajadusel lepingud (sh standardtingimused või lepingu lisa isikuandmete kaitseks),
          mis sätestavad töötluse ulatuse ja turvanõuded.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-transfer">
        <h2
          id="sec-transfer"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          7. Edastamine väljapoole Euroopa Majanduspiirkonda
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Kui teenusepakkuja asub riigis, kus EL-i andmekaitsetaset ei peeta piisavaks, tagame edastamise seaduslikkuse
          näiteks Euroopa Komisjoni heakskiidetud otsuste, standardlepinguklauslite või muude GDPR-is sätestatud
          kaitsemeetmete abil.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-retention">
        <h2
          id="sec-retention"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          8. Säilitamistähtajad
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Isikuandmeid säilitatakse ainult nii kaua, kui see on vajalik eesmärgi täitmiseks või seadusest tulenevate
          nõuete täitmiseks — näiteks:
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          <li>päringud ja kirjavahetus: tavaliselt kuni 24 kuud, kui pikemat säilitamist ei nõua leping või seadus;</li>
          <li>raamatupidamis- ja lepingudokumendid: vastavalt raamatupidamise seadusele;</li>
          <li>logid ja turvalisus: lühemad perioodid, mis on tehniliselt mõistlikud.</li>
        </ul>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Kui säilitamine ei ole enam vajalik, kustutatakse või pseudonüümiseeritakse andmed, kui pseudonüümiseerimine
          on võimalik.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-rights">
        <h2 id="sec-rights" className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl">
          9. Teie õigused
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          GDPR-i alusel on teil järgmised õigused (võimalike piirangutega, kui seadus seda ette näeb):
        </p>
        <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          <li>õigus tutvuda oma isikuandmetega;</li>
          <li>õigus nõuda ebatäpsete andmete parandamist;</li>
          <li>õigus nõuda kustutamist (&quot;õigus olla unustatud&quot;) teatud tingimustel;</li>
          <li>õigus piirata töötlust teatud tingimustel;</li>
          <li>õigus vaidlustada õigustatud huvil põhinev töötlamine;</li>
          <li>
            õigus andmete ülekantavusse struktureeritud, masinloetavas vormingus, kui töötlus põhineb nõusolekul või
            lepingul ja on automatiseeritud;
          </li>
          <li>õigus esitada kaebus Andmekaitse Inspektsioonile (www.aki.ee).</li>
        </ul>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Nõusolekul põhineva töötluse puhul on teil õigus nõusolek igal ajal tagasi võtta. Taotluste esitamiseks
          kirjutage palun aadressile andreskase@tootmisjuhtimine.ee. Vastame mõistliku aja jooksul ja hiljemalt 30 päeva jooksul,
          kui seadus ei nõua lühemaid tähtaegu.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-security">
        <h2
          id="sec-security"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          10. Turvalisus
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Rakendame asjakohaseid tehnilisi ja organisatsioonilisi meetmeid (sh juurdepääsu piiramine, krüpteeritud
          ühendus HTTPS-i kaudu, turvaline majutus), et kaitsta isikuandmeid juhusliku või ebaseadusliku hävimise,
          kaotsimineku, muutmise või volitamata juurdepääsu eest. Absoluutset turvalisust ei saa internetis tagada;
          palun kasutage tugevaid paroole ja hoidke oma seadmeid turvalisena.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-children">
        <h2
          id="sec-children"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          11. Lapsed
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Meie teenused ei ole suunatud alla 16-aastastele (või kohaliku seaduse järgi madalamale vanusele). Kui
          usute, et oleme kogunud andmeid alaealiselt ilma vanema või eeskostja nõusolekuta, palun võtke meiega ühendust
          — võtame meetmeid andmete kustutamiseks.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-changes">
        <h2
          id="sec-changes"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          12. Poliitika muudatused
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Võime seda privaatsuspoliitikat aeg-ajalt uuendada (nt teenuse või seaduse muutumisel). Uuendatud versioon
          avaldatakse sellel lehel koos kuupäevaga. Oluliste muudatuste korral võime teavitada ka e-posti teel või saidi
          teavitusega, kui see on praktiline.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="sec-contact">
        <h2
          id="sec-contact"
          className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
        >
          13. Kontakt
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Kõikide isikuandmete ja privaatsusega seotud küsimuste korral võtke ühendust:{' '}
          <a
            href="mailto:andreskase@tootmisjuhtimine.ee"
            className="font-semibold text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            andreskase@tootmisjuhtimine.ee
          </a>
          . Kaebuste korral võite pöörduda ka Andmekaitse Inspektsiooni poole (
          <a
            href="https://www.aki.ee"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            www.aki.ee
          </a>
          ).
        </p>
      </section>
    </>
  )
}
