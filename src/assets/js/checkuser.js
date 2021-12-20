"use strict"

const auth = localStorage.getItem("auth")

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector('h1').innerHTML = "hello, " + auth;
    if(checkUser() === "client"){
        setTimeout( function(){
            document.querySelector('.loader').className += " loader-done"
            document.querySelector('.loader').classList.remove("loader")
            document.querySelector('.loader-done').innerHTML =
                `<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle class="checkmark__circle" cx="00" cy="00" r="55" fill="none"/>
                      <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>`
        }, 2000)
    }
}


function checkUser(){
    if (auth === 'client'){
        console.log("logged in as client");
        return "client";
    }else if (auth === 'employee'){
        console.log("logged in as employee");
        return "employee";
    }else{
        console.log("not a valid user");
        return "invalid";
    }
}