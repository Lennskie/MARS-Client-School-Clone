"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadRescuersfleetGrid(rescuersFleetDataMock);
    document.querySelectorAll('.rescuersfleetPanel .filter button').forEach(el => el.addEventListener('click', delegateAction));
}

function delegateAction(e) {
    e.preventDefault();

    if(e.target.id === 'filterDispatch') {
        e.target.classList.add('activeFilter');
        removeActiveFilters(document.querySelector('#filterStandby'),
            document.querySelector('#filterNonOperational'))

        return rescuersGridFilter('Dispatched');
    }
    else if(e.target.id === 'filterStandby') {
        e.target.classList.add('activeFilter')
        removeActiveFilters(document.querySelector('#filterDispatch'),
            document.querySelector('#filterNonOperational'))

        return rescuersGridFilter('Standby');
    }
    else if (e.target.id === 'filterNonOperational') {
        e.target.classList.add('activeFilter')
        removeActiveFilters(document.querySelector('#filterDispatch'),
            document.querySelector('#filterStandby'))

        return rescuersGridFilter('Repairing');
    }
}

function removeActiveFilters(id1, id2) {
    id1.classList.remove('activeFilter');
    id2.classList.remove('activeFilter');
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