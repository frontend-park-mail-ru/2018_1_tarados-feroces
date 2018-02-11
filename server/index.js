'use strict';

const express = require('express');

const app = express();

const path = require('path');

app.use('', express.static(path.join('src')));
app.use('', express.static(path.join('node_modules')));

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
