/**
 * EDUCATIONAL OVERRIDE: Universal License Engine
 */
(function() {
    const mockData = {
        valid: true,
        success: true,
        status: "active",
        name: "Educator Account",
        expires: "2099-12-31T23:59:59.000Z",
        offline: true
    };

    const licenseEngine = {
        check: (cb) => { if(cb) cb(mockData); return mockData; },
        checkStored: (cb) => { if(cb) cb(mockData); return mockData; },
        checkStoredLicense: (cb) => { if(cb) cb(mockData); return mockData; },
        validate: (k, cb) => { if(cb) cb(mockData); return mockData; },
        mountCountdown: (el) => { if(el) el.innerText = "⏳ System Active"; }
    };

    // Global Bindings
    window.citLicense = licenseEngine;
    window.CIT_LICENSE = licenseEngine;
    window.license = licenseEngine;

    // Listen for sync/status pings from sidepanel.js
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg.action === "check" || msg.action === "syncStatus") {
            sendResponse({ status: "active", valid: true });
            return true;
        }
    });
})();