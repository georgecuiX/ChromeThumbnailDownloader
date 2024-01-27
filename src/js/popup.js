/*
 * popup.js
 * This JavaScript file contains the logic for the popup of the Chrome extension. 
 * It handles the user interactions, processes the YouTube video URL, 
 * and initiates the thumbnail download when the download button is clicked.
 */

document.getElementById('download').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    const quality = document.getElementById('qualitySelect').value;

    if (isValidYoutubeUrl(url)) {
        const videoId = getVideoIdFromUrl(url);
        const thumbnailUrl = getThumbnailUrl(videoId, quality);
        updateThumbnailPreview(thumbnailUrl);
        downloadImage(thumbnailUrl);
    } else {
        alert('Please enter a valid YouTube video URL.');
    }
});

document.getElementById('downloadAll').addEventListener('click', function() {
    const urls = document.getElementById('urlList').value.split('\n');
    let validUrls = 0;

    urls.forEach(url => {
        if (isValidYoutubeUrl(url)) {
            validUrls++;
            const videoId = getVideoIdFromUrl(url);
            const thumbnailUrl = getThumbnailUrl(videoId, 'maxresdefault');
            downloadImage(thumbnailUrl);
        }
    });

    if (validUrls === 0) {
        alert('No valid YouTube URLs found. Please check your input.');
    } else {
        alert(`${validUrls} thumbnails queued for download.`);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "FetchYouTubeURL"}, function(response) {
            if(response && response.url) {
                document.getElementById('url').value = response.url;
            }
        });
    });
});

function isValidYoutubeUrl(url) {
    return url.includes('youtube.com/watch?v=') || url.includes('youtu.be/');
}

function getVideoIdFromUrl(url) {
    return new URL(url).searchParams.get('v');
}

function getThumbnailUrl(videoId, quality) {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

function updateThumbnailPreview(thumbnailUrl) {
    const preview = document.getElementById('thumbnailPreview');
    preview.src = thumbnailUrl;
    preview.style.display = 'block';
}

// Function to trigger the download of the image
function downloadImage(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thumbnail.jpg';  // or a dynamic filename based on the video ID
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

