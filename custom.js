document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const home = document.getElementById("home");
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const chatMessages = document.getElementById("chat-messages");
  const input = document.getElementById("user-input");
  const sendBtn = document.getElementById("handleUserMessage");

  // Mobile nav toggle
  toggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  home?.addEventListener("click", () => {
    window.location.href = '#';
  });

  document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  // TiinyHost ad removal
  const observer = new MutationObserver(() => {
    const ad = document.querySelector('a[href="https://tiiny.host?ref=free-site"]');
    if (ad?.parentElement) {
      ad.parentElement.style.display = "none";
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Dark mode
  darkModeToggle?.addEventListener("click", () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : '');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }

  // Scroll active nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  function activateMenuAtCurrentSection() {
    const scrollY = window.pageYOffset;
    const offset = 150;
    let currentId = sections[0]?.id;

    sections.forEach(section => {
      const top = section.offsetTop - offset;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) currentId = section.id;
    });

    if (window.innerHeight + scrollY >= document.body.offsetHeight - 10) {
      currentId = sections[sections.length - 1]?.id;
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', activateMenuAtCurrentSection);
  activateMenuAtCurrentSection();

  // Resume Bot Data
  const resumeData = {
    name: "Rathan Kumar M S",
    role: "Associate Software Engineer at Baryons Software Solutions",
    education: [
      "B.E., Electrical & Electronics – UVCE, Bengaluru (2022), CGPA: 8.52",
      "PUC – Lion’s PU College, Kollegal (2018), 90.16%",
      "SSLC – Sri Rajarajeshwari EM School (2016), 90.24%"
    ],
    projects: [
      "BOLMS – Course management app with Drupal, Moodle, Big Blue Button.",
      "Watermelon – Ecommerce app using Laravel, Angular, SQL Server.",
      "DESRMN – Retail Media Network app using CodeIgniter."
    ],
    skills: [
      "CodeIgniter, Laravel, Drupal, Moodle",
      "PHP, JavaScript, AngularJS, MySQL",
      "GitHub, GitLab, VS Code"
    ],
    contact: {
      email: '<a href="mailto:rathanms1306@gmail.com">rathanms1306@gmail.com</a>',
      phone: "+91 7483921542"
    },
    notice_period: "1 Month",
    current_ctc: "5 LPA",
    expected_ctc: "10 LPA",
    location: "Bengaluru",
    experience: "3 Years of experience in Full Stack Web Development"
  };

  // Bot messaging logic
  function handleUserMessage() {
    const userText = input.value.trim();
    if (userText === "") return;

    addMessage("You", userText);
    input.value = "";

    const text = userText.toLowerCase();
    let response = "Sorry, I didn’t get that.";

    if (text.includes("name")) {
      response = `My name is ${resumeData.name}.`;
    } else if (text.includes("project")) {
      response = `I've worked on: ${resumeData.projects.join(" | ")}`;
    } else if (text.includes("education")) {
      response = `My education includes: ${resumeData.education.join(" | ")}`;
    } else if (text.includes("skill")) {
      response = `My skills are: ${resumeData.skills.join(" | ")}`;
    } else if (text.includes("current company")) {
      response = `I am currently working as ${resumeData.role}.`;
    } else if (text.includes("contact")) {
      response = `Email: ${resumeData.contact.email} | Phone: ${resumeData.contact.phone}`;
    } else if (text.includes("notice")) {
      response = `My notice period is ${resumeData.notice_period}.`;
    } else if (text.includes("current ctc")) {
      response = `My current CTC is ${resumeData.current_ctc}.`;
    } else if (text.includes("expected ctc")) {
      response = `My expected CTC is ${resumeData.expected_ctc}.`;
    } else if (text.includes("location")) {
      response = `Currently staying in ${resumeData.location}.`;
    } else if (text.includes("experience")) {
      response = `I have ${resumeData.experience}.`;
    }

    setTimeout(() => addMessage("Bot", response), 600);
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = sender === "You" ? "user" : "bot";
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    msg.style.margin = "5px 0";
    msg.style.textAlign = sender === "You" ? "right" : "left";
    msg.style.color = sender === "You" ? "blue" : "black";
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Event bindings
  sendBtn?.addEventListener("click", handleUserMessage);
  input?.addEventListener("keydown", e => {
    if (e.key === "Enter") handleUserMessage();
  });

  document.querySelectorAll(".suggestion").forEach(item => {
    item.addEventListener("click", () => {
      input.value = item.textContent;
      input.focus();
      handleUserMessage();
    });
  });

  // Initial greeting
  window.addEventListener("load", () => {
    addMessage("Bot", "Hi! I'm Resume Bot. Ask me anything like: 'What are your skills?', 'Tell me about your education'.");
  });

  // Chat open/close toggle
  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const chatClose = document.getElementById("chat-close");

  chatToggle.addEventListener("click", () => {
    chatWidget.classList.toggle("hidden");
  });

  chatClose.addEventListener("click", () => {
    chatWidget.classList.add("hidden");
  });

  const suggestions = document.getElementById("suggestions");
  const suggestionItems = suggestions.querySelectorAll(".suggestion");
  const messages = document.getElementById("chat-messages");

  let suggestionClicked = false;

  // Initially hide suggestions
  suggestions.style.display = "none";

  // Attach click and mousedown listeners once (outside keyup)
  suggestionItems.forEach(item => {
    item.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Prevent focus loss
      input.value = item.textContent;
      suggestionClicked = true;
    });

    item.addEventListener("click", () => {
      document.getElementById("handleUserMessage").click();
      input.value = "";
      suggestions.style.display = "none";
      messages.style.display = "block";
    });
  });

  // Show and filter suggestions on keyup
  input.addEventListener("keyup", () => {
    const query = input.value.trim().toLowerCase();

    if (query !== "") {
      let matchFound = false;

      suggestionItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "block";
          matchFound = true;
        } else {
          item.style.display = "none";
        }
      });

      suggestions.style.display = matchFound ? "block" : "none";
    } else {
      suggestions.style.display = "none";
    }
  });

  // Handle Enter key
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (suggestionClicked) {
        suggestionClicked = false;
        return;
      }

      document.getElementById("handleUserMessage").click();
      input.value = "";
      suggestions.style.display = "none";
      messages.style.display = "block";
    }
  });

  

});
