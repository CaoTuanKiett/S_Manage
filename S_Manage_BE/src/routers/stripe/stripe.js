const stripe = require('stripe');
const env = require('dotenv');
env.config();
const express = require('express');
const db=require('../../database/connectDB')
const stripeRouter = express.Router();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET; 
// api create session payment
stripeRouter.post('/stripe-checkout', express.json(), express.urlencoded({ extended: true }), async (req, res) => {
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
//req co dang :
// {
//     "user_id": "01",
//         "description": "em tuan nop tien thang 10 +13",
//             "items": [
//                 {
//                     "month": 10,
//                     "price": 200000
//                 },
//                 {
//                     "month": 13,
//                     "price": 200000
//                 }
//             ]
// }

//webhook get payment success
stripeRouter.post('/webhook', express.raw({ type: 'application/json' }),async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            //console.log(session);
            try {
                await db('payment').insert({
                    amount_money: session.amount_total,
                    user_id: session.metadata.user_id,
                    account_name: session.customer_details.name,
                    description: session.metadata.description,
                    pay_method: session.payment_method_types,
                    create_at: new Date(session.created * 1000).toISOString().slice(0, 19).replace('T', ' ')
                });
                response.status(200).json("save success")
                console.log("save payment success");
            } catch (error) {
                response.status(400).json("can't save the payment. Error message: " + error)
                console.log("can't save the payment. Error message: " + error);
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
});

stripeRouter.get('/pay-success', async (req, res) => {
    const session_id = req.query.session_id;
    try {
        const session = await stripeInstance.checkout.sessions.retrieve(session_id);
        try {
            await db('payment').insert({
                amount_money: session.amount_total,
                user_id: session.metadata.user_id,
                account_name: session.customer_details.name,
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

