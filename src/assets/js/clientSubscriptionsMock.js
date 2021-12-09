"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    loadClientSubscriptions(clientSubscriptions);
    document.querySelectorAll('.clientSubscriptions .filter button').forEach(el => el.addEventListener('click', searchFilter));
}

function searchFilter() {
    // TODO
}

function loadClientSubscriptions(data) {
    const parent = document.querySelector(".clientSubscriptionsGrid");
    parent.innerHTML = '';

    data.forEach((listitem)=> {
        parent.insertAdjacentHTML('beforeend', `
            <div>
                <span><p>${listitem['mars_id']}</p></span>
            </div>
            <div>
                <p>${listitem['name']}</p>
            </div>
            <div>
                <p>${listitem['lastname']}</p>
            </div>
            <div>
                <p>${listitem['phone']}</p>
            </div>
            <div>
                <p>${listitem['subscription']}</p>
            </div>
            <div>
                <p>${listitem['sub_status']}</p>
            </div>
            <div>
                <p>${listitem['location_status']}</p>
            </div>
            <div>
                <p>${listitem['vital_status']}</p>
            </div>
        `)
    })
}