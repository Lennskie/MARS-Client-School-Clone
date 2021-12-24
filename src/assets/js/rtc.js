"use strict";

let eb;

function eventBusStart() {
    eb = new EventBus(configuration.eventbus.url);

    eb.onopen = () => {
        eb.registerHandler('new.client', handleNewClient);
        eb.registerHandler('new.vehicle', handleNewVehicle);
        eb.registerHandler('new.dispatch', handleNewDispatch);
        eb.registerHandler('delete.dipsatch', handleDeletedDispatch);
        eb.registerHandler('location.client', handleClientLocationUpdate);
        eb.registerHandler('location.vehicle', handleVehicleLocationUpdate);
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

function handleNewDispatch(error, message) {
    // Some Text
}

function handleDeletedDispatch(error, message) {
    // Some Text
}

function handleClientLocationUpdate(error, message) {
    console.log("Client should move");
    let newLocation = new L.LatLng(message.body.location.latitude, message.body.location.longitude);
    clients.get(message.body.identifier).setLatLng(newLocation);

}

function handleVehicleLocationUpdate(error, message) {
    console.log("Vehicle should move");
    let newLocation = new L.LatLng(message.body.location.latitude, message.body.location.longitude);
    vehicles.get(message.body.identifier).setLatLng(newLocation);
}