/**
 * ITFair Extension - Structural Content Interface Templates
 * Clean-built, Human-Readable UI Template Definitions
 */

// Native localization utility dictionary mapping interface string variables
const uiLocalizationStrings = {
  en: {
    "tab.prompt": "Prompts Workspace",
    "tab.history": "Version Records",
    "prompt.label": "Quick System Prompts",
    "prompt.desc": "Choose an automated engineering framework action template to overlay onto your sandbox codebase layout.",
    "sync.waiting": "Synchronizing sandbox contexts...",
    "btn.attach": "Inject Template",
    "btn.optimize": "Refactor Architecture",
    "license.title": "Account Authorization Gate",
    "license.desc": "Please input your extension registration system code token to unlock high-speed architectural prompts access.",
    "shortcut.title": "Global Hotkey Controls",
    "shortcut.desc": "Press (Ctrl + Shift + P) or target alternative mapped system shortcut commands to open or minimize this dashboard tool."
  },
  bn: {
    "tab.prompt": "প্রম্পট ওয়ার্কস্পেস",
    "tab.history": "সংস্করণ রেকর্ড",
    "prompt.label": "কুইক সিস্টেম প্রম্পট",
    "prompt.desc": "আপনার স্যান্ডবক্স কোডবেস লেআউটে ওভারলে করার জন্য একটি স্বয়ংক্রিয় প্রকৌশল ফ্রেমওয়ার্ক অ্যাকশন টেমপ্লেট চয়ন করুন।",
    "sync.waiting": "স্যান্ডবক্স সিঙ্ক করা হচ্ছে...",
    "btn.attach": "টেমপ্লেট ইনজেক্ট করুন",
    "btn.optimize": "আর্কিটেকচার রিফ্যাক্টর",
    "license.title": "অ্যাকাউন্ট অনুমোদন গেট",
    "license.desc": "উচ্চ গতির আর্কিটেকচারাল প্রম্পট অ্যাক্সেস আনলক করতে অনুগ্রহ করে আপনার এক্সটেনশন রেজিস্ট্রেশন সিস্টেম কোড টোকেন ইনপুট করুন।",
    "shortcut.title": "গ্লোবাল হটকি কন্ট্রোল",
    "shortcut.desc": "এই ড্যাশবোর্ড টুলটি খুলতে বা মিনিমাইজ করতে (Ctrl + Shift + P) চাপুন বা বিকল্প ম্যাপ করা সিস্টেম শর্টকাট কমান্ডগুলি লক্ষ্য করুন।"
  }
};

// Auto-detect browser context localization profile
const activeSystemLang = (navigator.language || "en").startsWith("bn") ? "bn" : "en";

/**
 * Localized String Lookup Interface Resolution Method
 */
function t(key) {
  const dictionary = uiLocalizationStrings[activeSystemLang] || uiLocalizationStrings["en"];
  return dictionary[key] || key;
}

/**
 * Escapes characters to clean text formatting rules
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Global SVG Asset Library definitions linked directly by layout views
const SVG_ICONS = {
  wrench: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  history: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  sparkles: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3h4"/><path d="M19 19h4"/></svg>`,
  search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  mic: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v10"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="23"/></svg>`,
  close: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
};

// Engineering Framework Predefined Prompt Configurations
const PROMPT_TEMPLATES = [
  {
    icon: SVG_ICONS.wrench,
    label: "Boilerplate Setup",
    prompt: "Generate a scalable, industry-standard microservice boilerplate configuration pattern using clean separation layers."
  },
  {
    icon: SVG_ICONS.edit,
    label: "Refactor Logic",
    prompt: "Analyze the active workspace tracking module selection logic and refactor complex blocks to improve read processing speeds."
  },
  {
    icon: SVG_ICONS.sparkles,
    label: "Optimize DB Indexing",
    prompt: "Formulate strategic primary index mappings to eliminate parsing bottlenecks inside database execution paths."
  }
];

/**
 * Template View Generator: License Request Verification Screen
 */
function templateLicenseGate(showLanguageSelector = true) {
  const langSwapBtn = showLanguageSelector ? `<button id="ql-lang-swap" class="ql-lang-btn">🇧🇩 / 🇺🇸</button>` : '';
  
  return `
    <div id="ql-license-gate" class="ql-gate-container">
      <div class="ql-gate-header">
        <span class="ql-brand-title">ITFair Workspace Controller</span>
        ${langSwapBtn}
      </div>
      <div class="ql-gate-body">
        <div class="ql-logo-wrapper">
          <img src="${chrome.runtime.getURL('logo-square.png')}" alt="ITFair Core Logo" class="ql-gate-logo">
        </div>
        <h2 class="ql-gate-title">${t('license.title')}</h2>
        <p class="ql-gate-desc">${t('license.desc')}</p>
        <div class="ql-input-field">
          <input type="text" id="ql-license-input" placeholder="CIT-XXXX-XXXX-XXXX-XXXX" spellcheck="false" autocomplete="off">
        </div>
        <button id="ql-validate-btn" class="ql-primary-btn">
          <span>Verifying Credentials...</span>
        </button>
        <div id="cit-license-log" class="ql-log-feedback"></div>
      </div>
    </div>
  `;
}

/**
 * Template View Generator: Primary Workspace Console Dashboard Panel Layout
 */
function templateMainUI(profileName = "Educator Profile", storedPromptsMarkup = "", isSyncingActive = false) {
  const syncingClass = isSyncingActive ? "ql-sync-active" : "";
  const loadingStatusText = isSyncingActive ? t('sync.waiting') : "System Ready";
  
  // Render quick target command buttons from prompt asset mappings
  const promptsGridItems = PROMPT_TEMPLATES.map(p => `
    <button class="ql-prompt-card-item" data-prompt-value="${escapeHtml(p.prompt)}">
      <div class="ql-card-icon-slot">${p.icon}</div>
      <span class="ql-card-label-text">${p.label}</span>
    </button>
  `).join('');

  return `
    <div id="ql-main-console" class="ql-dashboard-layout ${syncingClass}">
      <!-- Top Action Navigation Header -->
      <div class="ql-console-header">
        <div class="ql-header-left">
          <img src="${chrome.runtime.getURL('logo-square.png')}" class="ql-mini-logo" alt="ITFair Mini Logo">
          <span class="ql-profile-name-tag">${escapeHtml(profileName)}</span>
          <span class="ql-badge-premium-tier">PRO</span>
        </div>
        <div class="ql-header-right">
          <button id="ql-refresh-sync" class="ql-icon-nav-btn" title="Resync Project Context">
            ${SVG_ICONS.search}
          </button>
          <button id="ql-theme-toggle" class="ql-icon-nav-btn" title="Toggle Appearance Profile">
            ${SVG_ICONS.sparkles}
          </button>
          <button id="ql-minimize-panel" class="ql-icon-nav-btn" title="Minimize Control Panel">
            ${SVG_ICONS.close}
          </button>
        </div>
      </div>

      <!-- Live Sync Status Pipeline Feed Tracker -->
      <div class="ql-sync-status-bar">
        <span class="ql-sync-indicator-dot"></span>
        <span class="ql-sync-status-message">${loadingStatusText}</span>
        <span id="cit-countdown-clock" class="ql-license-expiration-countdown"></span>
      </div>

      <!-- Core Content Tab Views Context -->
      <div class="ql-console-body-scroll-container">
        <!-- Prompts Discovery Section Panel View Block -->
        <div class="ql-tab-panel-view active" id="ql-tab-prompts-view">
          <p class="ql-section-instruction-text">${t('prompt.desc')}</p>
          <div class="ql-prompts-action-grid-layout">
            ${promptsGridItems}
          </div>
          
          <div class="ql-input-textarea-wrapper">
            <textarea id="ql-custom-prompt-input" placeholder="Type or select custom framework code prompts adjustments..."></textarea>
            <button id="ql-submit-prompt-btn" class="ql-action-send-btn" title="Send Context Frame">
              <span>Execute Engineering Prompts Context</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Help & Diagnostics Mappings Toolbar -->
      <div class="ql-console-footer-toolbar">
        <div class="ql-footer-left">
          <span class="ql-version-build-label">v3.8.5 unpacked</span>
        </div>
        <div class="ql-footer-right">
          <a href="https://wa.me/8801788258000" target="_blank" class="ql-support-link-item">
            <span>Contact System Admin</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Template View Generator: License Expiration Feedback Intercept Alert Window Overlay Screen
 */
function templateExpiredOverlay() {
  return `
    <div id="ql-expired-screen-lock" class="ql-modal-overlay-backdrop">
      <div class="ql-sweetalert-modal-card animate-popup-mount">
        <div class="ql-sweetalert-icon-warning-slot">
          <span style="font-size: 48px; color: #f59e0b; line-height: 1;">⚠️</span>
        </div>
        <h3 class="ql-sweetalert-modal-title">Registration Status Reset Required</h3>
        <p class="ql-sweetalert-modal-message-body">Your workspace authentication lifecycle profile has timed out. Please input a valid registration account index token key code sequence to continue operations workflow tracking access logs.</p>
        <div class="ql-modal-action-btn-row">
          <button id="ql-expired-reset-trigger" class="ql-modal-primary-action-btn">Re-Authenticate Profile Identity</button>
        </div>
      </div>
    </div>
  `;
}

// Expose definitions explicitly to global scope targets
if (typeof window !== 'undefined') {
  window.SVG_ICONS = SVG_ICONS;
  window.PROMPT_TEMPLATES = PROMPT_TEMPLATES;
  window.templateLicenseGate = templateLicenseGate;
  window.templateMainUI = templateMainUI;
  window.templateExpiredOverlay = templateExpiredOverlay;
}