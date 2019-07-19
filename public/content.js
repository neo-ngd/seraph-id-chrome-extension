window.addEventListener(
  "MyEventType",
  function(evt) {
    console.log(evt.detail);
    chrome.runtime.sendMessage({
      action: "popupOpen"
    });
  },
  false
);
