"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadCallsList(callsDataMock);
    document.querySelectorAll('.callsGrid button').forEach(el => el.addEventListener('click', delegateAction));
}

function delegateAction(e) {
    e.preventDefault();

    if(e.target.dataset.call === "active"){
        console.log("should end call now");
    }
    if(e.target.dataset.call === "inactive"){
        console.log("should start");
    }
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
            <button class="callButton" data-call="${listitem['data']}">${listitem['action']}</button>
            <button>${listitem['location']}</button>
        `)
    })
}