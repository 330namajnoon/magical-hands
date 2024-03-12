const { Controller, storage } = require("sm-express-server");
const Response = require("../Modules/Response");
const { Stripe } = require("stripe");
const { unCodeToken } = require("../utils/createTokenWithBase");

const stripe = new Stripe("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");

const getStripeSessionController = new Controller({ method: "GET", name: "Git Sprite", path: "/stripeSession/:data", storage: storage("./").none() }, async (req, res, app) => {
    const params = JSON.parse(unCodeToken(req.params.data, "MAGICLHENDS"));
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: params.service,
                        description: params.description,
                    },
                    currency: "EUR",
                    unit_amount: params.price,
                },
                quantity: 1
            },
        ],

        success_url: params.successURL,
        cancel_url: params.cancelURL,
    });
    res.send(new Response(session));
})

module.exports = getStripeSessionController;