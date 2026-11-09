/**
 * Main Application Logic - Cyber Bento Edition
 * Wuttipat Panphuang - SPU ICT 2nd Year Portfolio
 * Full-Stack Vanilla JS Implementation
 */

// Global State
const appState = {
  lang: localStorage.getItem('portfolio_lang') || 'th',
  theme: localStorage.getItem('portfolio_theme') || 'dark',
  projectFilter: 'All',
  projects: typeof defaultProjects !== 'undefined' ? [...defaultProjects] : [],
  certificates: typeof defaultCertificates !== 'undefined' ? [...defaultCertificates] : [],
  profile: {
    photo: "assets/profile.png",
    name: "วุฒิภัทร ปันพวง",
    nameEn: "Wuttipat Panphuang",
    gpax: "3.78",
    email: "realwuttipat@gmail.com",
    phone: "094-856-2103",
    github: "https://github.com/Wuttipat1",
    linkedin: "https://linkedin.com/in/wuttipat-spu",
    location: "กรุงเทพมหานคร, ประเทศไทย"
  },
  editingProjectId: null,
  editingCertId: null
};

// Application Startup: Render instantly then hydrate async storage
function startApp() {
  initTheme();
  renderAll();
  setupEventListeners();
  setupScrollSpy();
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  // Load persistent storage in background without blocking initial rendering
  initData().then(() => {
    renderAll();
  }).catch(err => {
    console.warn('initData error:', err);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

// Theme Management
function initTheme() {
  const root = document.documentElement;
  const body = document.body;
  if (appState.theme === 'dark') {
    root.classList.add('dark');
    body.classList.remove('bg-grid-dots-light');
    body.classList.add('bg-grid-dots-dark');
  } else {
    root.classList.remove('dark');
    body.classList.remove('bg-grid-dots-dark');
    body.classList.add('bg-grid-dots-light');
  }
}

function toggleTheme() {
  const root = document.documentElement;
  const body = document.body;
  appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
  if (appState.theme === 'dark') {
    root.classList.add('dark');
    body.classList.remove('bg-grid-dots-light');
    body.classList.add('bg-grid-dots-dark');
  } else {
    root.classList.remove('dark');
    body.classList.remove('bg-grid-dots-dark');
    body.classList.add('bg-grid-dots-light');
  }
  localStorage.setItem('portfolio_theme', appState.theme);
  updateThemeButton();
  showToast(
    appState.lang === 'th' ? 'สลับโหมดสีสำเร็จ' : 'Theme switched successfully',
    'info'
  );
}

function updateThemeButton() {
  const container = document.getElementById('theme-icon-container');
  if (container) {
    const iconName = appState.theme === 'dark' ? 'sun' : 'moon';
    container.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4"></i>`;
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ root: container });
    }
  }
}

// Language Switcher
function toggleLanguage() {
  appState.lang = appState.lang === 'th' ? 'en' : 'th';
  localStorage.setItem('portfolio_lang', appState.lang);
  renderAll();
  showToast(
    appState.lang === 'th' ? 'เปลี่ยนเป็นภาษาไทยแล้ว' : 'Switched to English',
    'info'
  );
}

// Data Initialization
async function initData() {
  try {
    if (!window.portfolioStorage) return;

    const DATA_VERSION = '2.4_custom_portfolio';
    const lastVersion = localStorage.getItem('portfolio_data_version');

    if (lastVersion !== DATA_VERSION) {
      localStorage.setItem('portfolio_data_version', DATA_VERSION);
      if (typeof window.defaultProjects !== 'undefined') {
        appState.projects = [...window.defaultProjects];
        await window.portfolioStorage.saveProjects(appState.projects);
      }
      if (typeof window.defaultCertificates !== 'undefined') {
        appState.certificates = [...window.defaultCertificates];
        await window.portfolioStorage.saveCertificates(appState.certificates);
      }
    } else {
      // Load Projects
      let projects = await window.portfolioStorage.getProjects();
      if (projects && projects.length > 0) {
        appState.projects = projects;
      } else if (typeof window.defaultProjects !== 'undefined') {
        appState.projects = [...window.defaultProjects];
      }

      // Load Certificates
      let certs = await window.portfolioStorage.getCertificates();
      if (certs && certs.length > 0) {
        appState.certificates = certs;
      } else if (typeof window.defaultCertificates !== 'undefined') {
        appState.certificates = [...window.defaultCertificates];
      }
    }

    // Load Profile
    const storedProfile = await window.portfolioStorage.getProfile();
    if (storedProfile) {
      appState.profile = { ...appState.profile, ...storedProfile };
    }
    // Ensure accurate student ambassador details take precedence
    appState.profile.photo = "assets/profile.png";
    appState.profile.name = "วุฒิภัทร ปันพวง";
    appState.profile.nameEn = "Wuttipat Panphuang";
    appState.profile.email = "realwuttipat@gmail.com";
    appState.profile.phone = "094-856-2103";
    appState.profile.gpax = "3.78";
    await window.portfolioStorage.saveProfile(appState.profile);

    // Check stored profile photo override if present
    const storedPhoto = await window.portfolioStorage.getFile('profile_photo');
    if (storedPhoto) {
      appState.profile.photo = storedPhoto;
    }
  } catch (err) {
    console.warn('initData error:', err);
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Lang Toggle
  document.querySelectorAll('.btn-lang-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLanguage);
  });

  // Theme Toggle
  document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Profile Image Upload Trigger
  const profileInput = document.getElementById('profile-file-input');
  const profileUploadBtn = document.getElementById('btn-change-profile-photo');
  if (profileUploadBtn && profileInput) {
    profileUploadBtn.addEventListener('click', () => profileInput.click());
    profileInput.addEventListener('change', handleProfilePhotoUpload);
  }

  // Mobile Island Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavMenu.classList.toggle('hidden');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('#mobile-nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNavMenu) mobileNavMenu.classList.add('hidden');
    });
  });

  // Project Modals
  const btnAddProject = document.getElementById('btn-add-project');
  if (btnAddProject) {
    btnAddProject.addEventListener('click', () => openProjectModal());
  }

  const projectForm = document.getElementById('project-form');
  if (projectForm) {
    projectForm.addEventListener('submit', handleProjectFormSubmit);
  }

  // Certificate Modals
  const btnAddCert = document.getElementById('btn-add-cert');
  if (btnAddCert) {
    btnAddCert.addEventListener('click', () => openCertModal());
  }

  const certForm = document.getElementById('cert-form');
  if (certForm) {
    certForm.addEventListener('submit', handleCertFormSubmit);
  }

  // Project Filter Buttons
  document.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.dataset.filter;
      appState.projectFilter = filter;
      renderProjects();
    });
  });
}

// Render All Components
function renderAll() {
  updateLanguageUI();
  updateThemeButton();
  renderProfile();
  renderEducation();
  renderSkills();
  renderExperience();
  renderProjects();
  renderCertificates();
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

// Multilingual Text Update
function updateLanguageUI() {
  const t = translations[appState.lang];

  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keyPath = el.getAttribute('data-i18n').split('.');
    let value = t;
    for (const key of keyPath) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
    if (value !== null) {
      el.innerText = value;
    }
  });

  // Update elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const keyPath = el.getAttribute('data-i18n-placeholder').split('.');
    let value = t;
    for (const key of keyPath) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
    if (value !== null) {
      el.setAttribute('placeholder', value);
    }
  });

  // Update Language pill text
  const langPills = document.querySelectorAll('.lang-label');
  langPills.forEach(pill => {
    pill.innerText = appState.lang === 'th' ? 'EN' : 'TH';
  });
}

// Section 1: Render Profile & Hero
function renderProfile() {
  const t = translations[appState.lang].hero;
  const nameEl = document.getElementById('profile-name');
  const roleEl = document.getElementById('profile-role');
  const bioEl = document.getElementById('profile-bio');
  const gpaxEl = document.getElementById('profile-gpax');
  const emailEl = document.getElementById('profile-email');
  const phoneEl = document.getElementById('profile-phone');
  const locationEl = document.getElementById('profile-location');
  const avatarEl = document.getElementById('profile-avatar');

  if (nameEl) nameEl.innerText = appState.lang === 'th' ? appState.profile.name : appState.profile.nameEn;
  if (roleEl) roleEl.innerText = t.role;
  if (bioEl) bioEl.innerText = t.bio;
  if (gpaxEl) gpaxEl.innerText = appState.profile.gpax;
  if (emailEl) emailEl.innerText = appState.profile.email;
  if (phoneEl) phoneEl.innerText = appState.profile.phone;
  if (locationEl) locationEl.innerText = appState.lang === 'th' ? appState.profile.location : 'Bangkok, Thailand';

  // Default Cyber Avatar SVG (URL-encoded data URI safe across all browsers)
  const defaultSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2306b6d4'/%3E%3Cstop offset='100%25' stop-color='%2310b981'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='240' height='240' fill='%23030712' rx='36'/%3E%3Ccircle cx='120' cy='95' r='45' fill='url(%23g)'/%3E%3Cpath d='M45 200 C45 155, 80 150, 120 150 C160 150, 195 155, 195 200 Z' fill='url(%23g)'/%3E%3C/svg%3E";

  if (avatarEl) {
    avatarEl.src = appState.profile.photo || 'assets/profile.png';
  }
}

// Profile Photo Upload
async function handleProfilePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    showToast(translations[appState.lang].common.fileTooLarge, 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const base64Data = event.target.result;
    appState.profile.photo = base64Data;
    await window.portfolioStorage.setFile('profile_photo', base64Data);
    await window.portfolioStorage.saveProfile(appState.profile);

    const avatarEl = document.getElementById('profile-avatar');
    if (avatarEl) avatarEl.src = base64Data;

    showToast(translations[appState.lang].common.profilePhotoUpdated, 'success');
  };
  reader.readAsDataURL(file);
}

// Section 2: Education
function renderEducation() {
  const t = translations[appState.lang].education;
  const courseList = document.getElementById('education-courses-list');
  if (!courseList) return;

  courseList.innerHTML = t.courses.map(course => `
    <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
      <div class="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
        <i data-lucide="check" class="w-3 h-3"></i>
      </div>
      <span>${course}</span>
    </li>
  `).join('');
}

// Section 3: Skills (Cyber Bento 4 Categories)
function renderSkills() {
  const skillsData = [
    {
      key: 'languages',
      icon: 'code-2',
      color: 'from-cyan-500 to-blue-500',
      badgeColor: 'border-cyan-500/30 text-cyan-400',
      dotColor: 'bg-cyan-400',
      items: [
        { name: 'JavaScript (ES6+)', level: 'Advanced' },
        { name: 'Python', level: 'Advanced' },
        { name: 'SQL', level: 'Advanced' }
      ]
    },
    {
      key: 'frontend',
      icon: 'layout',
      color: 'from-teal-400 to-emerald-500',
      badgeColor: 'border-teal-500/30 text-teal-400',
      dotColor: 'bg-teal-400',
      items: [
        { name: 'HTML5 & Modern CSS3', level: 'Expert' },
        { name: 'Tailwind CSS', level: 'Expert' },
        { name: 'Responsive Web Design', level: 'Expert' }
      ]
    },
    {
      key: 'backend',
      icon: 'database',
      color: 'from-sky-500 to-indigo-500',
      badgeColor: 'border-sky-500/30 text-sky-400',
      dotColor: 'bg-sky-400',
      items: [
        { name: 'Node.js & Express', level: 'Advanced' },
        { name: 'Cloudflare Workers (Edge)', level: 'Advanced' },
        { name: 'Cloudflare D1 (SQLite)', level: 'Advanced' },
        { name: 'MySQL & PostgreSQL', level: 'Intermediate' }
      ]
    },
    {
      key: 'tools',
      icon: 'cpu',
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'border-emerald-500/30 text-emerald-400',
      dotColor: 'bg-emerald-400',
      items: [
        { name: 'Git & GitHub', level: 'Advanced' },
        { name: 'Cloudflare Pages & DNS', level: 'Advanced' },
        { name: 'Docker (Fundamentals)', level: 'Intermediate' },
        { name: 'Figma UI/UX Design', level: 'Advanced' },
        { name: 'VS Code & Linux CLI', level: 'Advanced' }
      ]
    }
  ];

  const container = document.getElementById('skills-grid-container');
  if (!container) return;

  const t = translations[appState.lang].skills.categories;

  container.innerHTML = skillsData.map(group => `
    <div class="bento-card rounded-2xl p-6 relative overflow-hidden group">
      <div class="absolute -right-8 -bottom-8 w-28 h-28 bg-gradient-to-br ${group.color} opacity-10 rounded-full blur-2xl group-hover:opacity-25 transition-opacity"></div>
      
      <div class="flex items-center gap-3.5 mb-4">
        <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
          <i data-lucide="${group.icon}" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="font-bold text-base sm:text-lg text-slate-800 dark:text-white">${t[group.key]}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">${t[group.key + 'Desc']}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 pt-2">
        ${group.items.map(item => `
          <div class="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full ${group.dotColor}"></span>
            <span>${item.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Section 4: Experience
function renderExperience() {
  const container = document.getElementById('experience-timeline-container');
  const stem = document.getElementById('experience-stem');
  if (!container) return;

  const expData = translations[appState.lang].experience;
  const items = expData.items || [];

  if (items.length === 0) {
    if (stem) stem.classList.add('hidden');
    container.innerHTML = `
      <div class="bento-card rounded-3xl p-10 sm:p-14 text-center max-w-2xl mx-auto flex flex-col items-center justify-center relative overflow-hidden">
        <div class="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/10">
          <i data-lucide="briefcase" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2">
          ${expData.emptyTitle}
        </h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
          ${expData.emptyDesc}
        </p>
        <div class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>พร้อมรับโอกาสฝึกงาน (Available for Tech Internship)</span>
        </div>
      </div>
    `;
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons({ root: container });
    }
    return;
  }

  if (stem) stem.classList.remove('hidden');
  container.innerHTML = items.map((item, index) => `
    <div class="relative flex flex-col md:flex-row items-start mb-10 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}">
      <!-- Timeline Node Dot -->
      <div class="absolute left-5 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/30 z-10 ring-4 ring-white dark:ring-slate-950 group-hover:scale-110 transition-transform">
        <i data-lucide="briefcase" class="w-4 h-4"></i>
      </div>

      <!-- Content Box -->
      <div class="w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pl-10 text-left' : 'md:pr-10 text-left md:text-right'}">
        <div class="bento-card p-6 rounded-2xl inline-block w-full">
          <div class="flex flex-wrap items-center gap-2 mb-2 ${index % 2 === 0 ? '' : 'md:justify-end'}">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25">
              ${item.period}
            </span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
              ${item.type}
            </span>
          </div>

          <h3 class="text-lg font-bold text-slate-800 dark:text-white group-hover:text-cyan-400 transition-colors">
            ${item.role}
          </h3>
          <p class="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">
            ${item.company}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            ${item.desc}
          </p>

          <div class="flex flex-wrap gap-1.5 ${index % 2 === 0 ? '' : 'md:justify-end'}">
            ${item.tags.map(tag => `
              <span class="px-2 py-0.5 text-xs rounded bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 font-mono">
                #${tag}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Section 5: Projects
function renderProjects() {
  const container = document.getElementById('projects-grid-container');
  const emptyState = document.getElementById('projects-empty-state');
  if (!container) return;

  // Filter Projects
  const filtered = appState.projects.filter(p => {
    if (appState.projectFilter === 'All') return true;
    return p.category === appState.projectFilter;
  });

  // Update Filter Button Styles (Cyber Teal & Emerald)
  document.querySelectorAll('.project-filter-btn').forEach(btn => {
    if (btn.dataset.filter === appState.projectFilter) {
      btn.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all';
    } else {
      btn.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 transition-all';
    }
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const t = translations[appState.lang].projects;

  container.innerHTML = filtered.map(project => {
    const title = typeof project.title === 'object' ? (project.title[appState.lang] || project.title.th || project.title.en) : project.title;
    const desc = typeof project.description === 'object' ? (project.description[appState.lang] || project.description.th || project.description.en) : project.description;
    const techList = Array.isArray(project.tech) ? project.tech : (project.tech || '').split(',').map(s => s.trim());

    return `
      <div class="bento-card rounded-2xl overflow-hidden flex flex-col group relative">
        <!-- Project Image Container -->
        <div class="relative h-48 w-full overflow-hidden bg-slate-900">
          <img 
            src="${project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}" 
            alt="${title}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            id="proj-img-${project.id}"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
          
          <!-- Category Badge -->
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-600 text-slate-950 backdrop-blur-md shadow-md">
              ${project.category}
            </span>
          </div>

          <!-- Quick Image Upload Button -->
          <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <label class="cursor-pointer px-2.5 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-lg transition-all" title="${t.btnChangeImg}">
              <i data-lucide="camera" class="w-3.5 h-3.5 text-cyan-400"></i>
              <span>${t.btnChangeImg}</span>
              <input type="file" accept="image/*" class="hidden" onchange="handleProjectImageDirectUpload('${project.id}', this)" />
            </label>
          </div>
        </div>

        <!-- Project Details Body -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
              ${title}
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
              ${desc}
            </p>
            
            <!-- Tech Badges -->
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${techList.map(item => `
                <span class="px-2.5 py-1 text-xs rounded-lg font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                  ${item}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Actions Footer -->
          <div class="pt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-2">
              ${project.demoUrl ? `
                <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 flex items-center gap-1.5 shadow-sm transition-all">
                  <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                  <span>${t.btnViewDemo}</span>
                </a>
              ` : ''}
              ${project.repoUrl ? `
                <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors" title="${t.btnSource}">
                  <i data-lucide="github" class="w-4 h-4"></i>
                </a>
              ` : ''}
            </div>

            <!-- CRUD Action Buttons -->
            <div class="flex items-center gap-1">
              <button onclick="editProject('${project.id}')" class="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors" title="${t.btnEdit}">
                <i data-lucide="edit-3" class="w-4 h-4"></i>
              </button>
              <button onclick="deleteProject('${project.id}')" class="p-2 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors" title="${t.btnDelete}">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Project Direct Image Upload
async function handleProjectImageDirectUpload(projectId, input) {
  const file = input.files[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    showToast(translations[appState.lang].common.fileTooLarge, 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const dataUrl = event.target.result;
    const project = appState.projects.find(p => p.id === projectId);
    if (project) {
      project.image = dataUrl;
      await window.portfolioStorage.setFile(`proj_img_${projectId}`, dataUrl);
      await window.portfolioStorage.saveProjects(appState.projects);
      renderProjects();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
      showToast(translations[appState.lang].common.uploadSuccess, 'success');
    }
  };
  reader.readAsDataURL(file);
}

// Project Modal Open
function openProjectModal(projectId = null) {
  appState.editingProjectId = projectId;
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('project-modal-title');
  const t = translations[appState.lang].projects;

  const titleInput = document.getElementById('proj-title');
  const categoryInput = document.getElementById('proj-category');
  const descInput = document.getElementById('proj-desc');
  const techInput = document.getElementById('proj-tech');
  const demoInput = document.getElementById('proj-demo');
  const repoInput = document.getElementById('proj-repo');
  const imagePreview = document.getElementById('proj-image-preview');

  if (projectId) {
    const p = appState.projects.find(item => item.id === projectId);
    if (p) {
      modalTitle.innerText = t.modalEditTitle;
      titleInput.value = typeof p.title === 'object' ? (p.title[appState.lang] || p.title.th) : p.title;
      categoryInput.value = p.category;
      descInput.value = typeof p.description === 'object' ? (p.description[appState.lang] || p.description.th) : p.description;
      techInput.value = Array.isArray(p.tech) ? p.tech.join(', ') : p.tech;
      demoInput.value = p.demoUrl || '';
      repoInput.value = p.repoUrl || '';
      imagePreview.src = p.image || '';
      imagePreview.classList.remove('hidden');
    }
  } else {
    modalTitle.innerText = t.modalAddTitle;
    document.getElementById('project-form').reset();
    imagePreview.classList.add('hidden');
    imagePreview.src = '';
  }

  modal.classList.remove('hidden');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.add('hidden');
  appState.editingProjectId = null;
}

// Project Form Submit Handler
async function handleProjectFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('proj-title').value.trim();
  const category = document.getElementById('proj-category').value;
  const description = document.getElementById('proj-desc').value.trim();
  const techStr = document.getElementById('proj-tech').value.trim();
  const demoUrl = document.getElementById('proj-demo').value.trim();
  const repoUrl = document.getElementById('proj-repo').value.trim();
  const imageFile = document.getElementById('proj-image-file').files[0];

  const tech = techStr.split(',').map(s => s.trim()).filter(Boolean);

  let imageUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';

  if (appState.editingProjectId) {
    const existing = appState.projects.find(p => p.id === appState.editingProjectId);
    if (existing) imageUrl = existing.image;
  }

  if (imageFile) {
    const base64 = await readFileAsDataUrl(imageFile);
    imageUrl = base64;
  }

  if (appState.editingProjectId) {
    // Update
    const idx = appState.projects.findIndex(p => p.id === appState.editingProjectId);
    if (idx !== -1) {
      appState.projects[idx] = {
        ...appState.projects[idx],
        title: { th: title, en: title },
        category,
        description: { th: description, en: description },
        tech,
        demoUrl,
        repoUrl,
        image: imageUrl
      };
    }
  } else {
    // Create
    const newProject = {
      id: 'proj-' + Date.now(),
      title: { th: title, en: title },
      category,
      description: { th: description, en: description },
      tech,
      demoUrl,
      repoUrl,
      image: imageUrl
    };
    appState.projects.unshift(newProject);
  }

  await window.portfolioStorage.saveProjects(appState.projects);
  closeProjectModal();
  renderProjects();
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
  showToast(translations[appState.lang].common.projectSaved, 'success');
}

window.editProject = (id) => openProjectModal(id);

window.deleteProject = async (id) => {
  const confirmMsg = translations[appState.lang].projects.deleteConfirm;
  if (confirm(confirmMsg)) {
    appState.projects = appState.projects.filter(p => p.id !== id);
    await window.portfolioStorage.saveProjects(appState.projects);
    renderProjects();
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
    showToast(translations[appState.lang].common.projectDeleted, 'info');
  }
};

// Section 6: Certifications
function renderCertificates() {
  const container = document.getElementById('certs-grid-container');
  const emptyState = document.getElementById('certs-empty-state');
  if (!container) return;

  if (appState.certificates.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  const t = translations[appState.lang].certifications;

  container.innerHTML = appState.certificates.map(cert => {
    const title = typeof cert.title === 'object' ? (cert.title[appState.lang] || cert.title.th || cert.title.en) : cert.title;

    return `
      <div class="bento-card rounded-2xl p-6 flex flex-col justify-between group">
        <div>
          <!-- Certificate Header -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <i data-lucide="award" class="w-5 h-5"></i>
            </div>
            
            <!-- Quick Actions -->
            <div class="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <button onclick="editCert('${cert.id}')" class="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors" title="${t.btnEdit}">
                <i data-lucide="edit-3" class="w-4 h-4"></i>
              </button>
              <button onclick="deleteCert('${cert.id}')" class="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors" title="${t.btnDelete}">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <h3 class="text-base sm:text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
            ${title}
          </h3>

          <p class="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            ${cert.issuer}
          </p>

          <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span><i data-lucide="calendar" class="w-3.5 h-3.5 inline mr-1 text-cyan-500"></i>${cert.date}</span>
            <span>•</span>
            <span class="font-mono bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-white/5 text-[11px]">${cert.credentialId}</span>
          </div>
        </div>

        <!-- PDF Buttons & Attachment -->
        <div class="pt-4 border-t border-slate-200/50 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
          <!-- View PDF Button -->
          <button 
            onclick="viewCertificatePdf('${cert.id}')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <i data-lucide="file-text" class="w-4 h-4"></i>
            <span>${t.btnViewPdf}</span>
          </button>

          <!-- Attach PDF File input -->
          <label class="cursor-pointer px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.15] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 flex items-center gap-1.5 transition-all">
            <i data-lucide="paperclip" class="w-4 h-4 text-cyan-400"></i>
            <span>${t.btnAttachPdf}</span>
            <input type="file" accept=".pdf" class="hidden" onchange="handleCertPdfDirectUpload('${cert.id}', this)" />
          </label>
        </div>
      </div>
    `;
  }).join('');
}

// Certificate Direct PDF Upload
async function handleCertPdfDirectUpload(certId, input) {
  const file = input.files[0];
  if (!file) return;

  if (file.size > 15 * 1024 * 1024) {
    showToast(translations[appState.lang].common.fileTooLarge, 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const dataUrl = event.target.result;
    const cert = appState.certificates.find(c => c.id === certId);
    if (cert) {
      cert.pdfData = dataUrl;
      cert.pdfName = file.name;
      await window.portfolioStorage.setFile(`cert_pdf_${certId}`, dataUrl);
      await window.portfolioStorage.saveCertificates(appState.certificates);
      renderCertificates();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
      showToast(translations[appState.lang].common.pdfAttached, 'success');
    }
  };
  reader.readAsDataURL(file);
}

// Certificate Modal Open
function openCertModal(certId = null) {
  appState.editingCertId = certId;
  const modal = document.getElementById('cert-modal');
  const modalTitle = document.getElementById('cert-modal-title');
  const t = translations[appState.lang].certifications;

  const titleInput = document.getElementById('cert-title');
  const issuerInput = document.getElementById('cert-issuer');
  const dateInput = document.getElementById('cert-date');
  const credInput = document.getElementById('cert-cred-id');
  const pdfNameDisplay = document.getElementById('cert-pdf-name-display');

  if (certId) {
    const c = appState.certificates.find(item => item.id === certId);
    if (c) {
      modalTitle.innerText = t.modalEditTitle;
      titleInput.value = typeof c.title === 'object' ? (c.title[appState.lang] || c.title.th) : c.title;
      issuerInput.value = c.issuer;
      dateInput.value = c.date;
      credInput.value = c.credentialId;
      if (c.pdfName) {
        pdfNameDisplay.innerText = c.pdfName;
        pdfNameDisplay.classList.remove('hidden');
      } else {
        pdfNameDisplay.classList.add('hidden');
      }
    }
  } else {
    modalTitle.innerText = t.modalAddTitle;
    document.getElementById('cert-form').reset();
    pdfNameDisplay.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) modal.classList.add('hidden');
  appState.editingCertId = null;
}

// Certificate Form Submit
async function handleCertFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('cert-title').value.trim();
  const issuer = document.getElementById('cert-issuer').value.trim();
  const date = document.getElementById('cert-date').value;
  const credentialId = document.getElementById('cert-cred-id').value.trim();
  const pdfFile = document.getElementById('cert-pdf-file').files[0];

  let pdfData = null;
  let pdfName = null;

  if (appState.editingCertId) {
    const existing = appState.certificates.find(c => c.id === appState.editingCertId);
    if (existing) {
      pdfData = existing.pdfData;
      pdfName = existing.pdfName;
    }
  }

  if (pdfFile) {
    if (pdfFile.size > 15 * 1024 * 1024) {
      showToast(translations[appState.lang].common.fileTooLarge, 'error');
      return;
    }
    pdfData = await readFileAsDataUrl(pdfFile);
    pdfName = pdfFile.name;
  }

  if (appState.editingCertId) {
    // Update
    const idx = appState.certificates.findIndex(c => c.id === appState.editingCertId);
    if (idx !== -1) {
      appState.certificates[idx] = {
        ...appState.certificates[idx],
        title: { th: title, en: title },
        issuer,
        date,
        credentialId,
        pdfData,
        pdfName
      };
      if (pdfData) {
        await window.portfolioStorage.setFile(`cert_pdf_${appState.editingCertId}`, pdfData);
      }
    }
  } else {
    // Create
    const newId = 'cert-' + Date.now();
    const newCert = {
      id: newId,
      title: { th: title, en: title },
      issuer,
      date,
      credentialId,
      pdfData,
      pdfName: pdfName || 'Certificate_Document.pdf'
    };
    if (pdfData) {
      await window.portfolioStorage.setFile(`cert_pdf_${newId}`, pdfData);
    }
    appState.certificates.unshift(newCert);
  }

  await window.portfolioStorage.saveCertificates(appState.certificates);
  closeCertModal();
  renderCertificates();
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
  showToast(translations[appState.lang].common.certSaved, 'success');
}

window.editCert = (id) => openCertModal(id);

window.deleteCert = async (id) => {
  const confirmMsg = translations[appState.lang].certifications.deleteConfirm;
  if (confirm(confirmMsg)) {
    appState.certificates = appState.certificates.filter(c => c.id !== id);
    await window.portfolioStorage.saveCertificates(appState.certificates);
    await window.portfolioStorage.removeFile(`cert_pdf_${id}`);
    renderCertificates();
    if (window.lucide && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
    showToast(translations[appState.lang].common.certDeleted, 'info');
  }
};

// View Certificate PDF Viewer
async function viewCertificatePdf(certId) {
  const cert = appState.certificates.find(c => c.id === certId);
  if (!cert) return;

  let pdfData = cert.pdfData || cert.pdfUrl;
  if (!pdfData) {
    pdfData = await window.portfolioStorage.getFile(`cert_pdf_${certId}`);
  }

  const modal = document.getElementById('pdf-viewer-modal');
  const modalTitle = document.getElementById('pdf-viewer-title');
  const iframeContainer = document.getElementById('pdf-viewer-frame-container');
  const openNewTabBtn = document.getElementById('pdf-open-new-tab');

  const title = typeof cert.title === 'object' ? (cert.title[appState.lang] || cert.title.th) : cert.title;
  modalTitle.innerText = `${title} - ${cert.issuer}`;

  if (!pdfData) {
    const certSvgPreview = createSvgCertificateDataUrl(cert);
    iframeContainer.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl overflow-auto">
        <img src="${certSvgPreview}" class="max-h-[70vh] rounded-lg shadow-2xl border border-white/20" alt="Certificate Preview" />
        <p class="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
          <i data-lucide="info" class="w-4 h-4 text-cyan-400"></i>
          <span>${translations[appState.lang].certifications.noPdfAlert}</span>
        </p>
      </div>
    `;
    openNewTabBtn.onclick = () => {
      const win = window.open();
      win.document.write(`<iframe src="${certSvgPreview}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
    };
  } else {
    iframeContainer.innerHTML = `
      <object data="${pdfData}" type="application/pdf" class="w-full h-[75vh] rounded-xl border border-white/10 shadow-inner">
        <embed src="${pdfData}" type="application/pdf" class="w-full h-[75vh]" />
        <div class="p-8 text-center text-slate-400">
          <p class="mb-4">เบราว์เซอร์ไม่รองรับการแสดงตัวอย่าง PDF ในตัวหน้านี้</p>
          <a href="${pdfData}" download="${cert.pdfName || 'certificate.pdf'}" class="px-4 py-2 bg-cyan-600 text-white rounded-lg inline-block">ดาวน์โหลดไฟล์ PDF</a>
        </div>
      </object>
    `;
    openNewTabBtn.onclick = () => {
      window.open(pdfData, '_blank');
    };
  }

  modal.classList.remove('hidden');
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

function closePdfModal() {
  const modal = document.getElementById('pdf-viewer-modal');
  if (modal) modal.classList.add('hidden');
}

// Generate Cyber Styled SVG Certificate
function createSvgCertificateDataUrl(cert) {
  const title = typeof cert.title === 'object' ? (cert.title.en || cert.title.th) : cert.title;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="630" viewBox="0 0 900 630">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#030712"/>
          <stop offset="50%" stop-color="#082f49"/>
          <stop offset="100%" stop-color="#022c22"/>
        </linearGradient>
        <linearGradient id="cyberBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4"/>
          <stop offset="50%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="900" height="630" fill="url(#bg)"/>
      <rect x="30" y="30" width="840" height="570" fill="none" stroke="url(#cyberBorder)" stroke-width="3" rx="16"/>
      <rect x="42" y="42" width="816" height="546" fill="none" stroke="rgba(6,182,212,0.15)" stroke-width="1" rx="10"/>

      <circle cx="450" cy="115" r="38" fill="url(#cyberBorder)" opacity="0.9"/>
      <text x="450" y="123" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="bold" fill="#030712" text-anchor="middle">★ SPU ★</text>
      
      <text x="450" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="#22d3ee" text-anchor="middle" letter-spacing="4">CERTIFICATE OF RECOGNITION</text>
      <text x="450" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">THIS IS PROUDLY PRESENTED TO</text>
      
      <text x="450" y="295" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="bold" fill="#ffffff" text-anchor="middle">Wuttipat Panphuang</text>
      <line x1="280" y1="315" x2="620" y2="315" stroke="url(#cyberBorder)" stroke-width="2"/>
      
      <text x="450" y="350" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">FOR SUCCESSFULLY ACHIEVING PROFICIENCY IN</text>
      <text x="450" y="390" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="700" fill="#38bdf8" text-anchor="middle">${title}</text>
      
      <text x="450" y="430" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">Issued by: ${cert.issuer}</text>
      
      <text x="160" y="520" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#94a3b8">Date: ${cert.date}</text>
      <text x="160" y="540" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#64748b">Credential ID: ${cert.credentialId}</text>
      
      <text x="740" y="520" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#94a3b8" text-anchor="end">Sripatum University</text>
      <text x="740" y="540" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#64748b" text-anchor="end">Faculty of Information Technology (ICT)</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Toast Notifications
function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeIcons = {
    success: 'check-circle',
    error: 'alert-circle',
    info: 'info'
  };

  const typeBorders = {
    success: 'border-emerald-500/40 text-emerald-400',
    error: 'border-rose-500/40 text-rose-400',
    info: 'border-cyan-500/40 text-cyan-400'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 backdrop-blur-xl border ${typeBorders[type]} shadow-2xl text-slate-100 text-sm transition-all transform translate-y-4 opacity-0 pointer-events-auto`;
  toast.innerHTML = `
    <i data-lucide="${typeIcons[type]}" class="w-5 h-5 flex-shrink-0"></i>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons({ root: toast });
  }

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// Helper: Read File as Data URL
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

// ScrollSpy Navigation Highlight for Floating Top Navbar
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav-link-active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('nav-link-active');
      }
    });
  });
}

// Copy to Clipboard Helper
window.copyToClipboard = (text, message = 'Copied to clipboard!') => {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message, 'success');
  });
};

// Expose globals for HTML inline onclicks
window.toggleLanguage = toggleLanguage;
window.toggleTheme = toggleTheme;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;
window.viewCertificatePdf = viewCertificatePdf;
window.closePdfModal = closePdfModal;
window.handleProfilePhotoUpload = handleProfilePhotoUpload;
window.handleProjectImageDirectUpload = handleProjectImageDirectUpload;
window.handleCertPdfDirectUpload = handleCertPdfDirectUpload;
window.showToast = showToast;
