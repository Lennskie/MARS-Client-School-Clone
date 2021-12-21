"use strict";

let eb;

function eventBusStart() {
    eb = new EventBus(configuration.eventbus.url);

    eb.onopen = () => {
        eb.registerHandler('new.client', handleNewClient);
        eb.registerHandler('new.vehicle', handleNewVehicle);
    }

    // Logs closing of busses, shouldn't actaully occur during runtime but might be 
    // usefull to show some sort of "Loading/something went wrong" message
    eb.onclose = (param) => {
        console.log('closed: ', param);
    }
}

function handleNewClient(error, message) {
    if (!error) {
        addClientToMap(message.body.vitals.status, message.body.location, message.body.identifier);
    } else {
        console.log('NewClient Error: ', error);
    }
}

function handleNewVehicle(error, message) {
    if (!error) {
        addVehicleToMap(message.body.location, message.body.identifier);
    } else {
        console.log('NewVehicle Error: ', error);
    }
}