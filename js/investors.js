/* Investor page — CTA click tracking.
   No analytics provider is wired yet (TODO: confirm Plausible / GA4 / Fathom).
   Until then, clicks push to dataLayer if present and log in dev, so the
   hooks are in place and nothing fails silently. */
(() => {
  document.querySelectorAll('[data-cta]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-cta');
      if (window.dataLayer) window.dataLayer.push({ event: 'cta_click', cta: id });
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.log('[cta]', id);
      }
    });
  });
})();
