/*global chrome*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  switch (message.action) {
    case "popupOpen":
      {
        console.log("popup is open");
        chrome.tabs.executeScript({
          code: "window.open()"
        });
      }
      break;
  }
});
