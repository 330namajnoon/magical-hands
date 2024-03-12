const { Controller, storage } = require("sm-express-server");
const path = require("path");

const getImagesController = new Controller({method:"GET", name:"Git images", path:"/images/:fileName", storage: storage("./").none()}, (req, res, app) => {
    res.sendFile(path.join(__dirname, "../media/" + req.params.fileName));
})

module.exports = getImagesController;