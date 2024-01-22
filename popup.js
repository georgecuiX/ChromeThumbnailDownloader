/*
 * popup.js
 * This JavaScript file contains the logic for the popup of the Chrome extension. 
 * It handles the user interactions, processes the YouTube video URL, 
 * and initiates the thumbnail download when the download button is clicked.
 */

document.getElementById('download').addEventListener('click', function() {
    const url = document.getElementById('url').value;
  
    if (url.includes('youtube.com/watch')) {
      downloadThumbnail(url);
    } else {
      alert('Invalid URL');
    }
  });
  
  function downloadThumbnail(videoUrl) {
    const videoId = new URL(videoUrl).searchParams.get('v');
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    chrome.downloads.download({url: thumbnailUrl});
  }
  