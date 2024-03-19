const { Controller, storage } = require("sm-express-server");
const fs = require("fs");
const Response = require("../Modules/Response");

const discountValidation = new Controller({ method: "GET", name: "Discount Validation", path: "/discount_code_validation", storage: storage("./").none() }, (req, res, app) => {
    fs.readFile("./Database/discounts.json", (err, data) => {
        if (err)
            res.status(500).send(err);

        /**
         * @type {{id: number, code: string, services: string[], calculation: string}[]} discounts
         */
        const discounts = JSON.parse(data.toString());

        /**
         * @type {{id: number, code: string, services: string[], calculation: string}} discount
         */
        const discount = discounts.find(d => d.code == req.query.code);
        if (discount) {
            if (discount.services.find(s => s == req.query.serviceId)) {
                res.send(new Response(discount));
            } else {
                res.status(502).json({code: 502});
            }
        } else {

            res.status(501).json({code: 502});
        }

    })
});

module.exports = discountValidation;