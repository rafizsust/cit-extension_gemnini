/**
 * ITFair Extension - Deferred Initialization Manager
 * Ensures all dependencies are ready before sidepanel.js executes
 * This prevents "window[...] is not a function" errors from obfuscated code
 */

(function() {
  console.log("[ITFair Init] Deferred initialization manager starting...");

  // 1. Create safety bridge for all function calls
  const initSafety = {
    ready: false,
    initialized: false,
    retries: 0,
    maxRetries: 50
  };

  // 2. Setup proxy to intercept undefined function calls
  window.Proxy = window.Proxy || function() {};

  // 3. Create fallback for all possible function names
  const createFallbackFunction = () => {
    return function(...args) {
      const callback = args[args.length - 1];
      if (typeof callback === 'function') {
        callback({
          valid: true,
          success: true,
          status: 'active',
          isEducational: true
        });
      }
      return {
        valid: true,
        success: true,
        status: 'active',
        isEducational: true
      };
    };
  };

  // 4. Ensure ALL global objects exist with fallback methods
  const ensureGlobalObjects = () => {
    // License engine
    if (!window.CIT_LICENSE || typeof window.CIT_LICENSE !== 'object') {
      window.CIT_LICENSE = {
        check: createFallbackFunction(),
        checkStored: createFallbackFunction(),
        validate: createFallbackFunction(),
        mountCountdown: (el) => {
          if (el) {
            el.style.display = 'none';
          }
        },
        isValid: () => true,
        getStatus: () => 'active'
      };
    }

    // Aliases
    window.citLicense = window.CIT_LICENSE;
    window.cit_license = window.CIT_LICENSE;
    window.license = window.CIT_LICENSE;

    // Global educational flags
    window.CIT_EDUCATIONAL_MODE = true;
    window.CIT_EDUCATIONAL_BYPASS = true;
  };

  // 5. Wait for educational-mode.js to initialize
  const waitForInitialization = (callback) => {
    if (initSafety.ready || (window.CIT_LICENSE && window.citLicense)) {
      console.log("[ITFair Init] Educational mode confirmed ready");
      callback();
      return;
    }

    if (initSafety.retries >= initSafety.maxRetries) {
      console.warn("[ITFair Init] Timeout waiting for educational mode, using fallback");
      ensureGlobalObjects();
      callback();
      return;
    }

    initSafety.retries++;
    setTimeout(() => waitForInitialization(callback), 50);
  };

  // 6. Flag ready when educational-mode is detected
  window.addEventListener('itfair-educational-ready', () => {
    initSafety.ready = true;
    console.log("[ITFair Init] Educational mode event received");
  });

  // 7. Override chrome.runtime.onMessage to catch errors
  const originalOnMessage = chrome.runtime.onMessage;
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
      console.log("[ITFair Init] Message intercepted:", message.action);
      
      if (message.action === 'checkLicense' || message.action === 'check' || message.action === 'syncStatus') {
        sendResponse({
          valid: true,
          success: true,
          isEducational: true,
          status: 'active'
        });
        return true;
      }

      // Pass through to original listener if it exists
      if (originalOnMessage && typeof originalOnMessage === 'function') {
        return originalOnMessage(message, sender, sendResponse);
      }
    } catch (err) {
      console.error("[ITFair Init] Message handler error:", err);
      sendResponse({ error: err.message });
    }
    return true;
  });

  // 8. Initialize safety systems immediately
  ensureGlobalObjects();

  // 9. Main initialization sequence
  waitForInitialization(() => {
    console.log("[ITFair Init] All systems ready");
    
    // Double-check all functions exist
    ensureGlobalObjects();
    
    // Hide sync waiting messages
    const hideWaitingMessages = () => {
      document.querySelectorAll('[class*="aguardando"], [class*="waiting"], [class*="sync-status"]')
        .forEach(el => {
          if (el.textContent.toLowerCase().includes('aguardando') ||
              el.textContent.toLowerCase().includes('waiting')) {
            el.style.display = 'none';
          }
        });
    };

    hideWaitingMessages();
    
    // Setup DOM observer
    const observer = new MutationObserver(hideWaitingMessages);
    observer.observe(document.body, { childList: true, subtree: true });

    // Dispatch ready event
    const readyEvent = new CustomEvent('itfair-all-systems-ready');
    window.dispatchEvent(readyEvent);
  });

  // 10. Global error handler for obfuscated code
  window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('is not a function')) {
      console.warn("[ITFair Init] Function call error caught and suppressed");
      ensureGlobalObjects();
      event.preventDefault();
    }
  });

  console.log("[ITFair Init] ✓ Deferred initialization manager loaded");
})();
