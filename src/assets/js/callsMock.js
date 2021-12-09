"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadCallsList(calls);
    document.querySelectorAll('.callsGrid button').forEach(el => el.addEventListener('click', delegateAction));
    document.querySelectorAll('.callPanel .filter button').forEach(el => el.addEventListener('click', delegateFilter));
}

function delegateAction(e) {
    e.preventDefault();

    if( e.target.classList.contains("activeCall")){
        endCall(e)
    }
    else if( e.target.classList.contains("inactiveCall")){
        pickupCall(e);
    }
}

function pickupCall(e) {
    e.target.classList = "activeCall"
    e.target.innerHTML = 'End call'
}

function endCall(e) {
    e.target.classList = "inactiveCall"
    e.target.innerHTML = 'Accept call...'
}

function delegateFilter(e) {
    e.preventDefault();

    if(e.target.id === 'filterClients') {
        e.target.classList.add('activeFilter');
        document.querySelector('#filterAmbulances').classList.remove('activeFilter');

        return callsGridFilter('client');
    }
    else if(e.target.id === 'filterAmbulances') {
        e.target.classList.add('activeFilter')
        document.querySelector('#filterClients').classList.remove('activeFilter');

        return callsGridFilter('ambulance');
    }
}

function callsGridFilter(filterOn) {
    let arr= [];

    for (let i in calls) {
        if(calls[i]['type'] === filterOn) {
            arr.push(calls[i]);
        }
    }

    return loadCallsList(arr);
}

function loadCallsList(data) {
    const parent = document.querySelector(".callsGrid");
    parent.innerHTML = '';

    data.forEach((listitem)=> {
        parent.insertAdjacentHTML('beforeend', `
            <div>
                <p>${listitem['communication']}</p>
            </div>
            <div data-id="${listitem['id']}">
                <p><span>${listitem['caller']}</span></p>
            </div>
            <div data-id="${listitem['id']}">
                <p>${listitem['status']}</p>
            </div>
            <div data-id="${listitem['id']}">
                <p>${listitem['rescue ETA']}</p>
            </div>
            <button class="${listitem['info']}">${listitem['action']}</button>
            <button>${listitem['location']}</button>
        `)
    })
}