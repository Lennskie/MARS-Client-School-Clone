"use scrict"

const auth = localStorage.getItem("auth")

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector("#btn-logout").addEventListener("click", logout)
    document.querySelector("#btn-logout").classList.remove("hidden");
    document.querySelector("#btn-login").classList.remove("hidden");
    if (checkUser() !== false){
        document.querySelector("#btn-login").classList.add("hidden");
    }else{
        document.querySelector("#btn-logout").classList.add("hidden")
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