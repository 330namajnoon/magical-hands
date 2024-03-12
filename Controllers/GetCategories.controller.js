const { Controller, storage } = require("sm-express-server");
const fs = require ("fs");
const Response = require("../Modules/Response");

const getCategoriesController = new Controller({method:"GET", name:"Git categories", path:"/categories", storage: storage("./").none()}, (req, res, app) => {
    fs.readFile("./Database/categories.json", (err, data) => {
        if(err)
            res.status(5000).send("Error");
        res.send(new Response(data.toString()));
    })    
})

module.exports = getCategoriesController;