"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    getData();
    document.querySelectorAll('.rescuersfleetPanel .filter button').forEach(el => el.addEventListener('click', changeFilter));
    document.querySelector('#getChart').removeEventListener('click',changeFilter);
    document.querySelector('#getChart').addEventListener('click',goToChart)
}

function changeFilter(e) {
    e.preventDefault();

    if (e.target.className === "activeFilter"){
        e.target.classList.remove("activeFilter");
        getData();
    }else{
        document.querySelectorAll('.rescuersfleetPanel .filter button').forEach(e=>e.classList.remove("activeFilter"));
        e.target.classList.add("activeFilter");
        //getting data
        let buttonData = e.target.dataset.buttondata;
        //sending data to the fetch
        getDataForFilter(buttonData)
    }

}

function getDataForFilter(buttonData){
    console.log(configuration.api.url + `/dispatches`);
        fetchFromServer(configuration.api.url + `/dispatches`, 'GET')
            .then(response => {
                    filterOnButtonData(response, buttonData)
                }
            );
}

function filterOnButtonData(DATA, buttonDATA){
    DATA = DATA.dispatches;

    const parent = document.querySelector(".rescuersfleetGrid");
    parent.innerHTML = ''; //reset the HTML

    for (let  i=0; i < DATA.length; i++) {

        let sourceLocation = DATA[i].source.location.latitude.toFixed(4) + " ; " + DATA[i].source.location.longitude.toFixed(4);
        let destinationLocation = DATA[i].destination.location.latitude.toFixed(4) + " ; " + DATA[i].destination.location.longitude.toFixed(4);

        if (DATA[i].source.identifier.includes(buttonDATA) ||  DATA[i].destination.identifier.includes(buttonDATA)) {
            parent.insertAdjacentHTML('beforeend', `
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].source.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].destination.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>operational</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>2 minutes</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${destinationLocation}<p>
        </div>
            `)
        }
    }
}

function getData() {
    fetchFromServer(configuration.api.url + `/dispatches`, 'GET')
        .then(response => {
            loadRescuersfleetGrid(response)
            }
        );
}

function loadRescuersfleetGrid(DATA) {
    DATA = DATA.dispatches;
    const parent = document.querySelector(".rescuersfleetGrid");

    parent.innerHTML = ''; //reset the HTML

    for (let  i=0; i < DATA.length; i++){

        let sourceLocation = DATA[i].source.location.latitude + " ; " + DATA[i].source.location.longitude;
        let destinationLocation = DATA[i].destination.location.latitude + " ; " + DATA[i].destination.location.longitude;

            parent.insertAdjacentHTML('beforeend', `
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].source.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${DATA[i].destination.identifier}</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>operational</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>2 minutes</p>
        </div>
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${sourceLocation}<p>
        </div>  
        <div data-identifier="${DATA[i].identifier}">
            <p>${destinationLocation}<p>
        </div>
            `)
        }
}

function goToChart(){
    window.location.assign("chartvehicles.html");
}