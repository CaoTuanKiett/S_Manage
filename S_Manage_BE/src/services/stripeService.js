const db = require('../database/connectDB');
const stripe = require('stripe');
const env = require('dotenv');
env.config();

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

exports.getAllPayments = async () => {
    return await db('payment').select('*');
};

exports.getPaymentsByUserId = async (userId) => {
    return await db('payment').select('*').where('user_id', userId);
};

exports.createBill = async (req) => {
    const { fee_type, fee, description, create_by, payers } = req.body;
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const due_at = new Date();
    due_at.setDate(due_at.getDate() + 30);
    const formatted_due_at = due_at.toISOString().slice(0, 19).replace('T', ' ');

    const newBills = [];
    for (const payer of payers) {
        const newBill = await db('bill').insert({
            fee_type: fee_type,
            fee: fee,
            create_at: created_at,
            due_at: formatted_due_at,
            description: description,
            create_by: create_by,
            payer: payer
        });
        newBills.push(newBill);
    }

    return newBills;
};

exports.getUnpaidBill = async (userId) => {
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
    return unpaidBills;
};

exports.createSessionPayment = async (req) => {
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

    return session.url;
};

exports.handleWebhook = async (req) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
        throw new Error(`Webhook Error: ${error.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            await db('payment').insert({
                amount_money: session.amount_total,
                user_id: session.metadata.user_id,
                account_name: session.customer_details.name,
                description: session.metadata.description,
                pay_method: session.payment_method_types,
                create_at: new Date(session.created * 1000).toISOString().slice(0, 19).replace('T', ' ')
            });
            break;
        // Add other event handlers here
        ///....//
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
};

exports.handlePaymentSuccess = async (session_id) => {
    // Retrieve the payment session from Stripe
    const session = await stripeInstance.checkout.sessions.retrieve(session_id);

    // Handle the payment success
    if (session.payment_status === 'paid') {
        const paymentIntentId = session.payment_intent;
        // Update your database or perform any other actions
        return 'Payment success';
    } else {
        throw new Error('Payment failed');
    }
};