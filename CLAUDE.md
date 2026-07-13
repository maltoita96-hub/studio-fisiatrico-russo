# CLAUDE.md — Studio Fisiatrico Russo

> Sito premium per un cliente pagante. Queste regole valgono per OGNI sessione su questo
> repo, qualunque modello tu sia. Il playbook completo è nella skill `sito-premium`
> (invocala quando costruisci o ridisegni sezioni).

## Identità progetto (compilato al bootstrap, non toccare)

- **Cliente**: Studio Fisiatrico Russo — Dott. Antonino Russo
- **Settore**: studio medico privato di fisiatria e riabilitazione (+ percorso di esercizio terapeutico "Motion")
- **Località**: Misterbianco (Catania)
- **Obiettivo del sito**: prenotazioni (WhatsApp prima di tutto, poi telefono e MioDottore)
- **Direzione di design**: Fiducia Corporate con innesto editoriale (Studio, carta+petrolio+teal) · Bold Impatto disciplinato (pagina Motion, notte+acqua, voce Archivo)
- **Persona del copy**: tu
- **Stack**: Astro + Tailwind 4 (token in `src/styles/theme.css`), deploy Vercel

## Vincoli specifici di QUESTO cliente (non negoziabili)

1. **Font approvati a luglio 2026, non sostituirli**: Literata (display), Atkinson
   Hyperlegible Next (body — scelto perché progettato per leggibilità con vista ridotta,
   pubblico over-50), Archivo (SOLO voce Motion). Self-hostati via Fontsource: mai CDN Google.
2. **Pubblicità sanitaria (L. 145/2018 + Codice Deontologico)**: NIENTE testimonianze di
   pazienti riportate sul sito, niente foto prima/dopo, niente sconti o promozioni, niente
   promesse di risultato. La prova sociale è il dato aggregato verificabile (5,0 su 170+
   recensioni) con link alle piattaforme. Prima di aggiungere claim clinici, tono
   informativo e prudente.
3. **GDPR art. 9**: i form NON chiedono mai informazioni sulla salute (niente campo
   "descrivi il problema", niente chips per area del dolore). Solo nome, telefono,
   preferenza oraria. I dati non toccano mai un server: composizione messaggio WhatsApp.
4. **Niente cookie, niente banner**: il sito non usa cookie/tracciamento; la mappa NON è
   un iframe (link esterno a Google Maps). Non reintrodurre né l'uno né l'altro.
5. **Overdrive approvati**: "filo del percorso" (SVG scroll-driven, home ≥1240px,
   deterministico: output = f(scroll)) e transizione MOTION a doppio wipe tra le pagine.
   Non rimuoverli, non trasformarli in animazioni time-based.
6. **Recapiti reali**: tel/WA +39 342 190 4804 · antoninorusso994@gmail.com ·
   IG @toni__russo · MioDottore /antonino-russo-4/fisiatra/catania · P.IVA 06111760879.
   Non inventare mai orari, prezzi o indirizzo (civico ancora mancante: TODO cliente).

## Regole non negoziabili (playbook)

1. **Token first**: colori, font e radius vivono SOLO in `src/styles/theme.css`.
2. **Una direzione, un accento**: famiglia teal (accent su carta, aqua su notte).
   Il verde WhatsApp è colore di canale, solo sui bottoni WhatsApp.
3. **Copy in italiano, specifico**: mai lorem ipsum, mai superlativi vuoti.
4. **Mai emoji come icone**: solo `src/components/Icon.astro` (Lucide + logo WA).
5. **Un componente per sezione** in `src/components/sections/`.
6. **JS minimo**: `src/scripts/main.js` (nav, menu, reveal, form→WA) + script scoped
   di Thread e Wipe. Niente librerie di animazione.
7. **Asset mancanti**: foto Salpietro e foto sala → placeholder SVG coerenti con
   `<!-- TODO: foto reale -->`. Mai rettangoli grigi, mai volti AI spacciati per veri.

## Autonomia

- Non fare domande se un default ragionevole esiste: decidi, costruisci, dichiara nel report.
- Ogni modifica visiva va VISTA (dev server via `.claude/launch.json`, viewport 375/768/1440;
  screenshot in timeout → snapshot/inspect, non insistere).
- Prima di dire "finito": `npm run build` pulita + zero errori console + niente scroll orizzontale.
- Commit, push e deploy SOLO su richiesta esplicita (`/ship`).

## Comandi

```bash
npm run dev        # dev server su http://localhost:4321
npm run build      # build di produzione — deve passare prima di ogni consegna
npm run preview    # anteprima della build
```

## TODO cliente (aggiornare man mano)

- [ ] Indirizzo civico dello studio (pagina Dove siamo, schema.org, Google Business Profile)
- [ ] Orari di apertura / fasce di ricevimento
- [ ] Foto reale del Dott. Salpietro e 2-3 foto della sala Motion
- [ ] Numero di iscrizione OMCeO Catania (footer) e verifica con l'Ordine dei vincoli
      di pubblicità sanitaria (parere preventivo via PEC consigliato)
- [ ] Prezzo indicativo della prima visita (differenziatore: trasparenza tariffaria)
- [ ] Dominio custom (aggiornare `site` in astro.config.mjs, canonical e robots.txt)
