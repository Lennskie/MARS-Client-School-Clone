"use strict";

let eb = new EventBus(configuration.eventbus.url);

eb.onopen = () => {
    eb.registerHandler('events.clients.moved', function(error, message) {
        console.log('recieved a message: ' + JSON.stringify(message));
    });
}

eb.onclose = (param) => {
    console.log('closed', param);
}