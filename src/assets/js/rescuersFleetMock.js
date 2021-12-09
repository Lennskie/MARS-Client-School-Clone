"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadRescuersfleetGrid(rescuersFleetDataMock);
    document.querySelectorAll('.rescuersfleetPanel .filter button').forEach(el => el.addEventListener('click', delegateAction));
}

function delegateAction(e) {
    e.preventDefault();

    if( e.target.innerText === 'On dispatch') {
        rescuersGridFilter('Dispatched');
    }
    else if( e.target.innerText === 'On Standby' ) {
        rescuersGridFilter('Standby');
    }
    else if (e.target.innerText === 'Non-Operational') {
        rescuersGridFilter('Repairing');
    }
}

function rescuersGridFilter(filterOn) {
    let arr = [];

    for (let i = 0; i < rescuersFleetDataMock.length; i++) {
        if(rescuersFleetDataMock[i]['status'] === filterOn) {
            arr.push(rescuersFleetDataMock[i]);
        }
    }

    return loadRescuersfleetGrid(arr);
}

function loadRescuersfleetGrid(data) {
    const parent = document.querySelector(".rescuersfleetGrid");
    parent.innerHTML = '';

    data.forEach((listitem)=> {
        parent.insertAdjacentHTML('beforeend', `
            <div>
                <p>${listitem['vehicle_id']}</p>
            </div>
            <div>
                <p>${listitem['condition']}</p>
            </div>
            <div>
                <p>${listitem['status']}</p>
            </div>
            <div>
                <p>${listitem['rescue_eta']}</p>
            </div>
            <div>
                <p>${listitem['base']}</p>
            </div>
            <div>
                <p>${listitem['actual_position']}</p>
            </div>
            <div>
                <p>${listitem['final_destination']}</p>
            </div>
        `)
    })
}