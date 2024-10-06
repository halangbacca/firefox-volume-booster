document.addEventListener("DOMContentLoaded", () => {
  const volumeSlider = document.getElementById("volume");
  const volumeLabel = document.getElementById("volume-label");

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const tabId = tabs[0].id;

    // Recuperar o volume salvo para esta guia
    browser.storage.local.get(`volume_${tabId}`).then((result) => {
      const savedVolume = result[`volume_${tabId}`] || 100; // Padrão 100%
      volumeSlider.value = savedVolume;
      volumeLabel.textContent = `${savedVolume}%`;

      // Ajustar o volume da guia ativa
      browser.tabs.sendMessage(tabId, {
        action: "setVolume",
        volume: savedVolume / 100,
      });

      // Exibir a porcentagem de volume no ícone
      browser.browserAction.setBadgeText({
        text: `${savedVolume}%`,
        tabId: tabId,
      });
      browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" }); // Cor de fundo
    });
  });

  volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value;
    volumeLabel.textContent = `${volume}%`;

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tabId = tabs[0].id;

      // Ajustar o volume
      browser.tabs.sendMessage(tabId, {
        action: "setVolume",
        volume: volume / 100,
      });

      // Salvar o volume no storage local
      browser.storage.local.set({ [`volume_${tabId}`]: volume });

      // Exibir a porcentagem de volume no ícone
      browser.browserAction.setBadgeText({ text: `${volume}%`, tabId: tabId });
      browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" }); // Cor de fundo
    });
  });
});
