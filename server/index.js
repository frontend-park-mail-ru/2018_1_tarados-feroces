'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.join('src')));
app.use('/login', express.static(path.join('src')));
app.use('/auth', express.static(path.join('src')));
app.use('/test', express.static(path.join('src')));
app.use('/menu', express.static(path.join('src')));

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 8080!'));


//    "watch:lint": "node node_modules/eslint-watch/bin/esw -w --fix"
//    "eslint-watch": "^3.1.3",
