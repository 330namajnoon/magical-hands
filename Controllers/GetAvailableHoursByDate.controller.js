const { Controller, storage } = require("sm-express-server");
const fs = require ("fs");
const Response = require("../Modules/Response");

const getAvailableHoursByDateController = new Controller({method:"GET", name:"Git reservationes by date", path:"/availableHours/:date", storage: storage("./").none()}, (req, res, app) => {
    fs.readFile("./Database/adminHours.json", (err, data) => {
        if(err)
            res.status(5000).send("Error");
        /**
         * @type {{date: string, hours: {hour: string, isAvailable: boolean}[]}[]} reservationes
         */
        const availableHours = JSON.parse(data.toString());
        const find = availableHours.filter(res => res.date == req.params.date);
        res.send(new Response(find[0] ? find[0].hours : []));
    })    
})

module.exports = getAvailableHoursByDateController;