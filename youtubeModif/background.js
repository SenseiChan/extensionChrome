chrome.runtime.onInstalled.addListener(() => {
    chrome.scripting.insertCSS({
      target: { allFrames: true },
      files: ["styles.css"]
    });
  });
  