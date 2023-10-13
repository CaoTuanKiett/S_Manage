const stripe = require('stripe');
const env = require('dotenv');
env.config();
const express = require('express');
const db=require('../../database/connectDB')
const stripeRouter = express.Router();
// api tạo due
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
                        name: "Tiền Tháng " + item.month, /// tháng mấy 
                        description: req.body.description /// mô tả

                    },
                    unit_amount: item.price? item.price : 200000 // số tiền mỗi tháng
                },
                quantity: 1 
            }
        }),
        metadata: {
            user_id: req.body.user_id,
            description: req.body.description
        }
    })
    res.json(session.url)
});
stripeRouter.get('/pay-success', async (req, res) => {
    const session_id = req.query.session_id;
    try {
        const session = await stripeInstance.checkout.sessions.retrieve(session_id);
        // const paymentIntentId = session.payment_intent
        // const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
        // const customer = session.customer_details;
        //res.json(session)
        try {
            await db('payment').insert({
                amount_money: session.amount_total,
                user_id: session.metadata.user_id,
                account_name:session.customer_details.name,
                description: session.metadata.description,
                pay_method: session.payment_method_types,
                create_at: new Date(session.created * 1000).toISOString().slice(0, 19).replace('T', ' ')
            });

            res.json("save payment success");
        } catch (error) {
            res.json("can't save the payment. Error message: " + error);
        }
    } catch (error) {
        res.json("error");
    }
});

module.exports = stripeRouter;

