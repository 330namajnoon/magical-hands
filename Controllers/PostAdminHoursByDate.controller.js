const { Controller, storage } = require("sm-express-server");
const fs = require("fs");
const Response = require("../Modules/Response");

const postAdminHoursByDateController = new Controller({ method: "POST", name: "POST admin hours by date", path: "/adminHours", storage: storage("./").none() }, (req, res, app) => {
    fs.readFile("./Database/adminHours.json", (err, data) => {
        if (err)
            res.status(5000).send("Error");
        /**
         * @type {{date: string, isAvailable: boolean}[]} hours
         */
        const newHours = JSON.parse(req.body.hours);
        let hours = JSON.parse(data.toString());
        if (hours.find(hs => hs.date == newHours.date))
        {
            hours.forEach(h => {
                if (h.date === newHours.date)
                    h.hours = newHours.hours;
            });
        }
        else {
            hours.push(newHours);
        }
        fs.writeFile("./Database/adminHours.json", JSON.stringify(hours), (err) => {
            if (err)
                res.status(5000).send("Error");
            res.send(new Response(JSON.stringify(newHours)));
        })
    })
})

module.exports = postAdminHoursByDateController;