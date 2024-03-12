const { Controller, storage } = require("sm-express-server");
const fs = require("fs");
const Response = require("../Modules/Response");

const getAdminHoursByDateController = new Controller({ method: "GET", name: "Git admin hours by date", path: "/adminHours/:date", storage: storage("./").none() }, (req, res, app) => {
    fs.readFile("./Database/adminHours.json", (err, data) => {
        if (err)
            res.status(5000).send("Error");
        /**
         * @type {{date: string, isAvailable: boolean}[]} hours
         */
        const hours = JSON.parse(data.toString());

        res.send(new Response(JSON.stringify(hours.find((hours) => hours.date == req.params.date) ? hours.find((hours) => hours.date == req.params.date) : { date: req.params.date, hours: [] })));
    })
})

module.exports = getAdminHoursByDateController;