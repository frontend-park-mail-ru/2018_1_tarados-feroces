'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.join('src')));
app.use('/login', express.static(path.join('src')));
app.use('/signup', express.static(path.join('src')));
app.use('/test', express.static(path.join('src')));
app.use('/leaderboard', express.static(path.join('src')));
app.use('/settings', express.static(path.join('src')));

app.get('/login/id', function(req, res) {
    res.status(200).json({text: 'hello world'});
});

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 8080!'));


//    "watch:lint": "node node_modules/eslint-watch/bin/esw -w --fix"
//    "eslint-watch": "^3.1.3",
