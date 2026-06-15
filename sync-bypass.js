/**
 * ITFair Extension - Synchronous Bypass & Error Handler
 * Intercepts and handles obfuscated sidepanel.js errors
 * Must load FIRST before any other scripts
 */

(function() {
  console.log("[ITFair Sync Bypass] Initializing protection layer...");

  // 1. GLOBAL STATE
  const state = {
    protected: true,
    errors: [],
    licenseReady: false
  };

  // 2. COMPREHENSIVE LICENSE ENGINE - Ready immediately
  const licenseEngine = {
    check: (cb) => {
      const res = { valid: true, success: true, status: 'active', isEducational: true };
      if (typeof cb === 'function') cb(res);
      return res;
    },
    checkStored: (cb) => {
      const res = { valid: true, status: 'active' };
      if (typeof cb === 'function') cb(res);
      return res;
    },
    checkStoredLicense: (cb) => {
      const res = { valid: true };
      if (typeof cb === 'function') cb(res);
      return res;
    },
    validate: (key, cb) => {
      const res = { valid: true, success: true };
      if (typeof cb === 'function') cb(res);
      return res;
    },
    mountCountdown: (el) => {
      if (el) {
        el.textContent = '';
        el.style.display = 'none';
      }
    },
    isValid: () => true,
    isRestricted: () => false,
    getStatus: () => 'active',
    requiresKey: () => false,
    canUseAllFeatures: () => true,
    showLicensePrompt: () => false,
    requiresLicense: () => false,
    isExpired: () => false,
    check_license: (cb) => { if (typeof cb === 'function') cb({ valid: true }); return { valid: true }; }
  };

  // 3. GLOBAL BINDINGS - All possible names
  window.CIT_LICENSE = licenseEngine;
  window.citLicense = licenseEngine;
  window.cit_license = licenseEngine;
  window.license = licenseEngine;
  window.licenseEngine = licenseEngine;
  window.CIT_EDUCATIONAL_MODE = true;
  window.CIT_EDUCATIONAL_BYPASS = true;

  // 4. CREATE SAFE PROXY FOR DYNAMIC PROPERTY ACCESS
  const createSafeProxy = (target) => {
    return new Proxy(target, {
      get(t, prop) {
        const val = t[prop];
        if (typeof val === 'function') {
          return val.bind(t);
        }
        if (typeof val === 'object' && val !== null) {
          return createSafeProxy(val);
        }
        return val || licenseEngine;
      },
      has() {
        return true;
      }
    });
  };

  window.CIT_LICENSE = createSafeProxy(licenseEngine);

  // 5. CHROME RUNTIME MESSAGE HANDLER - Respond to ALL checks
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[ITFair Sync Bypass] Message:", message?.action || 'unknown');
    
    try {
      if (!message) {
        sendResponse({ success: false });
        return false;
      }

      // License checks
      if (message.action === 'checkLicense' || 
          message.action === 'check' || 
          message.action === 'getLicense' ||
          message.action === 'syncStatus' ||
          message.action === 'validate' ||
          message.action === 'license_checked') {
        
        sendResponse({
          valid: true,
          success: true,
          status: 'active',
          isEducational: true,
          synced: true
        });
        return true;
      }

      // Sync requests
      if (message.action === 'sync' || message.action === 'synchronize') {
        sendResponse({
          synced: true,
          status: 'active',
          valid: true
        });
        return true;
      }

      // Open side panel
      if (message.action === 'openSidePanel') {
        if (sender.tab?.id && chrome.sidePanel?.open) {
          chrome.sidePanel.open({ tabId: sender.tab.id })
            .then(() => sendResponse({ success: true }))
            .catch(() => sendResponse({ success: false }));
          return true;
        }
        sendResponse({ success: false });
        return false;
      }

      // Proxy fetch
      if (message.action === 'proxyFetch') {
        (async () => {
          try {
            const res = await fetch(message.url, {
              method: message.method || 'GET',
              headers: message.headers || {}
            });
            const data = await res.json();
            sendResponse({ ok: res.ok, status: res.status, data });
          } catch (err) {
            sendResponse({ ok: false, status: 0, error: err.message });
          }
        })();
        return true;
      }

      // Default
      sendResponse({ success: true, protected: true });
      return true;

    } catch (err) {
      console.error("[ITFair Sync Bypass] Message handler error:", err);
      sendResponse({ error: err.message });
      return true;
    }
  });

  // 6. WRAP GLOBAL ERROR HANDLER
  const originalErrorHandler = window.onerror;
  window.onerror = function(msg, url, lineNo, colNo, error) {
    if (msg && msg.includes('is not a function')) {
      console.warn("[ITFair Sync Bypass] Function error suppressed:", msg);
      state.errors.push({ msg, lineNo, colNo });
      // Don't propagate error
      return true;
    }
    if (typeof originalErrorHandler === 'function') {
      return originalErrorHandler(msg, url, lineNo, colNo, error);
    }
  };

  // 7. PROMISE REJECTION HANDLER
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('is not a function')) {
      console.warn("[ITFair Sync Bypass] Promise rejection suppressed");
      event.preventDefault();
    }
  });

  // 8. DOM READINESS CHECK
  const cleanupUI = () => {
    // Hide license countdown
    const countdown = document.getElementById('sp-license-countdown');
    if (countdown) countdown.style.display = 'none';

    // Hide sync status messages
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent) {
        const text = el.textContent.toLowerCase();
        if (text.includes('aguardando') || text.includes('waiting') || text.includes('sincronizando')) {
          el.style.display = 'none';
        }
      }
    });

    // Remove disabled attributes
    document.querySelectorAll('button[disabled]').forEach(btn => {
      btn.removeAttribute('disabled');
    });
  };

  // 9. DOM OBSERVER
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanupUI);
  } else {
    cleanupUI();
  }

  window.addEventListener('load', cleanupUI);
  setTimeout(cleanupUI, 100);
  setTimeout(cleanupUI, 500);
  setTimeout(cleanupUI, 1000);

  const observer = new MutationObserver(cleanupUI);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  // 10. DISPATCH READY EVENT
  const readyEvent = new CustomEvent('itfair-sync-bypass-ready');
  window.dispatchEvent(readyEvent);

  console.log("[ITFair Sync Bypass] ✓ Protection layer active");
  console.log("[ITFair Sync Bypass] ✓ License engine ready");
  console.log("[ITFair Sync Bypass] ✓ Error handlers installed");
})();
