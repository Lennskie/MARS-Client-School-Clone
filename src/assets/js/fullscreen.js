"use strict";
document.addEventListener('DOMContentLoaded', init);

function init(){
    document.querySelector("#fullscreen").addEventListener('click', toggleFullScreen)
}

function toggleFullScreen() {
    let map = document.querySelector("#map")
    if (!document.fullscreenElement) {
        // If the document is not in full screen mode
        // make the video full screen
        map.requestFullscreen();
    } else {
        // Otherwise exit the full screen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
