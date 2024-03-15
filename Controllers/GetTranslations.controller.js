const { Controller, storage } = require("sm-express-server");
const fs = require ("fs");
const Response = require("../Modules/Response");

const getTranslationsController = new Controller({method:"GET", name:"Git translations", path:"/translations", storage: storage("./").none()}, (req, res, app) => {
    fs.readFile("./Database/translations.json", (err, data) => {
        if(err)
            res.status(5000).send("Error");
        res.send(new Response(JSON.parse(data.toString())));
    })    
})

module.exports = getTranslationsController;