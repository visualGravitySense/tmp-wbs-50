import { BrandVibrantButton } from '@/components/ui'

/** Vaikimisi täienduskoolituse standard (kui Sanity dokument puudub või väli „Lehe sisu“ on tühi). */
export default function EduStandardsStaticArticle() {
  return (
    <>
      <section id="standard" className="scroll-mt-32 space-y-12">
      {/* Section 1: Info osalejatele ja tööandjatele */}
      <section className="space-y-4">
        <h2 className="text-xl font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-2xl border-b border-slate-100 pb-2 dark:border-slate-800">
          Info osalejatele ja tööandjatele
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Lean tootmisjuhtimise koolitus: praktilised õppematerjalid, tehasekülastused ja seminarid Viljandis – koolitaja Andres Kase
        </p>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Tööandja saab töötajate koolitamiseks valida{' '}
          <a
            href="https://www.riigiteataja.ee/akt/110062015010?leiaKehtiv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            täiskasvanute koolituse seadusele
          </a>{' '}
          vastava täienduskoolituse või kui koolitusturul sobivat koolitust ei pakuta, tellida sobiva õppekavaga koolituse. Koolituse õppekava peab vastama{' '}
          <a
            href="https://www.riigiteataja.ee/akt/126062015009?leiaKehtiv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            täienduskoolituse standardile
          </a>{' '}
          ning koolituse lõpus peavad osalejad saama tunnistuse või tõendi koolituse läbimise kohta.
        </p>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Tööandjatel on võimalus taotleda toetust, mis on maksimaalselt kuni 80% koolituskuludest, kuid mitte üle 2500 euro töötaja kohta. Toetusmeede, mis võib sobida, on töötajate koolitamine muutuste olukorras.
        </p>

        <div className="rounded-xl border border-blue-200/50 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
          <p>
            • Töötajate koolitamise kohta muutunud olukorras uuri lisaks töötukassa{' '}
            <a
              href="https://www.tootukassa.ee/et/teenused/tooandjatele/koolitustoetus-tooandjatele-muutuste-olukorras"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              kodulehelt.
            </a>
          </p>
          <p>
            • Võid lähemalt küsida ka minu käest.
          </p>
          <p className="text-slate-400 text-xs pt-1">
            Allikas:{' '}
            <a
              href="https://www.tootukassa.ee/et/teenused/tooandjatele/koolitustoetus-tooandjatele"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              töötukassa.ee
            </a>
          </p>
        </div>
      </section>

      {/* Section 2: Õppekava */}
      <section className="space-y-6">
        <h2 className="text-xl font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-2xl border-b border-slate-100 pb-2 dark:border-slate-800">
          Opstar Profit Lean-Agile tootmisjuhtimise täiendkoolituse õppekava
        </h2>
        <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
          Lean-Agile Tootmisjuhtimise täiendkoolitus kombineerib teoreetilisi teadmisi, praktilisi oskusi strateegilise, taktikalise planeerimise (nõudlusest tulenevalt), kui ka operatiivtasandi igapäevatöö tõhusa teostamise asjus – Tagamaks pikaajaline järjepidevus ja tulemuslikkus. Seome eesmärgi, inimhinge, protsessid, logistika ja seadmed, kui ka digitaalse maailma.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-l-2 border-blue-500 pl-4">
          <div>
            <span className="text-xs font-black uppercase text-slate-400">Õppekava nimetus</span>
            <p className="text-sm font-bold text-[rgb(var(--text-primary))]">Lean-Agile Tootmisjuhtimine</p>
          </div>
          <div>
            <span className="text-xs font-black uppercase text-slate-400">Õppekavarühm</span>
            <p className="text-sm font-bold text-[rgb(var(--text-primary))]">Juhtimine ja haldus</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Õpiväljundid. Osaleja, kes koolituse läbib:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Mõistab ettevõtte ärilisi eesmärke ja motiive, strateegilise, taktikalise ja operatiivtasandi juhtimise eesmärke, seoseid ja olulisust</li>
            <li>Omandab individuaalseid-organisatoorseid oskuseid ja hoiakuid organiseerituse, süsteemsuse, efektiivsuse osas.</li>
            <li>Mõistab juhtimissüsteemi ja süsteemse juhtimise eesmärki, olemust, vajalikkust ning oma rolli tähenduslikkust</li>
            <li>Õpib tundma operatsioonide ja üldiseid juhtimise funktsioone ja nende omavahelist koostoimet</li>
            <li>Õpib tundma tarneahela-, protsesside juhtimise ja organisatsiooni struktuuri, rollide ülesannete ja vastutuse sidusust</li>
            <li>Mõistab ja väärtustab väärtusloome olulisust ettevõttele ja tunneb peamisi raiskamisi, oskab neid elimineerida</li>
            <li>Teab ja tunneb Lean ja agiilse juhtimise olemust ja tööriistu, oskab neid rakendada oma rolliga seonduvalt</li>
            <li>Teab ja tunneb tootmiskorralduse, tootmissüsteemi olemust, eesmärki ja funktsioone</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Tootmisjuhtimise täiendkoolituse õpingute alustamise tingimused:</h3>
          <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
            Lean-Agile Tootmisjuhtimise täiendkoolitus on suunatud erineva taseme spetsialistidele ja/või juhtidele või juhiks pürgivatele spetsialistidele. Koolitus sobib ettevõtte kesk- ja operatiivtasandi juhtidele ja mikro-, väikeste- ja keskmise suurusega ettevõtete meistritele, tootmisjuhtidele, /-juhtidele, eestöölistele. Koolitus sobib ahela teistele võtmeisikutele nagu kvaliteedijuhid, ostujuhid, laojuhid, projektijuhid, protsessiinsenerid, jne. Koolitus sobib organisatsiooni erinevatele ametitele ja rollidele, sest arendab operatsioonide juhtimise (tööde tõhus ja tulemuslik korraldamine) teadmisi ja kompetentse.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Tootmisjuhtimise täiendkoolitusel osalejale on oluline:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Omada teoreetilisi teadmisi ja/või töökogemust teenindus- või tootmisettevõttes (tootmises, laos, kontoris, mõnes teises osakonnas).</li>
            <li>Kasuks tuleb kokkupuude ja kogemus tootmisjuhtimisega, laojuhtimisega, kvaliteedijuhtimisega, müügijuhtimisega või mõne teise juhtimisfunktsiooniga.</li>
            <li>Kasuks tuleb arusaam ettevõtte töökorraldusest ja juhtimisest üldiselt.</li>
            <li>Koolituse õppekeskkond asub internetis, sellest tulenevalt on osalejale vajalik e-maili ja interneti olemasolu, et esitada iseseisvaid töid ja võimaldada vajadusel individuaalse parendusprojekti juhendamine koolitaja poolt.</li>
            <li>Koolitus viiakse läbi eesti keeles, seega on oluline, et osaleja saab aru ja oskab ennast eesti keeles piisavalt selgelt väljendada.</li>
            <li>Koolitusel osalemise tingimuseks on ka registreerumine koolitusele ja õppemaksu tasumine enne koolituse algust.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">
            Tootmisjuhtimise täiendkoolituse kontakttundide maht on 64 akadeemilist tundi, millest teoreetiline 48 ja praktiline 16 tundi(ettevõtete külastused) + iseseisvad tööd ja individuaalne parendusprojekt. Hinnanguline maht 32 akadeemilist tundi. Koolituse kogumaht koos iseseisva tööga on orienteeruvalt 96 akadeemilist tundi. Koolitus sisaldab järgmisi teemasid:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-[rgb(var(--text-secondary))] pl-2 pt-2">
            <div>1. „OPSTAR PROFIT“ lähenemine. Süsteemne Juhtimine = Juhtimissüsteem.</div>
            <div>2. Miks LEAN ja AGILE? Millest tegelikult räägime – Eesti keeles.</div>
            <div>3. Tootmiskorraldus strateegilisel, taktikalisel, operatiivsel tasandil.</div>
            <div>4. Tootmissüsteemide ülevaade. LEAN tootmissüsteem, Toyota tootmissüsteem(TPS), jt.</div>
            <div>5. Nõudluse- ja tarneahela juhtimine – sidusus organisatsiooni tootmissüsteemiga, struktuuriga.</div>
            <div>6. Parendusvaldkonna kaardistamine, individuaalse parendusprojekti eesmärgid, võtmemõõdikute valimine.</div>
            <div>7. HOSHIN planeerimine – Fookus eesmärgile ja fookus tegudel. Meede parendusprojekti jälgimiseks.</div>
            <div>8. Väärtusahela juhtimine ja kaardistamine – Value Stream Mapping.</div>
            <div>9. Nõudluspõhine tootmine ja varude väle juhtimine, varud tootmises.</div>
            <div>10. Parasiitlikud muidusööjad väärtusahelas. Eesti mõistes „kolm koera“ – Muri, Mura, Muda!</div>
            <div>11. 7+1 Raiskamist meie sees ja ümber – lihtsad lähtekohad muutuseks.</div>
            <div>12. 5S korra loomise ja tagamise süsteem – töökohal, juhtide peas, laual, mujal.</div>
            <div>13. VUMAT – Vaadake, Uurige, Modelleerige, Arutlege, Testige (LAMDA tsükkel)</div>
            <div>14. SMED(Single Minute Exchange of Dies) – Kiire tootevahetus “Ühenumbrilise” minuti jooksul.</div>
            <div>15. JIT, HEIJUNKA, KanBan – Tootmise Tasakaalustamine.</div>
            <div>16. Tootmise planeerimine, kavandamine, üldplaan ja kalenderplaan. Ressursside juhtimine.</div>
            <div>17. KAIZEN – jätkuv parendamine.</div>
            <div>18. TEEME TEHASE. Konkureerivate ettevõtete simulatsioon. Projekteerimisest teostuseni, avatud tööturg – MÄNG.</div>
            <div>19. SÜSTEEMNE JUHTIMINE = TOOTMISJUHTIMINE = INIMHINGE JUHTIMINE</div>
            <div>20. Tootmisjuhtimise tööriistad. Ohutu tootmisjuhtimine. Tootmise tüpiseerimine.</div>
            <div>21. Tootmisstaadiumid, tootmise asendiplaan, tootmisprotsessi kulgemisviisid.</div>
            <div>22. Tootmise – ja juhtimise funktsioonid, rollid, vastutused. Inimlikkus.</div>
            <div>23. Tootmisjuht juhtkonnas. Keskne roll ja vastutus tarneahelas, koostoime.</div>
            <div>24. „TAO seos“ – Tootmisprotsess = Transformatsiooni protsess – Asendiplaan – Organisatsioon</div>
            <div>25. „MOT + L planeerimine“ – Müügijuht, Ostujuht, Tootmisjuht + Logistik</div>
            <div>26. TPM (Total Productive Maintenance). Seadmete tõhus hooldus – Seadmete „5S“ ja OEE praktikas.</div>
            <div>27. Standardtöö ja normeerimine. Pooltoodang, tootmisvõimsus. Töö disain ja tulemuslikkus.</div>
            <div>28. Agiilne ehk kohanev juhtimine – see ongi ÕIGE tootmise juhtimine. Räägime sisust.</div>
            <div>29. Ettevõtte süsteemne ja terviklik suunamine tulemustasustamise abil. Seos võtmemõõdikutega.</div>
            <div>30. Digitaliseerimise võlud ja valud. “Gravitatsioon” ju ei muutu – ka tootmises on oma “füüsika” – digitaliseerimine on süsteemi keskselt toetav ja tõhustav funktsioon. Oska seda õigesti kasutada ja doseerida.</div>
            <div>31. Osalejate individuaalsete projektide esitlused/kaitsimine.</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Õppekeskkond:</h3>
          <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
            Õppekeskkond sisaldab teoreetiliste ja praktiliste oskuste omandamiseks vajalikku. Lean-Agile tootmisjuhtimise täiendkoolitus toimub avalikes eraldatud ja selleks spetsiaalselt loodud seminariruumides. Ruum on varustatud toolide, kirjutuslaudade, esitlemise ja selle jälgmiseks vajalikuga. Võimalik teha individuaalset, paaris või ka grupitöid. Laudade grupeerimise ja hajutatuse võimalused. Pausid toimuvad selleks eraldi loodud puhkenurgas ja pakutakse teed, kohvi, vett. Lõunapaus sisaldab võimalusi supile, praele ja magustoidule, vastavalt osaleja enda soovile. Lõuna tagab koolituse korraldaja. Koolitaja varustab osaleja paberi, kirjutusvahendite ja vajalike õppematerjalidega (trükitud ja digitaalselt).
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Õppematerjalid:</h3>
          <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
            Koolitusel antakse trükitud ja/või digitaalsed õppematerjalid. Õppematerjal sisaldab koolitaja koostatud ja värviliselt trükitud brošüür “Tulemuslik Tootmine – 5S süsteemi juurutamine” ja trükitud slaidimaterjale. Mõlemad on saadaval ka digitaalselt. Õppematerjalide hulgas on individuaalseks ja rühmatööks vajalikud juhised, materjalid. Lisaks pakub koolitaja mitmeid elektroonilisi koolituse teemadega seotud töölehti ja -vorme.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Lõpetamise tingimused ja väljastatavad dokumendid:</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Koolituse läbimise ja lõpetamise tingimusteks on õpiväljunditel baseeruva individuaalse parendusprojekti koostamine ja esitlemine ning koolituskulude tasumine.</li>
            <li>Koolituse läbimisel väljastatakse osalejale tunnistus.</li>
            <li>Osalejale, kes ei koosta ja ei esitle individuaalset parendusprojekti, väljastatakse soovi korral koolitusel läbituks loetud teemade kohta tõend.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Koolituse läbiviimiseks vajaliku kvalifikatsiooni, õpi- või töökogemuse kirjeldus:</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Tootmisjuhtimise täiendkoolituse koostaja ja koolitaja on Andres Kase, kes omab pikaajalist, ainulaadselt terviklikku teadmiste ja praktilise kogemuse pagasit tootmis- ja tööstusjuhtimise alal.</li>
            <li>Omades kogemust ja tundes põhjalikult organisatsiooni toimet, juhtimist, LEAN tootmist, kui ka “mitte LEAN” tootmist, teab, mis on tegelikult õige “ravim” ja kuidas organisatsiooni arendada.</li>
            <li>LEAN’ga kokkupuude alates 2003. aastast. Rakendanud aastakümnete jooksul mitmes suuremas tehases nii spetsialisti, kesk-, kui ka tippjuhina.</li>
            <li>Üle 25 aasta praktilist tootmis- ja tööstusjuhtimist, mille osaks on alati teenus ja teenindusjuhtimine, sest tööstust ilma ei turunda.</li>
            <li>15 aastat tootmis-, operatsioonide juhtimise ja tööstusnormeerimise loenguid Eesti Ettevõtluskõrgkoolis Mainor.</li>
            <li>Tootmisprotsesside välja töötamise ja arendamise, tootmistehnika aluste ja LEAN juhtimise loengud Tallinna Tehnikakõrgkoolis.</li>
            <li>Alates 2014 aastast operatsioonide juhtimise, süsteemse juhtimise koolitusi ja praktilist nõustamist tööstus- ja tootmisettevõtetele. Täiskasvanute koolitus.</li>
            <li>2022, 2023 ja 2024 (kokku kolm aastat) tootmisjuhtimise teabevara partner ja toimetaja Äripäevas.</li>
            <li>2026. Tallinna Tehnikaülikooli Virumaa kolledži külalislektor magistriõppes „Jätkusuutlik tööstus“ õppekaval, aine „Kvaliteedijuhtimine tööstuses“.</li>
            <li>Koolitaja ainulaadne ja praktiline kogemus seisneb teooria ja praktika tasakaalustatud sidususes. Lisaks koolitamisele on koolitaja põhitegevuseks ettevõtete juhtimise süstematiseerimine, tööstuse praktiline nõustamine, juhtimisteenuse osutamine.</li>
            <li>Koolitaja omab kogemust nii toiduaine-, elektroonika-, metalli-, puidutööstusest ja ka teistest valdkondadest, k.a teenindusest.</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            <a
              href="https://www.etis.ee/CV/Andres_Kase/est"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Koolitaja Andres Kase CV Eesti Teadusinfosüsteemis →
            </a>
            <a
              href="https://www.linkedin.com/in/andres-kase-a93352b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Koolitaja Andres Kase LinkedIn profiil →
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <BrandVibrantButton href="/koolitus">
            Tutvun koolitusega täpsemalt
          </BrandVibrantButton>
        </div>
      </section>
      </section>

      {/* Section 3: Õppekorraldus */}
      <section id="oppekorraldus" className="scroll-mt-32 space-y-6">
        <h2 className="text-xl font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-2xl border-b border-slate-100 pb-2 dark:border-slate-800">
          Koolituse õppekorralduse alused
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Täienduskoolitusele vastuvõtu ja koolituselt väljaarvamise tingimused ja kord</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Koolitusele saab registreeruda koolituse kodulehel sätestatud korra alusel kasutades mugavat registreerimisvormi.</li>
            <li>Registreeruda saab ka telefoni 5138403 ja e-kirja <a href="mailto:andreskase@tootmisjuhtimine.ee" className="text-blue-600 dark:text-blue-400 hover:underline">andreskase@tootmisjuhtimine.ee</a> teel.</li>
            <li>Peale vormikohast registreerumist saab osaleja koheselt kinnituse ja esmase teabe toimumisaegade kohta.</li>
            <li>Vajadusel täpsustab koolitaja osaleja tausta, sobivust ja valmidust e-kirja või telefoni teel.</li>
            <li>Koolituse toimumisajad on algselt määratud kalendris nädala täpsusega. Täpsed kuupäevad selguvad orienteeruvalt 2-4 nädalat enne koolituse algselt määratud algust.</li>
            <li>Registreerumisega kinnitab osaleja oma osalemissoovi ja tagab kohabroneeringu koolitusele</li>
            <li>Koolituskoha kinnitus tuleb koolitajalt 48 tunni jooksul peale registreerumist, lõplik kinnitus eeldab koolituse eest tasumist 7-14 päeva enne koolituse tegelikku algust.</li>
            <li>Grupp avatakse minimaalselt 5 osalejaga ja grupi optimaalseks suuruseks on 14 osalejat. Koolitajal on õigus gruppi suurendada kuni 18 osalejani ja lisada grupi suurusest tingitult üks lisapäev. Päeva lisandumisel osalustasu ei muutu.</li>
            <li>Koolitusest loobumise puhul ja mitte lõpetamise puhul osalejale tunnistust ei väljastata. Soovi korral väljastatakse läbitud teemade kohta loetelu ja tõend.</li>
            <li>Kui osaleja lõpetab koolituse distantsilt ja see vastab nõutud tingimustele, väljastab koolitaja osalejale tunnistuse.</li>
            <li>Koolituselt puudumine on vabatahtlik ja heas usus poolte kokkuleppel. Olenevalt osaleja senisest haridusest, töökogemusest ja võimekusest on tal võimalik koolitus lõpetada vaatamata koolituselt puudumisele. Lõpliku otsuse teeb koolitaja.</li>
            <li>Koolituse läbimise ja lõpetamise tingimusteks on õpiväljunditel baseeruva individuaalse parendusprojekti koostamine ja esitlemine ning koolituskulude tasumine.</li>
            <li>Koolituse läbimisel väljastatakse osalejale tunnistus.</li>
            <li>Osalejale, kes ei koosta ja ei esitle individuaalset parendusprojekti, väljastatakse soovi korral koolitusel läbituks loetud teemade kohta tõend.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Õppetasu maksmise, sellest vabastamise ja selle tagastamise tingimused ja kord</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Õppetasu tuleb tasuda esitatud arve alusel enne koolituse algust. Arve esitatakse registreerimisel avaldatud andmete alusel.</li>
            <li>Arve esitatakse peale registreerimist, aga mitte varem, kui 1 kuni 4 nädalat enne koolituse tegelikku algust. Arve tasumist oodatakse enne koolituse algust.</li>
            <li>Koolitusest loobumise soovi korral enne koolitust, tuleb sellest esimesel võimalusel koolitajat teavitada. Kui arve on tasutud, on võimalik taotleda raha täielikku või osalist tagastamist.</li>
            <li>Loobumise puhul otsime esimese võimalusena osalemist järgmisel sarnasel koolitusel.</li>
            <li>Loobumise puhul 4 nädalat enne koolitust ja arve tasumisel, summa tagastatakse.</li>
            <li>Loobumise puhul 2-4 nädalat enne koolitust tagastatakse summast 50%. Kui koht on võimalik täita ootel osalejaga, siis 100%.</li>
            <li>Loobumise puhul vähem, kui 2 nädala enne koolitust tagastatakse tasutud summast 20%. Kui koht on võimalik täita ootel osalejaga, siis 100%.</li>
            <li>Koolituse katkestamise korral püütakse leida võimalused asendusliikme osalemise osas või koolitusel jätkamist ja kohtade olemasolul tulevikus toimuval sarnasel koolitusel.</li>
            <li>Õppemaksus sisalduvad õppematerjalid, koolitusel korraldatavad väljasõidud, lõunad, pausidel pakutav kohv, tee või vesi. Õppemaksu suuruse määrab koolitaja. Koolitajal on õigus õppemaksu muuta. Õppemaksu, mis on osalejaga kokkulepitud, ei muudeta.</li>
            <li>Koolituse katkemisel koolitajast tulenevalt tagastatakse õppemaks või lepitakse kokku koolituse jätkumine muul ajal.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Teised õppe korraldamiseks olulised tingimused</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Koolitus toimub Viljandis, Grand Hotel ruumides.</li>
            <li>Koolitusruum ja õppekeskkond sisaldab teoreetiliste ja praktiliste oskuste omandamiseks vajalikku. Täiendkoolitus toimub avalikes eraldatud ja selleks spetsiaalselt loodud seminariruumides.</li>
            <li>Koolituse läbimise ja lõpetamise tingimusteks on õpiväljunditel baseeruva individuaalse parendusprojekti koostamine ja esitlemine koolituskulude tasumine.</li>
            <li>Koolituse läbimisel väljastatakse osalejale tunnistus.</li>
            <li>Osalejale, kes ei koosta ja ei esitle individuaalset parendusprojekti, väljastatakse soovi korral koolitusel läbituks loetud teemade kohta tõend.</li>
            <li>
              Koolituse üldine korraldus ja õppetöö täpsem sisu on eraldi{' '}
              <a href="/koolitus" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                koolituse lehel.
              </a>
            </li>
            <li>Koolitaja peab õppetöös osalemise arvestust.</li>
            <li>Tunnistus väljastatakse koolituse lõppedes viimasel kohtumise korral. Kui see pole mingil põhjusel võimalik, lepitakse tunnistuse üleandmine eraldi kokku.</li>
            <li>Koolitaja peab väljastatud tunnistuste ja tõendite arvestust digitaalselt.</li>
            <li>Õppetööga seotud arusaamatused lahendatakse omavahel vesteldes ja leitakse kokkulepe.</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <BrandVibrantButton href="/koolitus">
            Tutvun koolitusega täpsemalt
          </BrandVibrantButton>
        </div>
      </section>

      {/* Section 4: Kvaliteedi tagamine */}
      <section id="kvaliteet" className="scroll-mt-32 space-y-6">
        <h2 className="text-xl font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-2xl border-b border-slate-100 pb-2 dark:border-slate-800">
          Koolituse kvaliteedi tagamise alused
        </h2>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Õppekavade kvaliteedi tagamise tingimused ja kord</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Tootmisjuhtimise täiendkoolituse koostaja ja koolitaja omab pikaajalist tervikliku teadmiste ja praktilise kogemuse pagasit tootmis- ja tööstusjuhtimise alal.</li>
            <li>Täiendkoolituse koostaja omab pikaajalist täiskasvanute koolitamise kogemust ja tegeleb lisaks koolitamisele ka interimjuhtimise ja juhtimiskonsultatsiooniga, mille käigus toimub pidev turuvajadustega tutvumine ja kohanemine.</li>
            <li>Eelnevast tulenevalt usub koolitaja, et koolituse sisu vastab jooksva majanduse ja juhtimise vajadustele ning sisaldab parimaid, töötavaid praktikaid. Koolituse sisu panustab pidevale parendusele ja tootlikkusele, seega vastab pidevalt muutuva tööjõuturu vajadustele.</li>
            <li>Õppekava täiendatakse jooksvalt ehk pidevalt ajas. Õppekava jooksev sisu ja praktilised näited kohandatakse vastavalt osalevale grupile. Näited ja ülesanded teoreetilised, praktilised tööd on osalejatele jõukohased ja arendavad. Koolitaja tagab juhendamise ka väljaspool auditoorset kohtumist.</li>
            <li>Osalejalt küsitakse jooksvalt tagasisidet paberil ja/või elektrooniliselt. Koolitaja arvestab edasiviivate ettepanekutega ja viib sisse muudatused, teavitab ja põhjendab osalejatele.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Koolitajate kvaliteedi tagamise tingimused ja kord</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Tootmisjuhtimise täiendkoolituse koostaja ja koolitaja omab pikaajalist tervikliku teadmiste ja praktilise kogemuse pagasit tootmis- ja tööstusjuhtimise alal.</li>
            <li>Täiendkoolituse koostaja omab pikaajalist täiskasvanute koolitamise kogemust ja tegeleb lisaks koolitamisele ka interimjuhtimise ja juhtimiskonsultatsiooniga, mille käigus toimub pidev turuvajadustega tutvumine ja kohanemine.</li>
            <li>Teiste koolitajate rakendamisel ja kasutamisel tutvub koolitaja koolitajatega ja eelkõige nende praktilise kogemusega, referentsidega isiklikult. Hindab neid vastavalt oma kogemusele. Koolitaja jätkuva parenduse ja kvaliteedi tagamise eesmärgil kasutab koolitatavate tagasisidet, mida jagatakse ka koolitajaga.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Õppekeskkonna kvaliteedi tagamise tingimused ja kord</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Õppevahendeid/õpperuume/sisseseadet kontrollitakse ja uuendatakse vastavalt tehnoloogia arengule ja kontrollitakse regulaarselt.</li>
            <li>Õppetöös kasutatakse valdkonna varem testitud ja kaasaegset tehnoloogiat/seadmeid.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-[rgb(var(--text-primary))]">Täienduskoolituse kohta tagasiside kogumise kord</h3>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-[rgb(var(--text-secondary))] pl-2">
            <li>Koolitusel kogutakse pistelist ja kokkuvõtlikku tagasisidet paberil või veebis.</li>
            <li>Tagasisidet kasutatakse koolituse kaasajastamise, jätkuva parendamise ja kvaliteedi tagamise eesmärgil.</li>
          </ul>
        </div>
      </section>
    </>
  )
}
