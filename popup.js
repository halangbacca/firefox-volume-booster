document.addEventListener("DOMContentLoaded", () => {
  const volumeSlider = document.getElementById("volume");
  const volumeLabel = document.getElementById("volume-label");

  // Consulta a guia ativa para obter o volume salvo
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const tabId = tabs[0].id;

    // Recuperar o volume salvo para esta guia, caso exista
    browser.storage.local.get(`volume_${tabId}`).then((result) => {
      const savedVolume = result[`volume_${tabId}`] || 100; // Padrão 100%
      volumeSlider.value = savedVolume;
      volumeLabel.textContent = `${savedVolume}%`;

      // Só mostrar o volume no ícone se for acima de 100%
      if (savedVolume > 100) {
        browser.browserAction.setBadgeText({ text: `${savedVolume}%`, tabId: tabId });
        browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
      } else {
        browser.browserAction.setBadgeText({ text: "", tabId: tabId }); // Não exibir nada abaixo de 100%
      }
    });
  });

  // Ajustar o volume quando o slider for modificado
  volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value;
    volumeLabel.textContent = `${volume}%`;

    // Atualizar o volume da guia ativa
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tabId = tabs[0].id;

      // Enviar mensagem para ajustar o volume na guia ativa
      browser.tabs.sendMessage(tabId, {
        action: "setVolume",
        volume: volume / 100,
      });

      // Salvar o volume no storage local
      browser.storage.local.set({ [`volume_${tabId}`]: volume });

      // Exibir o volume no ícone se for maior que 100%
      if (volume > 100) {
        browser.browserAction.setBadgeText({ text: `${volume}%`, tabId: tabId });
        browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
      } else {
        browser.browserAction.setBadgeText({ text: "", tabId: tabId }); // Limpar se for 100% ou menos
      }
    });
  });
});