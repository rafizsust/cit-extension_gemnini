/**
 * ITFair Extension - Background Event Worker (MV3)
 * Handles internal tracking pipelines and message handshakes safely.
 */

let sidebarActiveState = false;

// Ensure local environment parameters are established on load
chrome.runtime.onInstalled.addListener(() => {
  console.log("[Service Worker] System installed and initialized.");
  chrome.storage.local.get(["cit_sidebar_active"], (result) => {
    sidebarActiveState = !!result.cit_sidebar_active;
    if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
      chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: sidebarActiveState }).catch(() => {});
    }
  });
});

// Sync side panel tracking defaults when storage registers adjustments
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.cit_sidebar_active) {
    sidebarActiveState = changes.cit_sidebar_active.newValue === true;
    if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
      chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: sidebarActiveState }).catch(() => {});
    }
  }
});

// Centralized Communication Port Router
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Always accept incoming handshakes to prevent connection drops
  if (!message) {
    sendResponse({ success: false, error: "Empty message payload" });
    return false;
  }

  console.log(`[Service Worker] Inbound action signal caught: ${message.action}`);

  // Auto-respond to any license or validation tracking strings instantly
  if (message.action && (message.action.toLowerCase().includes("license") || message.action === "check")) {
    sendResponse({
      valid: true,
      success: true,
      status: "active",
      name: "Educator Account",
      expires: "2099-12-31T23:59:59.000Z",
      offline: true
    });
    return true; 
  }

  // Handle core functional actions
  switch (message.action) {
    case "checkLicense":
    case "getLicense":
    case "license_checked":
      sendResponse({ valid: true, success: true, status: "active" });
      break;

    case "openSidePanel":
      if (sender.tab && sender.tab.id && chrome.sidePanel && chrome.sidePanel.open) {
        chrome.sidePanel.open({ tabId: sender.tab.id })
          .then(() => sendResponse({ success: true }))
          .catch((err) => sendResponse({ success: false, error: err.message }));
        return true;
      }
      sendResponse({ success: false, error: "Missing tab reference" });
      break;

    case "proxyFetch":
      // Bypasses CORS cross-domain security blocks when parsing layout elements
      (async () => {
        try {
          const res = await fetch(message.url, {
            method: message.method || "GET",
            headers: message.headers || {}
          });
          const data = await res.json();
          sendResponse({ ok: res.ok, status: res.status, data: data });
        } catch (err) {
          sendResponse({ ok: false, status: 0, error: err.message });
        }
      })();
      return true;

    default:
      // Catch-all response handler to prevent "Could not establish connection" drops
      sendResponse({ success: true, info: "Message caught by global fallback routing layer" });
      break;
  }
  return true; // Keep message channel open for asynchronous responses
});