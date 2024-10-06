browser.runtime.onMessage.addListener((message) => {
  if (message.action === "setVolume") {
    setVolume(message.volume);
  }
});

browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.executeScript(tab.id, { file: "contentScript.js" });
});
