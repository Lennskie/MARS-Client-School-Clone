"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadCallsList(callsDataMock);
    document.querySelectorAll('.callsGrid button').forEach(el => el.addEventListener('click', delegateAction));
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

function loadCallsList(data) {
    const parent = document.querySelector(".callsGrid");
    parent.innerHTML = '';

    data.forEach((listitem)=> {
        parent.insertAdjacentHTML('beforeend', `
            <div>
                <p>${listitem['communication']}</p>
            </div>
            <div>
                <p><span>${listitem['caller']}</span></p>
            </div>
            <div>
                <p>${listitem['status']}</p>
            </div>
            <div>
                <p>${listitem['rescue ETA']}</p>
            </div>
            <button class="${listitem['info']}">${listitem['action']}</button>
            <button>${listitem['location']}</button>
        `)
    })
}