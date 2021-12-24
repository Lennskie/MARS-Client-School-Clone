let configuration;

// Detect local or remote env
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    configuration = {
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
        eventbus: {
            url: "https://project-ii.ti.howest.be/mars-16/events/"
        },
        api: {
            url: "https://project-ii.ti.howest.be/api"
        },
        environment: 'deployment'
    }
}