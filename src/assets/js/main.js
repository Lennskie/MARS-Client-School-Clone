let config;
let api;

document.addEventListener("DOMContentLoaded", init);
document.querySelector('#home-link').addEventListener("click", goHome);

async function init() {
    config = await loadConfig();
    api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;

    // Very small proof of concept.
    // poc();
}

async function loadConfig() {
    const response = await fetch("config.json");
    return response.json();
}

function goHome() {
    if(document.querySelector('#home-link').classList.contains('operator-home-link')) {
        window.location.href = "./callpanel.html";
    } else {
        window.location.href = "./index.html";
    }
}