const { Controller, storage } = require("sm-express-server");
const fs = require("fs");
const Response = require("../Modules/Response");

const updateServiceByIdController = new Controller({ method: "POST", name: "Git services", path: "/services", storage: storage("./media").single("file") }, (req, res, app) => {
    fs.readFile("./Database/services.json", (err, data) => {
        if (err)
            res.status(5000).send("Error");
        let services = JSON.parse(data.toString());
        let service = JSON.parse(req.body.service);
        if (req.file)
            service.imageURL = "/images/" + req.file.originalname;
        if (req.body.status == "UPDATE") {
            services = services.map(s => s.id == service.id ? service : s);
        }

        if (req.body.status == "DELETE") {
            services = services.filter(s => s.id !== service.id);
        }
        fs.writeFile("./Database/services.json", JSON.stringify(services), (err) => {
            if (err)
                res.status(5000).send("Error");
            res.send(new Response(services));
        })
    })
})

module.exports = updateServiceByIdController;