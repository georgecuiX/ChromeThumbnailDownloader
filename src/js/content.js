/*
 * content.js
 * This JavaScript file is a content script that can interact with web pages that the user visits.
 */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "FetchYouTubeURL") {
        sendResponse({ url: window.location.href });
    }
    return true; 
});
