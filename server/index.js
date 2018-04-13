const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.join('dist')));
app.use('/login', express.static(path.join('dist')));
app.use('/signup', express.static(path.join('dist')));
app.use('/test', express.static(path.join('dist')));
app.use('/leaderboard', express.static(path.join('dist')));
app.use('/news', express.static(path.join('dist')));
app.use('/settings', express.static(path.join('dist')));
app.use('/user', express.static(path.join('dist')));
app.use('/game', express.static(path.join('dist')));
// app.use(/\/.+/gi, express.static(path.join('dist')));
// app.use(express.static(path.join('dist')));

app.use('*', function(req, res) {
    res.status(404).send('404');
});

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 8080!'));
