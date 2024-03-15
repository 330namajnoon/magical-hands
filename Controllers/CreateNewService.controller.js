const { Controller, storage } = require("sm-express-server");
const fs = require("fs");
const Response = require("../Modules/Response");

const createNewService = new Controller({ method: "GET", name: "Create new service", path: "/create_new_service", storage: storage("./media").none() }, (req, res, app) => {
    fs.readFile("./Database/services.json", (err, data) => {
        if (err)
            res.status(5000).send("Error");
        let services = JSON.parse(data.toString());
        fs.readFile("./Database/categories.json", (err, data) => {
            if (err)
                res.status(5000).send("Error");
            const categories = JSON.parse(data.toString());
            let service = {
                id: "MH-" + services.length,
                name: "NEW SERVICE",
                title: "TITLE",
                imageURL: "/images/image-upload.jpg",
                description: "DESCRIPTION",
                price: "PRICE (NUMBER)",
                time: "TIME (NUMBER)",
                category: categories.map(c => c.id),
            };
            services.unshift(service);
            fs.writeFile("./Database/services.json", JSON.stringify(services), (err) => {
                if (err)
                    res.status(5000).send("Error");
                res.send(new Response(services));
            })
        })
    })
})

module.exports = createNewService;