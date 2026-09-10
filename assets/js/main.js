/**
 * IDEAL KITCHENS ZAMBIA — MAIN INTERACTION CONTROLLER
 * Architecture: Modular Vanilla JS / Image Assurance / Smooth Kinetic Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initDemoBanner();
  initSiteLoader();
  initStickyHeader();
  initMobileMenu();
  initScrollReveals();
  initServicesAccordion();
  initGalleryFilteringAndLightbox();
  initImageAssurance();
});

/**
 * 0. Demo Announcement Banner Controller
 */
function initDemoBanner() {
  const banner = document.getElementById('demoTopBanner');
  const closeBtn = document.getElementById('demoBannerClose');
  const header = document.getElementById('siteHeader');

  if (!banner || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    document.documentElement.style.setProperty('--banner-height', '0px');
    if (header) {
      header.style.top = '0px';
    }
  });
}

/**
 * 1. Intro Page Loader
 */
function initSiteLoader() {
  const loader = document.getElementById('siteLoader');
  if (!loader) return;

  const counterEl = document.getElementById('loaderCounter');
  let count = 0;
  const timer = setInterval(() => {
    count += Math.floor(Math.random() * 14) + 5;
    if (count > 100) count = 100;
    if (counterEl) counterEl.textContent = `${count}%`;

    if (count === 100) {
      clearInterval(timer);
      setTimeout(() => {
        loader.classList.add('is-loaded');
        document.body.classList.remove('is-loading');
      }, 300);
    }
  }, 35);

  setTimeout(() => {
    loader.classList.add('is-loaded');
    document.body.classList.remove('is-loading');
  }, 1800);
}

/**
 * 2. Sticky Minimal Navigation
 */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 3. Mobile Fullscreen Menu
 */
function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!burgerBtn || !drawer) return;

  const openMenu = () => {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  burgerBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * 4. IntersectionObserver Scroll Reveals
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * 5. Interactive Services Accordion & Sticky Image Switcher
 */
function initServicesAccordion() {
  const rows = document.querySelectorAll('.service-row');
  const canvasImages = document.querySelectorAll('.canvas-image-wrap img');
  const captionTitle = document.getElementById('canvasCaptionTitle');
  const captionSub = document.getElementById('canvasCaptionSub');

  if (!rows.length) return;

  rows.forEach(row => {
    const activateRow = () => {
      rows.forEach(r => r.classList.remove('is-active'));
      row.classList.add('is-active');

      const targetIndex = row.getAttribute('data-service-index');
      const serviceTitle = row.getAttribute('data-service-name');
      const serviceSub = row.getAttribute('data-service-sub');

      canvasImages.forEach(img => {
        if (img.getAttribute('data-index') === targetIndex) {
          img.classList.add('is-active');
        } else {
          img.classList.remove('is-active');
        }
      });

      if (captionTitle) captionTitle.textContent = serviceTitle;
      if (captionSub) captionSub.textContent = serviceSub;
    };

    row.addEventListener('click', activateRow);
    row.addEventListener('mouseenter', activateRow);
  });
}

/**
 * 7. Projects Filter & Full-Screen Lightbox Modal
 */
function initGalleryFilteringAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxMeta = document.getElementById('lightboxMeta');
  const lightboxClose = document.getElementById('lightboxCloseBtn');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filterVal = btn.getAttribute('data-filter');
      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          // Use empty string to inherit from CSS (respects grid-column span)
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Open (Displays full uncropped image)
  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title');
      const meta = item.getAttribute('data-meta');

      if (!lightbox || !img) return;

      lightboxImg.src = img.src;
      lightboxTitle.textContent = title || 'Ideal Kitchens Project';
      lightboxMeta.textContent = meta || 'Lusaka, Zambia';

      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Lightbox Close
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

/**
 * 8. Image Load Assurance (Ensures All Images Load Fully & Never Break)
 */
function initImageAssurance() {
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      // Fallback only on genuine network failure
      if (!this.getAttribute('data-has-failed')) {
        this.setAttribute('data-has-failed', 'true');
        this.src = 'assets/images/ideal_authentic_1.jpeg';
      }
    });
  });
}
