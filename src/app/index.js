"use strict";

const managerTest1 = new TemplateManager("test1-template");
const managerTest2 = new TemplateManager("test2-template");


const goNext = () => {
    const newState = {page: "test1"};
    history.pushState(newState, "Test", "/test1");

    document.body.innerHTML = (managerTest2.getHTML({title: "Goodbye", buttonText: "Prev"}));
    console.log(document.getElementById("2"));
    const backwardButton = document.getElementById("2");

    backwardButton.addEventListener("click", () => {
        goPrevious();
    });
};

const goPrevious = () => {
    const newState = {page: "test2"};
    history.pushState(newState, "History", "/test2");

    document.body.innerHTML = (managerTest1.getHTML({title: "Hello", buttonText: "Next"}));
    console.log(document.getElementById("1"));
    const forwardButton = document.getElementById("1");

    forwardButton.addEventListener("click", () => {
        goNext();
    });
};

goPrevious();
