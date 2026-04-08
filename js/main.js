// Centralized footer
const footerEl = document.querySelector('footer');
if (footerEl) {
  footerEl.innerHTML = `
    <div class="foot">
      <a href="index.html" class="foot-logo"><img src="Vicenti_Logo.png" alt="V¢T Technologies" style="height:44px;width:auto;vertical-align:middle;"></a>
      <ul class="foot-links">
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <div class="foot-right">
        <p class="foot-copy">© 2026 V¢T Technologies LLC · <a href="https://vicenti.tech" style="color:var(--dim);text-decoration:none">vicenti.tech</a></p>
        <p class="foot-ownership">Native American &amp; Woman-Owned · Coon Rapids, MN</p>
      </div>
    </div>`;
}

// Mobile nav
const mobBtn = document.getElementById('mobBtn');
const navLinks = document.getElementById('navLinks');
if (mobBtn && navLinks) {
  mobBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Active nav link based on current page
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
});

// Fade-in on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
}, { threshold: 0.08 });
document.querySelectorAll('.fi').forEach(el => obs.observe(el));

// Photo fallback helper
function initPhoto(imgId, phId) {
  const img = document.getElementById(imgId);
  const ph = document.getElementById(phId);
  if (!img || !ph) return;
  img.onload = () => { img.style.display = 'block'; ph.style.display = 'none'; };
  img.onerror = () => { img.style.display = 'none'; ph.style.display = 'flex'; };
}

// Contact form (Formspree AJAX)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      } else {
        btn.innerHTML = orig;
        btn.disabled = false;
      }
    } catch {
      btn.innerHTML = orig;
      btn.disabled = false;
    }
  });
}
