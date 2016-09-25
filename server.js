'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.set('port', port);
app.use(express.static(__dirname + '/'));

app.get('*', function(req, res){
  console.log('Serving /');
  res.sendFile(__dirname + '/index.html');
});

const server = app.listen(port);
console.log('Listening on port ', port);
