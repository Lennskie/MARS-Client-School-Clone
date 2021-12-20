"use strict"

const auth = localStorage.getItem("auth")

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector('h1').innerHTML = "hello, " + auth;
    setTimeout(checkUser, 3000); //this will be replaced with bearer tokens when available
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