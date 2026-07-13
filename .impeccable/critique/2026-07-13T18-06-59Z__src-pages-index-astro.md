---
target: sito completo (Home + Motion)
total_score: 30
p0_count: 0
p1_count: 2
timestamp: 2026-07-13T18-06-59Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Nessuna conferma visibile dopo l'invio del form WhatsApp |
| 2 | Match System / Real World | 3 | Terminologia clinica pura in Trattamenti/Servizi, nessun ponte al linguaggio del paziente |
| 3 | User Control and Freedom | 3 | Wipe transition copre lo schermo ~1s senza via di fuga in UI |
| 4 | Consistency and Standards | 4 | Solida: token unici, sistema bottoni coerente |
| 5 | Error Prevention | 2 | Nessuna validazione formato telefono |
| 6 | Recognition Rather Than Recall | 4 | Solida |
| 7 | Flexibility and Efficiency | 3 | Tre canali contatto sempre disponibili |
| 8 | Aesthetic and Minimalist Design | 3 | Ripetizione eyebrow su 12/16 sezioni Home, 7/9 Motion (confermato da detector) |
| 9 | Error Recovery | 2 | Copertura errori bassa (solo nome/consenso) |
| 10 | Help and Documentation | 4 | FAQ copre le obiezioni reali pre-prenotazione |
| **Total** | | **30/40** | **Buono — solida base, aree deboli da sistemare** |

## Anti-Patterns Verdict

Non scatta l'allarme "fatto da un'AI" a colpo d'occhio: fotografia reale, font motivati (Atkinson Hyperlegible Next per accessibilità, non riflesso), niente gradient text/glassmorphism/side-stripe/modal. Due cadute concrete: em dash in copy visibile su 8 file (viola un absolute ban esplicito), pattern eyebrow ripetuto oltre soglia su 12-16 sezioni.

Scan deterministico su `src/`: 0 finding in modalità statica (`.astro` gira solo in regex, non analisi DOM completa). L'overlay browser live ha invece trovato 18 elementi/31 finding su Home, 35 elementi/43 su Motion: `ai-color-palette` (34 totali, in gran parte sull'aqua di Motion — corrisponde al riflesso "sanità→teal" già sollevato dalla review qualitativa, non un bug indipendente), `repeated-section-kickers` (19 totali, conferma indipendente della ripetizione eyebrow), `skipped-heading` (h2→h4 su entrambe le pagine, manca h3), `all-caps-body` (6), `hero-eyebrow-chip` (2), `line-length` (1, solo desktop), `nested-cards` (3, verificato: probabile falso positivo — il `border-y` decorativo della sezione Metodo viene letto come contenitore-card attorno alle vere card `article`).

## Overall Impression

Fondamenta solide con esecuzione reale (font motivati, stati interattivi funzionanti, gestione onesta degli asset mancanti) ma rifinitura incompleta: una regola di copy violata alla lettera, un bug CSS che spegne l'unico momento di rischio tipografico dell'hero, e una tensione di fondo mai risolta tra il registro "brand" (che vuole più carattere) e la prudenza normativa richiesta al lato Studio.

## What's Working

1. Font come oggetto fisico, non riflesso: Atkinson Hyperlegible Next per motivi reali di leggibilità.
2. Asset mancanti gestiti onestamente (icona lineare + "Foto in arrivo", mai un volto finto).
3. Stati interattivi verificati dal vivo: focus ring 3px, focus trap nel menu mobile, touch target generosi, reveal degradante senza JS.

## Priority Issues

**[P1] Nessuna conferma visibile dopo l'invio del form verso WhatsApp** — Cosa: `main.js` apre `wa.me` in nuova scheda, la pagina originale non cambia mai. Perché conta: unica azione di conversione del sito; pubblico over-45 non necessariamente abituato a WhatsApp Web su desktop. Fix: stato di conferma inline nel form dopo l'invio. Comando: `/impeccable clarify`.

**[P1] "Cosa trattiamo"/"Servizi" solo in linguaggio clinico** — Cosa: termini come "gonartrosi", "coxartrosi" senza mai una riformulazione comune. Perché conta: chi non riconosce il termine abbandona silenziosamente. Fix: affiancare 2-3 parole comuni al termine clinico. Comando: `/impeccable clarify`.

**[P2] Eyebrow/kicker ripetuta oltre soglia (12/16 sezioni Home, 7/9 Motion)** — confermato indipendentemente da review qualitativa E detector. Fix: variare il device di apertura sezione in almeno 3-4 punti. Comando: `/impeccable layout`.

**[P2] Em dash in copy visibile su 8 file** — viola un absolute ban esplicito della skill. File: Hero, Services, MotionTeaser, Reviews, Faq, MCoach, Footer, privacy. Fix: sostituire con virgola/due punti/punto. Comando: `/impeccable polish`.

**[P2] Heading hierarchy skip (h2→h4, manca h3) su Home e Motion** — trovato dal detector, non dalla review qualitativa. Impatta screen reader su navigazione per intestazioni. Fix: introdurre h3 o alzare i titoli colonna footer. Comando: `/impeccable audit`.

## Persona Red Flags

**Jordan (first-timer)**: "Gonartrosi, tendinopatia rotulea..." senza riformulazione — non si riconosce senza già conoscere la diagnosi. Dopo l'invio WhatsApp senza popup riuscito, nessun segnale che qualcosa non ha funzionato.

**Riley (stress tester)**: telefono "asdf" passa la validazione senza errore. Doppio click rapido su due link `data-wipe` diversi avvia due transizioni parallele senza guard.

**Casey (mobile)**: burger 44×44px esatto (minimo WCAG, non oltre) per un tap distratto. Positivo: solo 2 campi testo + 1 select nel form.

**Carmela, 58 anni, lombalgia cronica (persona di progetto)**: da desktop, "Invia con WhatsApp" tenta WhatsApp Web mai configurato — vicolo cieco specifico per lei, mitigato solo da un bottone "Chiama" visivamente secondario.

## Minor Observations

- Bug verificato: `Hero.astro:11` ha `not-italic` e `italic` sullo stesso elemento — il corsivo previsto su "senza paura." non viene mai renderizzato (`font-style: normal` confermato via computed style).
- All-caps label fino a 51 caratteri + un paragrafo a ~85 char/riga (soglia raccomandata 65-75ch) — stona con un progetto esplicitamente costruito per un pubblico con vista ridotta.
- Nessuna validazione formato telefono.
- Nessuna pagina 404 personalizzata.
- Dato "5,0/170+ recensioni" ripetuto in due formati diversi nella stessa pagina.
- **Da verificare col cliente, non un problema di design**: la foto in `Doctor.astro` (sala-motion.jpg, alt "Il Dott. Russo guida una valutazione...") ritrae con certezza il Dott. Russo e non il Dott. Salpietro? Polo teal (diversa da quella bianca del ritratto ufficiale), scatto candido non posato — attribuzione visiva incerta, verificarla prima della pubblicazione.

## Questions to Consider

1. "Carta calda + teal + serif editoriale" è una fuga dal riflesso "sanità = bianco + teal", o lo stesso riflesso vestito meglio?
2. Il registro Motion (notte + aqua + Archivo Black) è distintivo per QUESTO studio di riabilitazione, o intercambiabile con qualunque brand fitness 2026?
3. Cosa succederebbe se il momento di massimo rischio percepito (il click "Invia") ricevesse la stessa cura riservata al momento di massima fiducia (l'apertura di pagina)?
