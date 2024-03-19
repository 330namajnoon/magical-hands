const createNewService = require("./CreateNewService.controller");
const discountValidation = require("./DiscountValidation.controller");
const getAdminHoursByDateController = require("./GetAdminHoursByDate.controller");
const getAdminReservationesByDateController = require("./GetAdminReservationesByDate.controller");
const getAvailableHoursByDateController = require("./GetAvailableHoursByDate.controller");
const getCategoriesController = require("./GetCategories.controller");
const getImagesController = require("./GetImages.controller");
const getReservationesByDateController = require("./GetReservationesByDate.controller");
const getServicesController = require("./GetServices.controller");
const getStripeSessionController = require("./GetStripeSesion.controller");
const getTranslationsController = require("./GetTranslations.controller");
const postAdminHoursByDateController = require("./PostAdminHoursByDate.controller");
const postReservationController = require("./PostReservation.controller");
const updateCategories = require("./UpdateCategories.controller");
const updateServiceByIdController = require("./UpdateServiceById.controller");


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
    getTranslationsController,
    updateServiceByIdController,
    createNewService,
    updateCategories,
    discountValidation,
];

module.exports = magicalHandsControllers