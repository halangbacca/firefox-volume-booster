document.addEventListener("DOMContentLoaded", () => {
  const volumeSlider = document.getElementById("volume");
  const volumeLabel = document.getElementById("volume-label");

  // Recupera a guia ativa
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const tabId = tabs[0].id;

    // Recupera o volume salvo para esta guia
    browser.storage.local.get(`volume_${tabId}`).then((result) => {
      const savedVolume = result[`volume_${tabId}`] || 100; // Padrão 100%
      volumeSlider.value = savedVolume;
      volumeLabel.textContent = `${savedVolume}%`;

      // Ajusta o volume da guia ativa
      browser.tabs.sendMessage(tabId, {
        action: "setVolume",
        volume: savedVolume / 100,
      });
    });
  });

  // Evento para ajustar o volume e salvar no storage
  volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value;
    volumeLabel.textContent = `${volume}%`;

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tabId = tabs[0].id;

      // Ajusta o volume
      browser.tabs.sendMessage(tabId, {
        action: "setVolume",
        volume: volume / 100,
      });

      // Salva o volume no storage local
      browser.storage.local.set({ [`volume_${tabId}`]: volume });
    });
  });
});
