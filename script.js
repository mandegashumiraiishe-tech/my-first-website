// =============================================
//  BIOMEDICAL INFORMATICS WEBSITE - script.js
// =============================================

// -----------------------------------------------
// 1. Dynamic Greeting — updates text by time of day
// -----------------------------------------------
function updateGreeting() {
  var greetingEl = document.getElementById('dynamic-greeting');
  if (!greetingEl) return;

  var hour = new Date().getHours();
  var greetingText;

  if (hour < 12) {
    greetingText = 'Good morning — welcome to the forefront of Biomedical Informatics.';
  } else if (hour < 17) {
    greetingText = 'Good afternoon — explore cutting-edge health research and data analysis.';
  } else {
    greetingText = 'Good evening — discover how data transforms patient care.';
  }

  greetingEl.textContent = greetingText;
}

// -----------------------------------------------
// 2. Hero Button — smooth scroll to info section
// -----------------------------------------------
function initHeroButton() {
  var heroBtn = document.getElementById('hero-btn');
  if (!heroBtn) return;

  heroBtn.onclick = function () {
    var infoGrid = document.getElementById('info-grid');
    if (infoGrid) {
      infoGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

// -----------------------------------------------
// 3. Dark / Light Mode Toggle
// -----------------------------------------------
function initDarkModeToggle() {
  var toggleBtn = document.getElementById('dark-mode-btn');
  if (!toggleBtn) return;

  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀ Light Mode';
    } else {
      toggleBtn.textContent = '☾ Dark Mode';
    }
  } catch (e) {
    toggleBtn.textContent = '☾ Dark Mode';
  }

  toggleBtn.onclick = function () {
    var isDark = document.body.classList.toggle('dark-mode');
    if (isDark) {
      toggleBtn.textContent = '☀ Light Mode';
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    } else {
      toggleBtn.textContent = '☾ Dark Mode';
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }
  };
}

// -----------------------------------------------
// 4. Hamburger / Mobile Navigation Menu
// -----------------------------------------------
function initHamburgerMenu() {
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.onclick = function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  var links = navLinks.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    };
  }
}

// -----------------------------------------------
// 5. Contact Form Validation
// -----------------------------------------------
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.onsubmit = function (e) {
    e.preventDefault();
    var isValid = true;

    var errors = form.getElementsByClassName('form-error');
    for (var i = 0; i < errors.length; i++) {
      errors[i].classList.remove('visible');
    }

    var nameInput = document.getElementById('contact-name');
    if (nameInput && nameInput.value.trim() === '') {
      document.getElementById('name-error').classList.add('visible');
      isValid = false;
    }

    var emailInput = document.getElementById('contact-email');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailPattern.test(emailInput.value.trim())) {
      document.getElementById('email-error').classList.add('visible');
      isValid = false;
    }

    var messageInput = document.getElementById('contact-message');
    if (messageInput && messageInput.value.trim() === '') {
      document.getElementById('message-error').classList.add('visible');
      isValid = false;
    }

    if (isValid) {
      var successMsg = document.getElementById('form-success');
      if (successMsg) { successMsg.classList.add('visible'); }
      form.reset();
    }
  };
}

// -----------------------------------------------
// INIT — Run everything when page is ready
// -----------------------------------------------
function initAll() {
  updateGreeting();
  initHeroButton();
  initDarkModeToggle();
  initHamburgerMenu();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
