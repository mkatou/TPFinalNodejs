// Import du nouveau module app
const app = require('./app')


const port = process.env.PORT || '3000'

// Lancement du server (qui était auparavant dans app.js)
app.listen = function listen() {
    var server = app;
    console.log("le server écoute sur le port", host, port)
    return server.listen.apply(server, port);
};