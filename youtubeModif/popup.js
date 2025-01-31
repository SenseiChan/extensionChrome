document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("toggleBackground");

    // Charger l'état sauvegardé
    chrome.storage.sync.get("enabled", function (data) {
        button.textContent = data.enabled ? "Désactiver" : "Activer";
    });

    // Changer l'état au clic
    button.addEventListener("click", function () {
        chrome.storage.sync.get("enabled", function (data) {
            const newState = !data.enabled;
            chrome.storage.sync.set({ enabled: newState });

            button.textContent = newState ? "Désactiver" : "Activer";

            // Envoyer un message au content script
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { enabled: newState });
            });
        });
    });
});
