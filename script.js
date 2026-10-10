'use strict';

// --- Mobile Navigation Toggle ---
const menuToggle = document.querySelector('.menu-toggle') || document.querySelector('#menuToggle');
const navLinks = document.querySelector('.nav-links') || document.querySelector('#navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const nextState = !isOpen;
    
    menuToggle.setAttribute('aria-expanded', String(nextState));
    menuToggle.setAttribute('aria-label', nextState ? 'Close navigation' : 'Open navigation');
    
    // Supports both 'is-open' and 'open' classes depending on your CSS
    navLinks.classList.toggle('is-open', nextState);
    navLinks.classList.toggle('open', nextState);
  });

  // Close menu when clicking a navigation link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      navLinks.classList.remove('is-open', 'open');
    });
  });
}

// --- Portfolio / Project Filtering ---
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-category]')];
const projectCount = document.querySelector('#projectCount');

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      
      const category = button.dataset.filter;
      let shown = 0;
      
      projectCards.forEach((card) => {
        const visible = category === 'all' || card.dataset.category === category;
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      
      if (projectCount) {
        projectCount.textContent = `${String(shown).padStart(2, '0')} PROJECT${shown === 1 ? '' : 'S'}`;
      }
    });
  });
}

// --- Dynamic Copyright Year ---
const yearElement = document.querySelector('#year') || document.querySelector('#currentYear');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}