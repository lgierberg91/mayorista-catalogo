// Pop-up de catálogos: al entrar al sitio, descargá Dama, Hombre o ambos a cambio del mail.
(() => {
  const SUBSCRIBED_KEY = 'mayorista-newsletter-subscribed';
  const DISMISSED_KEY = 'mayorista-newsletter-dismissed-at';
  const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
  const DELAY_MS = 2500;
  const CATALOGS = {
    dama: { label: 'Dama', file: 'catalogos/Mayorista-2027-Dama.pdf' },
    hombre: { label: 'Hombre', file: 'catalogos/Mayorista-2027-Hombre.pdf' }
  };

  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch {} };

  function shouldShow() {
    if (new URLSearchParams(location.search).has('newsletter')) return true;
    if (read(SUBSCRIBED_KEY)) return false;
    const dismissed = Number(read(DISMISSED_KEY));
    return !dismissed || Date.now() - dismissed > SNOOZE_MS;
  }

  function download({ file }) {
    const link = document.createElement('a');
    link.href = file;
    link.download = file.split('/').pop();
    document.body.append(link);
    link.click();
    link.remove();
  }

  async function save(email, catalog) {
    const endpoint = window.CATALOG_CONFIG?.newsletterEndpoint;
    if (!endpoint) return;
    // text/plain evita el preflight CORS, que Google Apps Script no soporta.
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ email, catalog, source: 'popup', page: location.pathname })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json().catch(() => ({}));
    if (result.ok === false) throw new Error(result.error || 'Error al guardar');
  }

  function open() {
    if (document.getElementById('newsletter-overlay') || document.getElementById('welcome-overlay')) return;
    if (document.body.classList.contains('add-dialog-open')) { setTimeout(open, 4000); return; }
    const overlay = document.createElement('div');
    overlay.id = 'newsletter-overlay';
    overlay.className = 'newsletter-overlay';
    overlay.innerHTML = `
      <section class="newsletter-dialog" role="dialog" aria-modal="true" aria-labelledby="newsletter-title">
        <button type="button" class="newsletter-close" aria-label="Cerrar">×</button>
        <img class="newsletter-image" src="images/banner-invierno-2027.jpg" alt="" />
        <div class="newsletter-copy">
          <p class="newsletter-kicker">Invierno 2027</p>
          <h2 id="newsletter-title">Descargá el catálogo</h2>
          <p class="newsletter-text">Dejanos tu mail y llevate la lista de precios. También te mandamos actualizaciones y promos.</p>
          <form class="newsletter-form" novalidate>
            <fieldset class="newsletter-choice">
              <legend class="sr-only">¿Qué catálogo querés?</legend>
              <label><input type="radio" name="catalog" value="dama" /><span>Dama</span></label>
              <label><input type="radio" name="catalog" value="hombre" /><span>Hombre</span></label>
              <label><input type="radio" name="catalog" value="ambos" checked /><span>Ambos</span></label>
            </fieldset>
            <label class="sr-only" for="newsletter-email">Tu email</label>
            <input id="newsletter-email" type="email" name="email" placeholder="tu@email.com" autocomplete="email" inputmode="email" required />
            <button type="submit">Descargar</button>
          </form>
          <p class="newsletter-error" role="alert" hidden></p>
          <button type="button" class="newsletter-skip">Ahora no</button>
        </div>
        <div class="newsletter-done" hidden>
          <h2>¡Listo!</h2>
          <p>Tu descarga ya empezó. Si no arranca, tocá el catálogo:</p>
          <div class="newsletter-files"></div>
          <button type="button" class="newsletter-continue">Ver catálogo</button>
        </div>
      </section>`;
    const previousFocus = document.activeElement;
    const close = ({ dismissed = true } = {}) => {
      if (dismissed) write(DISMISSED_KEY, String(Date.now()));
      overlay.remove();
      document.removeEventListener('keydown', onKey, true);
      previousFocus?.focus?.();
    };
    const onKey = event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } };
    document.addEventListener('keydown', onKey, true);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    overlay.querySelector('.newsletter-close').onclick = () => close();
    overlay.querySelector('.newsletter-skip').onclick = () => close();
    overlay.querySelector('.newsletter-continue').onclick = () => close({ dismissed: false });

    const form = overlay.querySelector('.newsletter-form');
    const input = form.querySelector('input[type="email"]');
    const submit = form.querySelector('button[type="submit"]');
    const error = overlay.querySelector('.newsletter-error');
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const email = input.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        error.textContent = 'Revisá el mail, parece que no es válido.';
        error.hidden = false;
        input.focus();
        return;
      }
      const choice = form.elements.catalog.value;
      const selected = choice === 'ambos' ? Object.values(CATALOGS) : [CATALOGS[choice]];
      error.hidden = true;
      submit.disabled = true;
      submit.textContent = 'Enviando…';
      try {
        await save(email, choice);
        write(SUBSCRIBED_KEY, '1');
        selected.forEach((catalog, index) => setTimeout(() => download(catalog), index * 600));
        overlay.querySelector('.newsletter-files').innerHTML = selected
          .map(({ label, file }) => `<a href="${file}" download>Catálogo ${label} (PDF)</a>`).join('');
        overlay.querySelector('.newsletter-copy').hidden = true;
        overlay.querySelector('.newsletter-done').hidden = false;
        overlay.querySelector('.newsletter-continue').focus();
      } catch {
        error.textContent = 'No pudimos guardar tu mail. Probá de nuevo en un rato.';
        error.hidden = false;
        submit.disabled = false;
        submit.textContent = 'Descargar';
      }
    });

    document.body.append(overlay);
    setTimeout(() => input.focus({ preventScroll: true }), 50);
  }

  if (!shouldShow()) return;
  const start = () => setTimeout(open, DELAY_MS);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
