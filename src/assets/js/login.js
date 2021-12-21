"use strict"

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector("#submitMarsID").addEventListener("click", addUserAndCheck)
    localStorage.clear();
}

function addUserAndCheck(){
    const userInput = document.querySelector("#marsID").value;
    localStorage.setItem("auth", userInput);
    window.location.href = "loading-page.html"
}