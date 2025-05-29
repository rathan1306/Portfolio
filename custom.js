// const hideTiinyHostAd = setInterval(() => {
//   const tiinyLink = document.querySelector('a[href="https://tiiny.host?ref=free-site"]');
//   if (tiinyLink && tiinyLink.parentElement) {
//     tiinyLink.parentElement.style.display = 'none';
//     clearInterval(hideTiinyHostAd);
//   }
// }, 500);

// Toggle mobile nav menu
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const home= document.getElementById("home");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  home.addEventListener("click", () => {
    window.location.href = '#';
  });

  
  // Optional: Hide menu when a link is clicked
  document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  // Hide TiinyHost ad instantly
  const observer = new MutationObserver(() => {
    const tiinyLink = document.querySelector('a[href="https://tiiny.host?ref=free-site"]');
    if (tiinyLink && tiinyLink.parentElement) {
      tiinyLink.parentElement.style.display = 'none';
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = '☀️'; // change icon for light mode
    } else {
      localStorage.removeItem('darkMode');
      darkModeToggle.textContent = '🌙'; // moon icon for dark mode
    }
  });

  // On load, check saved preference
  window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  function activateMenuAtCurrentSection() {
    const scrollY = window.pageYOffset;
    const offset = 150; // adjust based on your fixed header height

    let currentSectionId = sections[0].id; // default to first

    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;

      // If scrollY is within this section's bounds, update currentSectionId
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.id;
      }
    });

    // If near bottom of page, force last section active
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
      currentSectionId = sections[sections.length - 1].id;
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentSectionId);
    });
  }

  window.addEventListener('scroll', activateMenuAtCurrentSection);

  // Initial call
  activateMenuAtCurrentSection();


});
