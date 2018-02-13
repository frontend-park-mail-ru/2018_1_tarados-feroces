'use strict';

const manager = new TemplateManager('registration-template');

document.body.appendChild(manager.getElement({}, 'registration-block'));