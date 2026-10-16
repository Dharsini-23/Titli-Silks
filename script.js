/* ===== TITLI SILKS – script.js ===== */

gsap.registerPlugin(ScrollTrigger);

/* ---------- STATE ---------- */
let selectedProduct = {};
let sharedLocationLink = '';
let orderFromView = false;

/* ---------- PRODUCTS DATA ---------- */
const products = [
  { name: 'Kanchipuram Pure Silk', price: '₹12,500', fabric: 'Pure Mulberry Silk', color: 'Royal Red & Gold', design: 'Traditional Temple Border', desc: 'Woven with pure mulberry silk, adorned with traditional temple borders and rich zari work.', img: 'https://i.pinimg.com/736x/a6/98/bb/a698bbb0f6320f85f7d63b4c80739fb6.jpg' },
  { name: 'Banarasi Silk Elegance', price: '₹9,800', fabric: 'Banarasi Silk', color: 'Ivory & Silver', design: 'Mughal Floral Motif', desc: 'Timeless Banarasi silk featuring intricate Mughal-inspired floral motifs with silver zari.', img: 'https://i.pinimg.com/1200x/1e/e9/5b/1ee95b7b22246cc426466a1a6af67fd9.jpg' },
  { name: 'Mysore Crepe Silk', price: '₹7,200', fabric: 'Mysore Crepe Silk', color: 'Deep Blue & Gold', design: 'Peacock Paisley Pattern', desc: 'Luxuriously soft Mysore crepe silk in deep ocean blue with golden peacock paisley patterns.', img: 'https://i.pinimg.com/1200x/3b/9d/56/3b9d56998e0d6bf1cadd1b58dc94dd83.jpg' },
  { name: 'Dharmavaram Silk', price: '₹10,500', fabric: 'Dharmavaram Pure Silk', color: 'Magenta & Gold', design: 'Large Floral Butta', desc: 'Bold and vibrant Dharmavaram weave with large butta motifs in rich magenta and gold.', img: 'https://i.pinimg.com/1200x/d2/b6/cc/d2b6ccda946a939b3e6bd865092d187b.jpg' },
  { name: 'Tussar Raw Silk', price: '₹6,800', fabric: 'Pure Tussar Silk', color: 'Warm Beige & Brown', design: 'Tribal Madhubani Print', desc: 'Earthy Tussar raw silk with authentic Madhubani tribal hand-painted artwork in warm tones.', img: 'https://i.pinimg.com/736x/e0/4e/b3/e04eb324d59bea6a374d2d5299dc42e3.jpg' },
  { name: 'Uppada Pattu Silk', price: '₹14,000', fabric: 'Uppada Pattu Pure Silk', color: 'Emerald Green & Gold', design: 'Classic Jamdani Weave', desc: 'The finest Uppada Jamdani weave in emerald green — coveted for its gossamer texture and artistry.', img: 'https://i.pinimg.com/736x/ec/72/d2/ec72d211581124fcdd500ee59c015ca6.jpg' },
];

document.getElementById('productsGrid').innerHTML = products.map((p, i) =>
  `<div class="product-card reveal" data-name="${p.name}" data-price="${p.price}" data-fabric="${p.fabric}" data-color="${p.color}" data-design="${p.design}" data-img="${p.img}">
    <div class="card-img-wrap">
      <img src="${p.img}" alt="${p.name}"/>
      <div class="card-overlay"></div>
    </div>
    <div class="card-body">
      <h3 class="card-name">${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <p class="card-price">${p.price}</p>
      <div class="card-actions">
        <button class="btn-ship" title="Ship Now"><i class="fa fa-truck"></i> Ship Now</button>
        <button class="btn-view" title="View Details"><i class="fa fa-eye"></i> View</button>
      </div>
    </div>
  </div>`
).join('');

/* ---------- HEADER SCROLL ---------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- HAMBURGER ---------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
  });
});

/* ---------- HERO GSAP ---------- */
const heroTl = gsap.timeline({ delay: 0.2 });
heroTl
  .fromTo('#heroTag',   { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  .fromTo('#heroTitle', { autoAlpha: 0, y: 40, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out' }, '-=0.4')
  .fromTo('#heroSub',   { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .fromTo('#heroCta',   { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');

gsap.from('.hero-scroll-hint', { opacity: 0, y: 16, duration: 1, delay: 2, ease: 'power2.out' });

/* ---------- SCROLL REVEAL ---------- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseFloat(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('visible'), delay * 1000);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.14 });

reveals.forEach((el, i) => {
  if (el.classList.contains('product-card')) {
    el.dataset.delay = (i % 3) * 0.12;
  }
  revealObserver.observe(el);
});

/* ---------- GSAP CARD HOVER ---------- */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -8, duration: 0.35, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.inOut' });
  });
});

/* ---------- GSAP SECTION HEADER ---------- */
gsap.from('.section-header .section-label', {
  scrollTrigger: { trigger: '#products', start: 'top 80%' },
  opacity: 0, y: 20, duration: 0.7, ease: 'power3.out'
});
gsap.from('.section-header .section-title', {
  scrollTrigger: { trigger: '#products', start: 'top 75%' },
  opacity: 0, y: 28, duration: 0.9, ease: 'power3.out', delay: 0.15
});

/* ---------- POPUP UTILITY ---------- */
function openPopup(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  gsap.fromTo(overlay.querySelector('.popup-box'),
    { scale: 0.85, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.6)' }
  );
}

function closePopup(overlayId) {
  const overlay = document.getElementById(overlayId);
  gsap.to(overlay.querySelector('.popup-box'), {
    scale: 0.88, opacity: 0, duration: 0.3, ease: 'power2.in',
    onComplete: () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ---------- SHIPPING POPUP ---------- */
function openShippingPopup(name, link) {
  selectedProduct.name = name;
  selectedProduct.link = link || '';
  sharedLocationLink = '';
  document.getElementById('locationStatus').textContent = '';
  document.getElementById('shipName').value = '';
  document.getElementById('shipPhone').value = '';
  document.getElementById('shipAddress').value = '';
  document.getElementById('shippingProductName').textContent = name;
  openPopup('shippingOverlay');
}

document.getElementById('closeShipping').addEventListener('click', () => closePopup('shippingOverlay'));
document.getElementById('shippingOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closePopup('shippingOverlay');
});

/* ---------- SHIP BUTTONS ---------- */
document.querySelectorAll('.btn-ship').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    openShippingPopup(card.dataset.name, card.dataset.img);
  });
});

/* ---------- LOCATION SHARE ---------- */
document.getElementById('shareLocation').addEventListener('click', () => {
  const statusEl = document.getElementById('locationStatus');
  statusEl.textContent = 'Getting location…';
  if (!navigator.geolocation) {
    statusEl.textContent = '⚠ Geolocation not supported.';
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      sharedLocationLink = `https://maps.google.com/?q=${lat},${lng}`;
      statusEl.textContent = `✔ Location captured! (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    },
    (err) => {
      sharedLocationLink = '';
      statusEl.textContent = err.code === 1
        ? '⚠ Permission denied. Please allow location access.'
        : '⚠ Could not get location. Try again.';
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
});

/* ---------- SUBMIT SHIPPING ---------- */
document.getElementById('submitShipping').addEventListener('click', () => {
  const name = document.getElementById('shipName').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();
  const address = document.getElementById('shipAddress').value.trim();

  if (!name || !phone || !address) {
    const status = document.getElementById('locationStatus');
    status.textContent = '⚠ Please fill in all fields before submitting.';
    status.style.color = '#c0392b';
    setTimeout(() => { status.textContent = ''; status.style.color = ''; }, 3000);
    return;
  }

  const locText = sharedLocationLink || 'Not provided';
  const sareeLink = selectedProduct.link ? `\n ${selectedProduct.link}` : '';
  const msg = encodeURIComponent(
`🛒 New Order Request – Titli Silks
━━━━━━━━━━━━━━━━━━━━
👤 Name    : ${name}
📞 Phone   : ${phone}
🏠 Address : ${address}
📍 Location: ${locText}
━━━━━━━━━━━━━━━━━━━━
🛍️ Saree   : ${selectedProduct.name}
🔗 View Saree: ${sareeLink}
━━━━━━━━━━━━━━━━━━━━`
  );
  window.open(`https://wa.me/918608865811?text=${msg}`, '_blank');
  closePopup('shippingOverlay');
});

/* ---------- VIEW POPUP ---------- */
document.querySelectorAll('.btn-view').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    openViewPopup(card);
  });
});

function openViewPopup(card) {
  document.getElementById('viewImg').src = card.dataset.img;
  document.getElementById('viewName').textContent = card.dataset.name;
  document.getElementById('viewFabric').textContent = card.dataset.fabric;
  document.getElementById('viewColor').textContent = card.dataset.color;
  document.getElementById('viewDesign').textContent = card.dataset.design;
  document.getElementById('viewPrice').textContent = card.dataset.price;
  selectedProduct = {
    name: card.dataset.name,
    img: card.dataset.img,
    price: card.dataset.price
  };
  openPopup('viewOverlay');
}

document.getElementById('closeView').addEventListener('click', () => closePopup('viewOverlay'));
document.getElementById('viewOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closePopup('viewOverlay');
});

/* ---------- VIEW → ORDER ---------- */
document.getElementById('viewOrderBtn').addEventListener('click', () => {
  closePopup('viewOverlay');
  setTimeout(() => openShippingPopup(selectedProduct.name, selectedProduct.img), 350);
});

/* ---------- CONTACT POPUP ---------- */
function setupContactTrigger(id) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => {
    document.getElementById('contactName').value = '';
    document.getElementById('contactPhone').value = '';
    document.getElementById('contactAddress').value = '';
    openPopup('contactOverlay');
  });
}
setupContactTrigger('openContactPopup');
setupContactTrigger('openContactPopupMob');
setupContactTrigger('openContactAbout');

document.getElementById('closeContact').addEventListener('click', () => closePopup('contactOverlay'));
document.getElementById('contactOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closePopup('contactOverlay');
});

document.getElementById('submitContact').addEventListener('click', () => {
  const name = document.getElementById('contactName').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const address = document.getElementById('contactAddress').value.trim();

  if (!name || !phone || !address) {
    const errEl = document.createElement('p');
    errEl.textContent = '⚠ Please fill in all fields.';
    errEl.style.cssText = 'color:#c0392b;font-size:0.78rem;text-align:center;margin-top:-0.5rem;';
    const form = document.querySelector('#contactPopup .popup-form');
    const existing = form.querySelector('.form-error');
    if (existing) existing.remove();
    errEl.classList.add('form-error');
    form.appendChild(errEl);
    setTimeout(() => errEl.remove(), 3000);
    return;
  }

  const msg = encodeURIComponent(
`Customer Inquiry - Titli Silks
Name: ${name}
Phone: ${phone}
Address: ${address}`
  );
  window.open(`https://wa.me/918608865811?text=${msg}`, '_blank');
  closePopup('contactOverlay');
});

/* ---------- ESCAPE KEY ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['shippingOverlay', 'viewOverlay', 'contactOverlay'].forEach(id => {
      if (document.getElementById(id).classList.contains('active')) closePopup(id);
    });
  }
});

/* ---------- GSAP ABOUT SECTION ---------- */
gsap.from('.about-points li', {
  scrollTrigger: { trigger: '.about-points', start: 'top 85%' },
  opacity: 0, x: 20, stagger: 0.12, duration: 0.6, ease: 'power2.out'
});

/* ---------- SMOOTH NAV SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
