// Verifica se o contexto de áudio já existe
if (!window.audioContext) {
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();

  gainNode.connect(audioContext.destination);

  const mediaElements = document.querySelectorAll("audio, video");

  mediaElements.forEach((element) => {
    const source = audioContext.createMediaElementSource(element);
    source.connect(gainNode);

    gainNode.gain.value = 1.0;
  });

  window.audioContext = audioContext;
  window.gainNode = gainNode;
}

function setVolume(level) {
  if (window.gainNode) {
    window.gainNode.gain.value = level * 6.0;
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "setVolume") {
    setVolume(message.volume);
  }
});
