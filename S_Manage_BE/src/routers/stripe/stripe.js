const stripe = require('stripe');
const env = require('dotenv');
env.config();
const express = require('express');
const db = require('../../database/connectDB')
const stripeRouter = express.Router();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

//api get all payment
stripeRouter.get('/get-all-payments', async (req, res) => {
    try {
        const payments = await db('payment').select('*');
        res.status(200).json({ payments });
    } catch (error) {
        console.error('Error getting payments:', error);
        res.status(500).json({ error: 'An error occurred while getting the payments' });
    }
})
// api get payment by userid
stripeRouter.get('/get-payments/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_id;
        const payments = await db('payment').select('*').where('user_id', userId);
        res.status(200).json({ payments });
    } catch (error) {
        console.error('Error getting payments:', error);
        res.status(500).json({ error: 'An error occurred while getting the payments' });
    }
})
//api create bill
stripeRouter.post('/create-bill', express.json(), express.urlencoded({ extended: true }), async (req, res) => {
    try {
        // Lấy thông tin từ request body
        const { fee_type, fee, description, create_by, payers, month, year } = req.body;
        const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const due_at = new Date();
        due_at.setDate(due_at.getDate() + 30);
        const formatted_due_at = due_at.toISOString().slice(0, 19).replace('T', ' ');
        // const author = req.headers.authorization.substring(7);
        // const create_by = jsonwebtoken.verify(author, process.env.secretKey).id;
        const newBills = [];
        // Thực hiện insert vào bảng "bill"
        for (const payer of payers) {
            const newBill = await db('bill').insert({
                fee_type: fee_type,
                fee: fee,
                create_at: created_at,
                due_at: formatted_due_at,
                description: description,
                create_by: create_by,
                payer: payer,
                month: month,
                year: year
            });
            newBills.push(newBill);
        }
        res.status(200).json({ message: 'Bill created successfully', bill: newBills });
    } catch (error) {
        // Xử lý lỗi 
        console.error('Error creating bill:', error);
        res.status(500).json({ error: 'An error occurred while creating the bill' });
    }
})

stripeRouter.get('/get-unpaid-bill/:user_id', async (req, res) => {
    try {
        const userId = req.params.user_id;

        const unpaidBills = await db('bill')
            .select('bill_id', 'fee_type', db.raw('fee - (SELECT COALESCE(SUM(amount), 0) FROM bill_payment WHERE bill_payment.bill_id = bill.bill_id) AS unpaid_fee'), 'description', 'payer')
            .where('payer', userId)
            .whereExists(function () {
                this.select('bill_id')
                    .from('bill_payment')
                    .whereRaw('bill_payment.bill_id = bill.bill_id')
                    .groupBy('bill_id')
                    .havingRaw('SUM(amount) < fee');
            })
            .union(function () {
                this.select('bill_id', 'fee_type', 'fee as unpaid_fee', 'description', 'payer')
                    .from('bill')
                    .where('payer', userId)
                    .whereNotExists(function () {
                        this.select('bill_id')
                            .from('bill_payment')
                            .whereRaw('bill_payment.bill_id = bill.bill_id');
                    });
            });

        res.status(200).json({ unpaidBills });
    } catch (error) {
        console.error('Error getting unpaid bill:', error);
        res.status(500).json({ error: 'An error occurred while getting the unpaid bill' });
    }
});

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
                    unit_amount: item.price ? item.price : 200000 // số tiền mỗi tháng
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
stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
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

