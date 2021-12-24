"use strict"

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector('h1').innerHTML = "Hello, " + auth;
    if(checkUser() === "client"){
        setTimeout( function(){
            document.querySelector("p").innerHTML = "Welcome to M.A.R.S, " + auth;
            document.querySelector('.loader').className += " loader-done";
            document.querySelector('.loader').classList.remove("loader");
            document.querySelector('.loader-done').innerHTML =
                `<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle class="checkmark__circle" cx="00" cy="00" r="55" fill="none"/>
                      <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>`
            setTimeout(function(){document.location.href = "support.html"}, 2000);
        }, 2000);
    }else if(checkUser() === "employee"){
        setTimeout( function(){
            document.querySelector("p").innerHTML = "Welcome to M.A.R.S, " + auth;
            document.querySelector('.loader').className += " loader-done";
            document.querySelector('.loader').classList.remove("loader");
            document.querySelector('.loader-done').innerHTML =
                `<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle class="checkmark__circle" cx="00" cy="00" r="55" fill="none"/>
                      <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>`
            setTimeout(function(){document.location.href = "rescuersfleet.html"}, 2000);
        }, 2000);
    }else if (checkUser() === false){
        setTimeout( function() {
            document.querySelector("p").innerHTML = "Seems like you're not from around here, " + auth;
            document.querySelector('.loader').className += " loader-done";
            document.querySelector('.loader').classList.remove("loader");
            document.querySelector('.loader-done').innerHTML =
                `<div class="crosssign"><p>X</p></div>`
            setTimeout(function () { document.location.href = "login.html"}, 2000);
        }, 2000);
    }
}