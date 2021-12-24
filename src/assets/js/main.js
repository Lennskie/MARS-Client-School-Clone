let config;
let api;

let configuration;

// Detect local or remote env
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    configuration = {
        prefix: "http://",
        suffix: "/src",
        eventbus: {
            url: "http://localhost:8080/events/"
        },
        api: {
            url: "http://localhost:8080/api"
        },
        environment: 'local'
    }
} else {

    configuration = {
        prefix: "https://",
        suffix: "/mars-16",
        eventbus: {
            url: "https://project-ii.ti.howest.be/mars-16/events/"
        },
        api: {
            url: "https://project-ii.ti.howest.be/mars-16/api"
        },
        environment: 'deployment'
    }
}

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
        window.location.href = "./rescuersfleet.html";
    } else {
        window.location.href = "./index.html";
    }
}

// Dirty fix for embeded wrong redirects
if (window.location.href.includes("clientsmap.html") && localStorage.getItem("auth") === "employee") {
    window.location.href = configuration.prefix + window.location.host + configuration.suffix + "/employeesmap.html";
}