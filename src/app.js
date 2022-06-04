const express = require('express');
const http = require('http');
const path = require('path');
const engine = require('ejs-mate');
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const db = require('./db');

// settings
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// routes
app.use(require('./routes'));

// sockets
require('./sockets')(io);

// Static files
app.use(express.static(path.join(__dirname, 'public')));



const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log(`Example app listening on ${port}!`);
});