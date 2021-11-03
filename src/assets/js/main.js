let config;
let api;

document.addEventListener("DOMContentLoaded", init);

async function init() {
    config = await loadConfig();
    api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;

    // Very small proof of concept.
    poc();
}

async function loadConfig() {
    const response = await fetch("config.json");
    return response.json();
}
