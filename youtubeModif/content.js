function applyBackgroundColor(enabled) {
    let style = document.getElementById("customBackgroundStyle");

    if (enabled) {
        if (!style) {
            style = document.createElement("style");
            style.id = "customBackgroundStyle";
            style.innerHTML = `
                body, #page-manager {
                    background-color: aqua !important;
                }
            `;
            document.documentElement.appendChild(style);
        }
    } else {
        if (style) {
            style.remove();
        }
    }
}

// Observer les changements de page (SPA support)
const observer = new MutationObserver(() => {
    chrome.storage.sync.get("enabled", function (data) {
        applyBackgroundColor(data.enabled);
    });
});

observer.observe(document.body, { childList: true, subtree: true });

// Appliquer le style au chargement
chrome.storage.sync.get("enabled", function (data) {
    applyBackgroundColor(data.enabled);
});

// Écouter les changements de l'état
chrome.storage.onChanged.addListener(function (changes) {
    if (changes.enabled) {
        applyBackgroundColor(changes.enabled.newValue);
    }
});
