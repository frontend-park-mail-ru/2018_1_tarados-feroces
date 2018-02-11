'use strict';

const manager = new TemplateManager("authorized-template");

document.body.appendChild(manager.getElement({login: "whoAreYou"}, "authorized-block"));