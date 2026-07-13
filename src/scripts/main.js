/* Comportamenti condivisi: nav, menu mobile, reveal, linea del metodo,
   sticky bar, form → WhatsApp. Nessuna dipendenza. */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// — stato nav allo scroll —
const nav = document.querySelector('[data-nav]');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// — menu mobile —
const burger = document.getElementById('burger');
const panel = document.getElementById('mobileMenu');
if (burger && panel) {
  const open = () => {
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const first = panel.querySelector('a');
    if (first) first.focus();
  };
  const close = (refocus = true) => {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (refocus) burger.focus({ preventScroll: true });
  };
  burger.addEventListener('click', () => (burger.classList.contains('open') ? close() : open()));
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => close(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burger.classList.contains('open')) close();
  });
}

// — reveal on scroll (additivo: senza JS tutto è visibile) —
const revealEls = [...document.querySelectorAll('[data-reveal]')];
if (revealEls.length) {
  document.querySelectorAll('[data-stagger]').forEach((grp) => {
    const step = parseInt(grp.getAttribute('data-stagger'), 10) || 100;
    [...grp.querySelectorAll('[data-reveal]')].forEach((el, i) => {
      if (!el.hasAttribute('data-delay')) el.style.setProperty('--rd', i * step + 'ms');
    });
  });
  revealEls.forEach((el) => {
    const d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--rd', d + 'ms');
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove('r-pre');
          e.target.classList.add('r-in');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => {
    if (!reduce && el.getBoundingClientRect().top > innerHeight * 0.9) {
      el.classList.add('r-pre');
      io.observe(el);
    } else {
      el.classList.add('r-in');
    }
  });
}

// — linea del metodo: si disegna quando la sezione entra —
document.querySelectorAll('[data-steps]').forEach((s) => {
  if (reduce) return s.classList.add('drawn');
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('drawn');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.3 }
  );
  io.observe(s);
});

// — sticky bar mobile: appare superato l'hero —
const sticky = document.getElementById('stickybar');
const hero = document.getElementById('top');
if (sticky && hero) {
  new IntersectionObserver((es) => sticky.classList.toggle('show', !es[0].isIntersecting), {
    rootMargin: '-40% 0px 0px 0px',
  }).observe(hero);
}

// — form → messaggio WhatsApp (nessun dato salvato: il messaggio parte dall'app dell'utente) —
const WA = '393421904804';
const STUDIO_TEL = '342 190 4804';
document.querySelectorAll('form[data-wa-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.querySelector('[name="nome"]');
    const tel = form.querySelector('[name="tel"]');
    const orario = form.querySelector('[name="orario"]');
    const consenso = form.querySelector('[name="consenso"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    let err = form.querySelector('.form-err');
    if (!err) {
      err = document.createElement('p');
      err.className = 'form-err';
      err.setAttribute('role', 'alert');
      form.insertBefore(err, submitBtn);
    }
    let ok = form.querySelector('.form-success');
    if (!ok) {
      ok = document.createElement('p');
      ok.className = 'form-success';
      ok.setAttribute('role', 'status');
      submitBtn.insertAdjacentElement('afterend', ok);
    }
    err.classList.remove('show');
    ok.classList.remove('show');
    [nome, tel].forEach((el) => el && el.removeAttribute('aria-invalid'));
    const fail = (msg, el) => {
      err.textContent = msg;
      err.classList.add('show');
      if (el) {
        el.setAttribute('aria-invalid', 'true');
        el.focus();
      }
    };
    if (!nome.value.trim()) return fail('Inserisci il tuo nome per continuare.', nome);
    if (!tel.value.trim()) return fail('Inserisci il tuo numero di telefono.', tel);
    if (!/\d{6,}/.test(tel.value.replace(/\s/g, '')))
      return fail('Controlla il numero di telefono: sembra incompleto.', tel);
    if (consenso && !consenso.checked)
      return fail('Per inviare la richiesta serve il consenso al trattamento dei dati.', consenso);
    const ctx = form.dataset.waForm === 'motion' ? 'una valutazione Motion' : 'una visita fisiatrica';
    const msg =
      `Nuova richiesta dal sito, Studio Fisiatrico Russo\n\n` +
      `• Nome: ${nome.value.trim()}\n` +
      `• Telefono: ${tel.value.trim()}\n` +
      `• Richiesta: ${ctx}` +
      (orario && orario.value ? `\n• Quando richiamare: ${orario.value}` : '');
    const popup = window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    ok.textContent = popup
      ? 'Fatto: abbiamo aperto WhatsApp con il messaggio pronto. Se non vedi la scheda, controlla il blocco popup del browser.'
      : `Il browser ha bloccato l'apertura automatica. Scrivici direttamente al ${STUDIO_TEL} su WhatsApp, oppure chiamaci.`;
    ok.classList.add('show');
  });
});
