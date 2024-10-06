if (!window.audioContext) {
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();

  // Redução de ruídos no áudio
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-50, audioContext.currentTime);
  compressor.knee.setValueAtTime(40, audioContext.currentTime);
  compressor.ratio.setValueAtTime(12, audioContext.currentTime);
  compressor.attack.setValueAtTime(0, audioContext.currentTime);
  compressor.release.setValueAtTime(0.25, audioContext.currentTime);

  gainNode.connect(compressor);
  compressor.connect(audioContext.destination);

  const mediaElements = document.querySelectorAll("audio, video");

  mediaElements.forEach((element) => {
    const source = audioContext.createMediaElementSource(element);
    source.connect(gainNode);
  });

  window.audioContext = audioContext;
  window.gainNode = gainNode;
  window.compressor = compressor;
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
