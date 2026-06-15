/**
 * ITFair Extension - Sidepanel Countdown Initializer
 * Extracted externally to satisfy modern Manifest V3 CSP constraints
 */
(function() {
  function start() {
    var el = document.getElementById('sp-license-countdown');
    
    // Check all potential object names safely using logical fallbacks
    var licenseEngine = window.citLicense || 
                        window.CIT_LICENSE || 
                        window.cit_license || 
                        window.license || 
                        window.CITLICENSE;
    
    if (el && licenseEngine && licenseEngine.mountCountdown) {
      licenseEngine.mountCountdown(el);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();