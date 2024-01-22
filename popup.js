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
        // You can also add download functionality here if needed
    } else {
        alert('Please enter a valid YouTube video URL.');
    }
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
