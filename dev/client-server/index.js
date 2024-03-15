const { Server } = require("sm-express-server");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const port = 4004;
const server = new Server(port, "/", [bodyParser.json()]);

server.addControllers([]);

server.app.use("/client", express.static(path.join(__dirname, "./dist/")));
server.app.get('/client/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});
server.start(() => {
    console.log(`server is up on port ${port}`);
});