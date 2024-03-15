const { Controller, storage } = require("sm-express-server");
const fs = require("fs");
const Response = require("../Modules/Response");

const updateCategories = new Controller({ method: "POST", name: "Update categories", path: "/update_categories", storage: storage("./media").none()}, (req, res, app) => {
    fs.readFile("./Database/categories.json", (err, data) => {
        if (err)
            res.status(5000).send("Error");
        let categories = JSON.parse(data.toString());
        if (req.body.status == "CREATE")
            categories = [...categories, {id: (categories.length + 1) + "", name: req.body.value}];
        if (req.body.status == "DELETE")
            categories = categories.filter(c => c.id !== req.body.value);
        fs.writeFile("./Database/categories.json", JSON.stringify(categories), (err) => {
            if (err)
                res.status(5000).send("Error");
            res.send(new Response(categories));
        })
    })
})

module.exports = updateCategories;