/**
 * UI Patch: Forces 'Sync' state and unlocks the UI
 */
(function() {
    const patchUI = () => {
        const body = document.getElementById('sp-body') || document.body;
        // Search for the waiting text and replace it with a ready state
        if (body.innerHTML.includes("Aguardando") || body.innerHTML.includes("Loading")) {
            // Force the Sync status to "Synced"
            const statusMsg = document.querySelector('.sp-sync-status-message');
            if (statusMsg) {
                statusMsg.innerText = "Sistema Sincronizado";
                statusMsg.style.color = "#4ade80";
            }
            
            // Unlock UI buttons by removing 'disabled' or 'hidden' attributes
            const actions = document.querySelectorAll('button, input');
            actions.forEach(btn => btn.removeAttribute('disabled'));
        }
    };

    // Run patch on load and when the DOM updates
    const observer = new MutationObserver(patchUI);
    observer.observe(document.body, { childList: true, subtree: true });
    
    window.addEventListener('load', patchUI);
})();