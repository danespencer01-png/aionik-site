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

/* ------------------------------------------------------------------
   Investor inquiry form -> Google Forms

   Posts the native form straight to the published "Aionik - Investor
   Inquiry" form. Responses land in the same linked Google Sheet as the
   hosted form did.

   Entry IDs were read off the live form's FB_PUBLIC_LOAD_DATA_ on
   29 August 2026. If a question is reordered the IDs stay valid; if a
   question is DELETED and recreated its ID changes and that field will
   stop recording, silently. Re-check the IDs after editing the form.

   Google serves no CORS headers on formResponse, so the reply is opaque:
   a resolved request means "delivered", not "accepted". Validation
   therefore happens here, before sending. A rejected request (offline,
   blocked) surfaces an error with a link to the hosted form.
   ------------------------------------------------------------------ */
(() => {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const PUBLIC_ID = '1FAIpQLSfZdrmqg4KDKS1ceFqaoDpt4alQLhv_4Y3kGxPw32bfBXSxwg';
  const ACTION = `https://docs.google.com/forms/d/e/${PUBLIC_ID}/formResponse`;
  const HOSTED = `https://docs.google.com/forms/d/e/${PUBLIC_ID}/viewform`;

  const ENTRY = {
    name:    'entry.1305723353',
    email:   'entry.278522877',
    firm:    'entry.1516766862',
    discuss: 'entry.1270242905',
    amount:  'entry.423035212'
  };

  const status = document.getElementById('if-status');
  const done   = document.getElementById('if-done');
  const submit = form.querySelector('.if-submit');

  const fields = {
    name:  document.getElementById('if-name'),
    email: document.getElementById('if-email'),
    firm:  document.getElementById('if-firm')
  };

  // Deliberately loose: something, an @, something, a dot, something.
  // Anything stricter rejects valid addresses.
  const looksLikeEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const setError = (input, on) => {
    const err = document.getElementById(`${input.id}-err`);
    input.classList.toggle('invalid', on);
    input.setAttribute('aria-invalid', on ? 'true' : 'false');
    if (err) {
      err.hidden = !on;
      if (on) input.setAttribute('aria-describedby', err.id);
      else input.removeAttribute('aria-describedby');
    }
  };

  const validate = () => {
    let firstBad = null;
    Object.values(fields).forEach(input => {
      const v = input.value.trim();
      const bad = input === fields.email ? !looksLikeEmail(v) : v === '';
      setError(input, bad);
      if (bad && !firstBad) firstBad = input;
    });
    if (firstBad) {
      firstBad.focus();
      status.className = 'if-status err';
      status.textContent = 'Please check the highlighted fields.';
    }
    return !firstBad;
  };

  // clear a field's error as soon as it is corrected
  Object.values(fields).forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) setError(input, false);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // honeypot: a bot filled a field no person can see
    if (form.website.value !== '') return;

    if (!validate()) return;

    submit.disabled = true;
    submit.textContent = 'Sending...';
    status.className = 'if-status';
    status.textContent = '';

    const body = new URLSearchParams();
    body.append(ENTRY.name,    fields.name.value.trim());
    body.append(ENTRY.email,   fields.email.value.trim());
    body.append(ENTRY.firm,    fields.firm.value.trim());
    body.append(ENTRY.discuss, form.discuss.value.trim());
    body.append(ENTRY.amount,  form.amount.value.trim());

    try {
      // URLSearchParams sends form-urlencoded, which is CORS-safelisted,
      // so this posts without a preflight. no-cors makes the opaque
      // response acceptable instead of a thrown CORS error.
      await fetch(ACTION, { method: 'POST', mode: 'no-cors', body });

      if (window.dataLayer) window.dataLayer.push({ event: 'form_submit', form: 'investor-inquiry' });
      form.hidden = true;
      done.hidden = false;
      done.setAttribute('tabindex', '-1');
      done.focus();
    } catch (err) {
      submit.disabled = false;
      submit.textContent = 'Send inquiry';
      status.className = 'if-status err';
      status.innerHTML =
        `That didn't send. Please try again, or use the <a href="${HOSTED}" target="_blank" rel="noopener">hosted form</a>.`;
    }
  });
})();
