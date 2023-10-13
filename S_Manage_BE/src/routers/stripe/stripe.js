const stripe = require('stripe');
const env = require('dotenv');
env.config();
const express = require('express');
const stripeRouter = express.Router();

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
stripeRouter.post('/stripe-checkout', async (req, res) => {
    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${encodeURI(JSON.stringify(req.body))}`,
        cancel_url: `${process.env.DOMAIN}/checkout?payment_fail=true`,
        line_items: req.body.items.map(item => {
            return {
                price_data: {
                    currency: "vnd",
                    product_data: {
                        name: item.name,
                        description: item.shortDes,
                    },
                    unit_amount: item.price
                },
                quantity: item.quantity
            }
        })
    })
    res.json(session.url)
});
stripeRouter.get('/pay-success', async (req, res) => {
    const session_id = req.query.session_id;
    try {
        const session = await stripeInstance.checkout.sessions.retrieve(session_id);
        const customer = session.customer_details
        res.json(customer)
    } catch (error) {
        res.json("bug")
    }
})

module.exports = stripeRouter;

