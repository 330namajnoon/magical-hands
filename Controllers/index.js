const getAdminHoursByDateController = require("./GetAdminHoursByDate.controller");
const getAdminReservationesByDateController = require("./GetAdminReservationesByDate.controller");
const getAvailableHoursByDateController = require("./GetAvailableHoursByDate.controller");
const getCategoriesController = require("./GetCategories.controller");
const getImagesController = require("./GetImages.controller");
const getReservationesByDateController = require("./GetReservationesByDate.controller");
const getServicesController = require("./GetServices.controller");
const getStripeSessionController = require("./GetStripeSesion.controller");
const postAdminHoursByDateController = require("./PostAdminHoursByDate.controller");
const postReservationController = require("./PostReservation.controller");

const magicalHandsControllers = [
    getServicesController,
    getCategoriesController,
    getImagesController,
    getReservationesByDateController,
    postReservationController,
    getStripeSessionController,
    getAdminReservationesByDateController,
    getAdminHoursByDateController,
    postAdminHoursByDateController,
    getAvailableHoursByDateController,
];

module.exports = magicalHandsControllers