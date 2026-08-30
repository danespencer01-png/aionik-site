/* ==================================================================
   ANALYTICS CONFIG — paste the two IDs here to switch tracking on.

   Both stay OFF while their value is an empty string, so the page never
   ships a broken beacon. Filling one in activates only that one.

   CF_BEACON_TOKEN  (SET 30 Aug 2026)
     Cloudflare dashboard -> Analytics & Logs -> Web Analytics -> Add a site
     -> aioniklabs.com -> MANUAL / JS snippet path -> the "token" value.
     Manual is required: the DNS records are grey cloud (DNS only) so traffic
     never passes through Cloudflare's proxy, and automatic setup would
     measure nothing. Counts visits, no cookies, no consent banner needed.

   CLARITY_PROJECT_ID  (SET 30 Aug 2026)
     clarity.microsoft.com -> sign in -> New project -> copy the id out of
     the install snippet (the last argument, a short alphanumeric string).
     Heatmaps and session replay. NOTE: Clarity does set cookies, so if you
     expect EU visitors you likely need a consent banner. Clarity masks form
     input by default, so what people type is not recorded.
   ================================================================== */
const CF_BEACON_TOKEN    = 'dc964eef76044a8b9c527ac23f86b6d6';
const CLARITY_PROJECT_ID = 'yaet5grufy';

(() => {
  // Cloudflare Web Analytics
  if (CF_BEACON_TOKEN) {
    const s = document.createElement('script');
    s.defer = true;
    s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_BEACON_TOKEN }));
    document.head.appendChild(s);
  }
  // Microsoft Clarity
  if (CLARITY_PROJECT_ID) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
  }
})();

/* Investor page — CTA click tracking.
   Fires into whichever providers are switched on above, plus dataLayer if a
   tag manager is ever added. Logs in dev so the hooks are verifiable locally. */
(() => {
  document.querySelectorAll('[data-cta]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-cta');
      if (window.dataLayer) window.dataLayer.push({ event: 'cta_click', cta: id });
      if (window.clarity) window.clarity('event', 'cta_' + id);
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        console.log('[cta]', id);
      }
    });
  });
})();

/* ------------------------------------------------------------------
   Footer "last updated" date.

   Driven by the page's own Last-Modified rather than a hardcoded string,
   so it can never go stale. GitHub Pages serves a real Last-Modified for
   the file, and document.lastModified reflects it in local time.

   The hardcoded date in the HTML is the fallback and stays correct if a
   host reports nothing usable. The year guard catches hosts that return
   the epoch or the current time for a missing header.
   ------------------------------------------------------------------ */
(() => {
  const el = document.getElementById('updated');
  if (!el) return;
  const d = new Date(document.lastModified);
  if (isNaN(d.getTime()) || d.getFullYear() < 2020) return;
  el.textContent = 'Last updated ' + d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
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
      if (window.clarity) window.clarity('event', 'inquiry_submitted');
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
