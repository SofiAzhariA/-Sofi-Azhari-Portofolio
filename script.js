// Sofi Azhari Amini Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initHeaderScroll();
  initStatCounters();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initScrollSpy();
  initSkillBars();
});

/* 1. Dark/Light Theme Toggle */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector('i');
  if (icon) {
    icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }
}

/* 2. Header Scroll Effect */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 3. Mobile Navigation Menu */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }
}

/* 4. Animated Stats Counters */
function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseFloat(target.getAttribute('data-target'));
        const decimals = parseInt(target.getAttribute('data-decimals') || '0');
        const suffix = target.getAttribute('data-suffix') || '';
        
        let count = 0;
        const duration = 1800; // ms
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const increment = countTo / totalFrames;
        
        const timer = setInterval(() => {
          count += increment;
          if (count >= countTo) {
            count = countTo;
            clearInterval(timer);
          }
          target.innerText = count.toFixed(decimals) + suffix;
        }, frameRate);

        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

/* 5. Project Category Filtering */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* 6. Project Modal Details Data */
const projectData = {
  'sales-assist': {
    title: 'Sales Assist — Automated RAB Website',
    company: 'PT Telkom Indonesia (Persero) Tbk (Internship 2026)',
    category: 'Web Development / Automation',
    tech: ['HTML5', 'CSS3', 'Vanilla JS', 'REST API', 'JWT Auth', 'Data Analytics'],
    description: `Developed Sales Assist web application to streamline RAB preparation during internship at PT Telkom Indonesia. Integrated 2,134+ product master data across a 7-stage workflow from customer requirements to product recommendations and Excel-based RAB output. Designed responsive web interfaces using HTML5, CSS3, Vanilla JS with REST API, JWT authentication, and comparison dashboards across 4 sectors.`,
    deliverables: [
      'Integrating 2,134+ Product Master Data & 7-Stage Workflow',
      'Automated Product Recommendation & Excel-based RAB Output',
      'Comparison Dashboard across 4 Sectors (Connectivity, LMS, Data Center, Cloud)',
      'REST API & JWT Security Authentication Implementation',
      '10+ Project Deliverables & Notion Documentation'
    ],
    link: '#'
  },
  'kalkulator-fungsi': {
    title: 'Web-Based Function Calculator Application',
    company: 'Academic & Personal Project (2023)',
    category: 'Web Application',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Interactive Charting'],
    description: `Interactive mathematical web calculator capable of calculating quadratic function roots, vertex points (titik puncak), axis of symmetry (sumbu simetri), and discriminant while visualizing dynamic interactive graphs.`,
    deliverables: [
      'Real-time Function Plotting & Interactive Graph Visuals',
      'Automatic Calculation of Roots, Discriminant, & Vertex Points',
      'Clean Responsive Web Interface'
    ],
    link: 'https://sofiazharia.github.io/KalkulatorLinear.github.io/kalkulus.html'
  },
  'uiux-azzac': {
    title: 'UI/UX Design E-Commerce AZZAC',
    company: 'UI/UX Design Project (2024)',
    category: 'UI/UX Design',
    tech: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
    description: `Designed 18 high-fidelity UI screens using Figma for an e-commerce platform. Included desktop and mobile responsive views for core shopping flows: user authentication, product search, listing, item detail specs, shopping cart, checkout, payment integration, and user profile.`,
    deliverables: [
      '18 High-Fidelity UI Screens in Figma',
      'End-to-end Shopping & Payment Flow',
      '20+ Reusable UI Design Component Layers'
    ],
    link: 'https://www.figma.com/design/Y5G4NZtqrC2puecQZz37jK/--UTS-IMK--?node-id=12-221&t=rXu4XPBvopo3cppY-1'
  },
  'uiux-smart-angkot': {
    title: 'UI/UX Design Smart Angkot Transportation',
    company: 'UI/UX Design Project (2024)',
    category: 'UI/UX Design',
    tech: ['Figma', 'Mobile UI', 'Route Planning', 'User Experience'],
    description: `Designed complete mobile UI/UX experience for a Smart Angkot public transportation concept. Focused on intuitive route planning, real-time schedule tracking, transparent fare calculation, and seamless passenger booking experience.`,
    deliverables: [
      'Interactive Mobile App Figma Prototype',
      'Route Selection & Live Schedule UI Screen Flow',
      'User-Centered Accessibility & Design System'
    ],
    link: 'https://www.figma.com/design/lmJ5FCzoh8Y958hfDB1IeT/Prototype_Smart-Angkot?node-id=12-221&t=SmD5yMiBvSOvGITd-1'
  },
  'uiux-mytodo': {
    title: 'UI/UX Design STARTUP MyTo-Do',
    company: 'Task Management Web App (2024)',
    category: 'UI/UX Design',
    tech: ['Figma', 'Web Dashboard UI', 'Workflow Optimization'],
    description: `Designed UI/UX for a web-based productivity & task management application named MyTo-Do. Developed wireframes and interactive prototypes focusing on task organization, workflow customization, priority indicators, and minimalist dashboard interface.`,
    deliverables: [
      'Interactive Figma Web Dashboard Prototype',
      'Task Lifecycle & Status Tracking Interfaces',
      'Intuitive Productivity Layout Design'
    ],
    link: 'https://www.figma.com/design/LPW1efGHr3VdbmysNzE7c1/Prototype_Smart-Angkot?node-id=12-221&t=7Wy65qZaZWD0OxEG-1'
  },
  'kkn-kedungwuluh': {
    title: 'Kuliah Kerja Nyata (KKN) — Publication & Documentation',
    company: 'KKN 110 Kedungwuluh (2024/2026)',
    category: 'Publication & Media Content',
    tech: ['CapCut', 'Graphic Design', 'Social Media Management', 'Notion'],
    description: `Led the Publication & Documentation Division for KKN 110 Kedungwuluh. Managed event media coverage, created social media campaign designs, video highlights, press reports, and public documentation.`,
    deliverables: [
      'Official Instagram Media & Content Management',
      'High-Impact Video Recaps & Graphic Publications',
      'Activity Documentation Reports & Archives'
    ],
    link: 'https://www.instagram.com/kkn110.kedungwuluh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-body');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];

      if (data && modalContent) {
        modalContent.innerHTML = `
          <div style="display:inline-block; padding: 0.3rem 0.8rem; border-radius: 99px; background: rgba(16, 185, 129, 0.12); color: var(--accent-light-emerald); font-size: 0.8rem; font-weight: 600; margin-bottom: 0.8rem;">
            ${data.category}
          </div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.4rem;">${data.title}</h2>
          <p style="color: var(--accent-light-emerald); font-weight: 600; margin-bottom: 1.2rem;">${data.company}</p>
          
          <p style="color: var(--text-muted); font-size: 0.98rem; margin-bottom: 1.5rem; line-height: 1.7;">
            ${data.description}
          </p>

          <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem;">Key Deliverables & Highlights:</h4>
          <ul style="list-style: none; margin-bottom: 1.5rem;">
            ${data.deliverables.map(item => `
              <li style="padding-left: 1.2rem; position: relative; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.92rem;">
                <span style="position: absolute; left: 0; color: var(--accent-light-emerald);">✓</span> ${item}
              </li>
            `).join('')}
          </ul>

          <div style="margin-bottom: 1.8rem;">
            <h4 style="font-size: 1.0rem; margin-bottom: 0.6rem;">Technologies Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>

          ${data.link && data.link !== '#' ? `
            <a href="${data.link}" target="_blank" rel="noopener" class="btn-primary" style="width: 100%; justify-content: center;">
              Open Project Link <i class="ri-external-link-line"></i>
            </a>
          ` : ''}
        `;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

/* 7. Skill Progress Bars Animation */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* 8. Contact Form Handling & Toast Notice */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notice');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Sending...';

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4000);
        }
      }, 1200);
    });
  }
}

/* 9. Scroll Spy Navigation Highlight */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
