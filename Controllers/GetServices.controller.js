const { Controller, storage } = require("sm-express-server");
const fs = require ("fs");
const Response = require("../Modules/Response");

const getServicesController = new Controller({method:"GET", name:"Git services", path:"/services", storage: storage("./").none()}, (req, res, app) => {
    fs.readFile("./Database/services.json", (err, data) => {
        if(err)
            res.status(5000).send("Error");
        res.send(new Response(data.toString()));
    })    
})

module.exports = getServicesController;