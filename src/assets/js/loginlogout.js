"use scrict"

const auth = localStorage.getItem("auth")

document.addEventListener("DOMContentLoaded", init);

function init(){

    document.querySelector("#btn-logout").addEventListener("click", logout);

    //reset of all the hidden on pageload (this can be simplefied in a later stage)
    document.querySelector("#btn-logout").classList.remove("hidden");
    document.querySelector("#btn-login").classList.remove("hidden");
    document.querySelector("#savemenow").classList.remove("hidden");

    if (checkUser() !== false){ //you are logged in
        document.querySelector("#btn-login").classList.add("hidden");
        document.querySelector("#savemenow").classList.add("hidden");
        document.querySelector("#subscribe").classList.remove("nav");
        document.querySelector("#subscribe").classList.add("hidden");

    }else{ //you are not logged in
        document.querySelector("#btn-logout").classList.add("hidden");
        document.querySelector("#subscribe").classList.add("nav");
        document.querySelector("#subscribe").classList.remove("hidden");
        document.querySelector("#savemenow").classList.remove("hidden");
    }
}

function logout (e){
    e.preventDefault();
    localStorage.clear();
    window.location.assign("index.html");
}

function checkUser(){
    if (auth === 'client'){
        return "client";
    }else if (auth === 'employee'){
        return "employee";
    }else{
        return false;
    }
}