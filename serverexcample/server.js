var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('certificates/localhost.key', 'utf8');
var certificate = fs.readFileSync('certificates/localhost.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();
var path = require("path");

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// For http
httpServer.listen(80);
// For https
httpsServer.listen(443);

app.use(express.static(path.join(__dirname, '.')));
app.get('/', function(req, res) {

});

app.get('/', function (req, res) {
    res.header('Content-type', 'text/html');
//    return res.end('<h1>Hello, Secure World!</h1>');
//    res.sendFile(path.join(__dirname + '/./index.html'));
    res.sendFile(path.join(__dirname, '.', 'index.html'));
});

// app.listen(80);
