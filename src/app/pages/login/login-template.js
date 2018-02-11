'use strict';

const manager = new TemplateManager("login-template");

document.body.appendChild(manager.getElement({}, "login-block"));