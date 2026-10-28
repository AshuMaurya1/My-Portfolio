/**
 * ASHU KUMAR MAURYA — EXECUTIVE SOFTWARE ENGINEER PORTFOLIO LOGIC
 * High-performance, accessible, vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const html = document.documentElement;
  const header = document.querySelector('header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const showMoreBtn = document.getElementById('show-more-btn');
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const backToTopBtn = document.getElementById('back-to-top');
  const toast = document.getElementById('toast-notification');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  /* --------------------------------------------------------------------------
     1. Light & Dark Theme Management
     -------------------------------------------------------------------------- */
  const savedTheme = localStorage.getItem('ashu_portfolio_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('ashu_portfolio_theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
      }
    } else {
      html.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. Header Scroll Effect, Progress Bar & Active Nav Link
     -------------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Top Scroll Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const progressPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // Header glass effect
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy for active navigation item
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     3. Mobile Drawer Navigation
     -------------------------------------------------------------------------- */
  function openDrawer() {
    mobileDrawer.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* --------------------------------------------------------------------------
     4. Portfolio Filter Tabs
     -------------------------------------------------------------------------- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isHiddenExtra = card.classList.contains('extra-project') && !card.classList.contains('revealed');

        if (filterValue === 'all' || category === filterValue) {
          if (!isHiddenExtra) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Show More Projects Toggle
     -------------------------------------------------------------------------- */
  let isExpanded = false;
  const extraProjects = document.querySelectorAll('.extra-project');

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      extraProjects.forEach(card => {
        if (isExpanded) {
          card.classList.add('revealed');
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.remove('revealed');
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });

      showMoreBtn.innerHTML = isExpanded 
        ? `Show less <i class='bx bx-up-arrow-alt'></i>`
        : `Show more <i class='bx bx-right-arrow-alt'></i>`;
    });
  }

  /* --------------------------------------------------------------------------
     6. Services Modal Popup ("Read more ->")
     -------------------------------------------------------------------------- */
  const serviceDetails = {
    'Full-Stack Web Dev': {
      title: 'Full-Stack Web Development (MERN)',
      content: `
        <p>Architecting complete, production-ready web applications using React.js on the frontend and Node.js, Express.js, and MongoDB on the backend.</p>
        <h4 style="margin: 18px 0 8px; font-size: 1rem; color: var(--text-primary);">Key Deliverables:</h4>
        <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Modular component architecture with React.js, hooks, and clean state management</li>
          <li>Robust REST API design and integration with Express.js and Node.js</li>
          <li>Database modeling, indexing, and aggregation pipelines with MongoDB &amp; Mongoose</li>
          <li>Secure user authentication with JSON Web Tokens (JWT) and bcrypt password hashing</li>
        </ul>
      `
    },
    'API & Backend Systems': {
      title: 'Scalable RESTful APIs & Backend Architecture',
      content: `
        <p>Engineering secure, high-throughput server backends with defensive API validation and clean separation of concerns.</p>
        <h4 style="margin: 18px 0 8px; font-size: 1rem; color: var(--text-primary);">Key Deliverables:</h4>
        <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>FastAPI &amp; Express.js endpoint design with comprehensive query &amp; body validation</li>
          <li>Route protection with 8+ secure middleware guards eliminating unauthorized access</li>
          <li>Relational (SQLite) and NoSQL (MongoDB) schema design with conflict elimination</li>
          <li>Rigorous API testing and documentation using Postman collections</li>
        </ul>
      `
    },
    'UI/UX & Responsive Web': {
      title: 'Responsive Frontend Engineering',
      content: `
        <p>Crafting accessible, pixel-perfect user interfaces engineered for zero layout shifts and rapid command latencies.</p>
        <h4 style="margin: 18px 0 8px; font-size: 1rem; color: var(--text-primary);">Key Deliverables:</h4>
        <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Mobile-first responsive layouts across 5+ screen resolutions</li>
          <li>Sub-300ms execution latency using streamlined asynchronous event handlers</li>
          <li>Browser Web Speech API integrations with fallback error handling</li>
          <li>Modern CSS with design tokens, glassmorphism, and smooth micro-animations</li>
        </ul>
      `
    },
    'ML & Smart Systems': {
      title: 'Machine Learning & Predictive Systems',
      content: `
        <p>Applying machine learning algorithms to real-time engineering challenges such as traffic congestion and automated decision-making.</p>
        <h4 style="margin: 18px 0 8px; font-size: 1rem; color: var(--text-primary);">Key Deliverables:</h4>
        <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Predictive modeling with Random Forest, XGBoost, and Scikit-learn</li>
          <li>Python and FastAPI microservices serving real-time model inferences</li>
          <li>Adaptive safety-critical control logic reducing vehicle waiting times</li>
          <li>Interactive analytical dashboards built in React.js for metric visualization</li>
        </ul>
      `
    }
  };

  const serviceLinks = document.querySelectorAll('.service-link, .service-card');
  serviceLinks.forEach(cardOrLink => {
    cardOrLink.addEventListener('click', (e) => {
      const card = cardOrLink.closest('.service-card') || cardOrLink;
      const titleEl = card.querySelector('.service-title');
      if (!titleEl) return;
      const serviceName = titleEl.textContent.trim();
      const details = serviceDetails[serviceName];

      if (details) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = details.content;
        openModal();
      }
    });
  });

  /* --------------------------------------------------------------------------
     7. Resume Projects Modal Deep-Dive
     -------------------------------------------------------------------------- */
  const resumeProjectsData = {
    traffic: {
      title: 'AI-Based Traffic Congestion Prediction System',
      badge: 'React.js • Python • Node.js • FastAPI • SQLite • XGBoost',
      timeline: 'May 2026 – Sep 2026',
      bullets: [
        'Developed an intelligent traffic management system using machine learning (Random Forest, XGBoost) to predict congestion and dynamically adjust traffic signal timings.',
        'Built a full-stack application with a React.js analytics dashboard, a Python/FastAPI ML backend, and a Node.js API/simulation service, backed by SQLite.',
        'Implemented a safety-critical signal timing engine with conflict prevention and adaptive control logic, reducing vehicle waiting times and improving throughput versus fixed-time signals.'
      ]
    },
    voice: {
      title: 'Client-Side Voice Assistant',
      badge: 'HTML5 • CSS3 • JavaScript • Web Speech API',
      timeline: 'Jan 2025 – Mar 2025',
      bullets: [
        'Developed a client-side Voice Assistant supporting 15+ real-time voice commands using the Web Speech API and JavaScript.',
        'Constructed a mobile-first responsive interface across 5+ screen resolutions, reducing visual layout shifts by 100%.',
        'Streamlined asynchronous event handlers and speech synthesis pipelines to achieve sub-300ms command execution latency.',
        'Engineered automated fallback validation and speech error handling, ensuring 98% command recognition accuracy across test scenarios.'
      ]
    },
    agri: {
      title: 'Agricultural Equipment Rental Platform',
      badge: 'React.js • Node.js • Express.js • MongoDB • JWT',
      timeline: 'Jan 2026 – Jul 2026',
      bullets: [
        'Architected a full-stack rental platform supporting 4+ tractor categories with real-time inventory tracking and date-based scheduling.',
        'Built a comprehensive owner management portal featuring 10+ REST endpoints to manage equipment inventory, track bookings, and calculate revenue metrics.',
        'Implemented JWT authentication, 8+ secure route guards, and MongoDB schema validation to eliminate 100% of double-booking scheduling conflicts.'
      ]
    },
    leetcode: {
      title: 'LeetCode Consistency & Problem Solving',
      badge: 'Java • Data Structures & Algorithms • 200-Day Streak',
      timeline: 'Active Daily Practice',
      bullets: [
        'Solved 300+ algorithmic problems while sustaining an active 200-day streak covering arrays, linked lists, trees, and memoization algorithms.',
        'Completed 100+ hours of structured DSA training (College Wallah) and full-stack React.js specialization (Love Babbar).',
        'Deep understanding of Time/Space complexity analysis, recursion, dynamic programming, and Object-Oriented Programming (OOP) in Java.'
      ]
    },
    training: {
      title: 'Full Stack Web Development Certification',
      badge: 'CodeSquadz & AppSquadz in collab with AKGEC',
      timeline: 'Jun 2026 – Jul 2026',
      bullets: [
        'Completed 6-Week Job-Oriented Training by CodeSquadz & AppSquadz in collaboration with Ajay Kumar Garg Engineering College, Ghaziabad.',
        'Built production-level MERN stack applications with industry standards, state management, and Git workflows.'
      ]
    },
    aacar: {
      title: 'AACAR 9.0 Automotive Workshop',
      badge: 'SAE India Collegiate Club & Bosch JCC',
      timeline: 'Technical Workshop',
      bullets: [
        'Selected for AACAR 9.0 and completed 16 hours of intensive training in Automotive Technology hosted by SAE India Collegiate Club & Bosch JCC.',
        'Explored emerging automotive systems, embedded diagnostics, and real-time sensor processing.'
      ]
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projKey = card.getAttribute('data-project');
      const data = resumeProjectsData[projKey];

      if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;">
            <span style="font-size: 0.8rem; background: var(--icon-box-bg); color: var(--accent-pink); padding: 4px 12px; border-radius: 9999px; font-weight: 600;">
              ${data.badge}
            </span>
            <span style="font-size: 0.8rem; background: var(--bg-card); border: 1px solid var(--border-card); padding: 4px 12px; border-radius: 9999px; color: var(--text-muted);">
              ${data.timeline}
            </span>
          </div>
          <h4 style="margin: 16px 0 8px; font-size: 0.95rem; color: var(--text-primary);">Highlights from Resume:</h4>
          <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 20px;">
            ${data.bullets.map(b => `<li style="margin-bottom: 8px;">${b}</li>`).join('')}
          </ul>
          <div style="display: flex; gap: 12px; margin-top: 14px; flex-wrap: wrap;">
            <a href="https://github.com/AshuMaurya1" target="_blank" rel="noopener noreferrer" class="btn-primary-gradient" style="padding: 10px 22px; font-size: 0.88rem;">
              View on GitHub <i class='bx bx-right-arrow-alt'></i>
            </a>
            <a href="Ashu_Resume.pdf" target="_blank" rel="noopener noreferrer" class="btn-secondary-outline" style="padding: 10px 20px; font-size: 0.88rem;">
              Download Resume <i class='bx bx-download'></i>
            </a>
          </div>
        `;
        openModal();
      }
    });
  });

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  window.closeModalWindow = closeModal;
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  /* --------------------------------------------------------------------------
     8. 1-Click Copy Email to Clipboard
     -------------------------------------------------------------------------- */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'ashumaurya2597@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `<i class='bx bx-check'></i> <span>Copied!</span>`;
        showToast('Email address copied to clipboard! 📋');

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
        }, 2500);
      }).catch(() => {
        showToast('Direct: ashumaurya2597@gmail.com');
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. Contact Form Submission & Toast Alert
     -------------------------------------------------------------------------- */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <i class='bx bx-loader-alt bx-spin'></i>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully. 🚀');
      }, 1000);
    });
  }

  function showToast(message) {
    if (!toast) return;
    const toastText = toast.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
});