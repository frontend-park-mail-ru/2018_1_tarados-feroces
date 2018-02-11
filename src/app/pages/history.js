"use strict";

const changeButton = document.getElementById("change");

window.addEventListener("popstate", (event) => {
    console.log(event.state.page);
});

changeButton.addEventListener("click", () => {
   const currentState = history.state;
   if (currentState === null || currentState.page === "base") {
      goNext();
   }
   else if (currentState.page === "test"){
      goPrevious();
   }
});

const goNext = () => {
    const newState = {page: "test"};
    history.pushState(newState, "Test", "/test");
    document.getElementById("data").innerText = "Goodbye";
    document.getElementById("change").innerText = "Prev";
};

const goPrevious = () => {
    const newState = {page: "base"};
    history.pushState(newState, "History", "/history.html");
    document.getElementById("data").innerText = "Hello";
    document.getElementById("change").innerText = "Next";
};