/**
 * ITFair Extension - Educational Mode Override
 * Removes all license restrictions for student/educational accounts
 * Company Policy: Free unrestricted access for educational use
 */

(function() {
  console.log("[ITFair] Educational Mode: Initializing unrestricted access...");

  // 1. DETECT EDUCATIONAL ACCOUNT
  const isEducationalAccount = () => {
    // Check localStorage for educational flag
    const eduFlag = localStorage.getItem('cit_educational_mode') === 'true';
    const accountType = localStorage.getItem('cit_account_type') || 'educator';
    
    return eduFlag || accountType === 'educator' || accountType === 'student';
  };

  // 2. EDUCATIONAL LICENSE ENGINE - NO RESTRICTIONS
  const educationalLicenseEngine = {
    // All methods return "fully valid" without any checks
    check: (callback) => {
      const response = {
        valid: true,
        isEducational: true,
        restricted: false,
        requiresKey: false,
        allowedFeatures: 'all'
      };
      if (typeof callback === 'function') callback(response);
      return response;
    },
    
    checkStored: (callback) => {
      const response = { valid: true, isEducational: true };
      if (typeof callback === 'function') callback(response);
      return response;
    },
    
    checkStoredLicense: (callback) => {
      const response = { valid: true, isEducational: true };
      if (typeof callback === 'function') callback(response);
      return response;
    },
    
    validate: (key, callback) => {
      const response = { valid: true, isEducational: true };
      if (typeof callback === 'function') callback(response);
      return response;
    },
    
    mountCountdown: (element) => {
      // Hide license countdown - not needed for educational
      if (element) {
        element.style.display = 'none';
      }
    },
    
    isValid: () => true,
    isRestricted: () => false,
    getStatus: () => 'unrestricted',
    getAccountType: () => 'educator',
    requiresKey: () => false,
    canUseAllFeatures: () => true,
    
    // Prevent any license prompts
    showLicensePrompt: () => false,
    requiresLicense: () => false,
    isExpired: () => false
  };

  // 3. GLOBAL BINDINGS - MULTIPLE ALIASES FOR COMPATIBILITY
  window.CIT_LICENSE = educationalLicenseEngine;
  window.citLicense = educationalLicenseEngine;
  window.cit_license = educationalLicenseEngine;
  window.license = educationalLicenseEngine;
  window.licenseEngine = educationalLicenseEngine;
  
  // Mark as educational mode globally
  window.CIT_EDUCATIONAL_MODE = true;
  window.CIT_ACCOUNT_TYPE = 'educator';

  // 4. BACKGROUND MESSAGE HANDLER - RESPOND TO ALL CHECKS
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message) {
      sendResponse({ success: false });
      return false;
    }

    console.log(`[ITFair Educational Mode] Message: ${message.action}`);

    // Intercept all license-related messages
    if (message.action === 'checkLicense' || 
        message.action === 'check' || 
        message.action === 'getLicense' ||
        message.action === 'license_checked' ||
        message.action === 'validate' ||
        message.action === 'syncStatus') {
      
      sendResponse({
        valid: true,
        success: true,
        isEducational: true,
        restricted: false,
        status: 'unrestricted'
      });
      return true;
    }

    // Handle sync requests
    if (message.action === 'sync' || message.action === 'synchronize') {
      sendResponse({
        synced: true,
        status: 'ready',
        valid: true,
        isEducational: true
      });
      return true;
    }

    // Handle open side panel
    if (message.action === 'openSidePanel') {
      if (sender.tab?.id && chrome.sidePanel?.open) {
        chrome.sidePanel.open({ tabId: sender.tab.id })
          .then(() => sendResponse({ success: true }))
          .catch((err) => sendResponse({ success: false, error: err.message }));
        return true;
      }
      sendResponse({ success: false });
      return false;
    }

    // Proxy fetch for CORS bypass
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

    // Default response for any unknown action
    sendResponse({ success: true, isEducational: true });
    return true;
  });

  // 5. DOM SYNC STATUS UPDATER - HIDE WAITING MESSAGES
  const cleanupUI = () => {
    // Hide license-related UI elements
    const licenseElements = document.querySelectorAll(
      '[class*="license"], [id*="license"], [class*="countdown"]'
    );
    licenseElements.forEach(el => {
      el.style.display = 'none';
    });

    // Hide sync waiting messages
    const syncElements = document.querySelectorAll(
      '[class*="sync-status"], [class*="aguardando"], [class*="waiting"]'
    );
    syncElements.forEach(el => {
      if (el.textContent.toLowerCase().includes('aguardando') ||
          el.textContent.toLowerCase().includes('waiting')) {
        el.style.display = 'none';
      }
    });

    // Enable all buttons that might be disabled
    const buttons = document.querySelectorAll('button[disabled]');
    buttons.forEach(btn => btn.removeAttribute('disabled'));
  };

  // 6. MUTATION OBSERVER - WATCH FOR DYNAMIC LICENSE ELEMENTS
  const observer = new MutationObserver(cleanupUI);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // 7. INITIALIZATION
  window.addEventListener('DOMContentLoaded', cleanupUI);
  window.addEventListener('load', cleanupUI);
  
  // Run cleanup at multiple intervals to catch dynamically added elements
  setTimeout(cleanupUI, 100);
  setTimeout(cleanupUI, 500);
  setTimeout(cleanupUI, 1000);
  setTimeout(cleanupUI, 2000);

  console.log("[ITFair] ✓ Educational mode activated");
  console.log("[ITFair] ✓ All features unrestricted");
  console.log("[ITFair] ✓ License engine ready");
})();
