'use strict';

const source = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);

const context = {title : "Hello world!"};
const html = template(context);

document.write(html);
