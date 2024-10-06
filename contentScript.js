// Verifica se o contexto de áudio já existe
if (!window.audioContext) {
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();

  // Configurar o compressor
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-30, audioContext.currentTime);
  compressor.knee.setValueAtTime(30, audioContext.currentTime);
  compressor.ratio.setValueAtTime(4, audioContext.currentTime);
  compressor.attack.setValueAtTime(0, audioContext.currentTime);
  compressor.release.setValueAtTime(0.25, audioContext.currentTime);

  // Aplicar ganho adicional após o compressor
  const postCompressorGain = audioContext.createGain();
  postCompressorGain.gain.value = 2.0; // Aumentar o ganho pós-compressão (ajuste conforme necessário)

  gainNode.connect(compressor);
  compressor.connect(postCompressorGain); // Conectar ao nó de ganho adicional
  postCompressorGain.connect(audioContext.destination); // Conectar ao destino final

  const mediaElements = document.querySelectorAll("audio, video");

  mediaElements.forEach((element) => {
    const source = audioContext.createMediaElementSource(element);
    source.connect(gainNode); // Conectar a fonte de áudio ao nó de ganho
  });

  window.audioContext = audioContext;
  window.gainNode = gainNode;
  window.compressor = compressor;
  window.postCompressorGain = postCompressorGain; // Ganho pós-compressor
}

function setVolume(level) {
  if (window.gainNode) {
    // Ajusta o volume no ganho inicial
    window.gainNode.gain.value = level * 6.0;
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "setVolume") {
    setVolume(message.volume);
  }
});
