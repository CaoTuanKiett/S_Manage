const stripeService = require('./stripeService');

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await stripeService.getAllPayments();
        res.status(200).json({ payments });
    } catch (error) {
        console.error('Error getting payments:', error);
        res.status(500).json({ error: 'An error occurred while getting the payments' });
    }
};

exports.getPaymentsByUserId = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const payments = await stripeService.getPaymentsByUserId(userId);
        res.status(200).json({ payments });
    } catch (error) {
        console.error('Error getting payments:', error);
        res.status(500).json({ error: 'An error occurred while getting the payments' });
    }
};

exports.createBill = async (req, res) => {
    try {
        const newBills = await stripeService.createBill(req);
        res.status(200).json({ message: 'Bill created successfully', bill: newBills });
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ error: 'An error occurred while creating the bill' });
    }
};

exports.getUnpaidBill = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const unpaidBills = await stripeService.getUnpaidBill(userId);
        res.status(200).json({ unpaidBills });
    } catch (error) {
        console.error('Error getting unpaid bill:', error);
        res.status(500).json({ error: 'An error occurred while getting the unpaid bill' });
    }
};

exports.createSessionPayment = async (req, res) => {
    try {
        const sessionUrl = await stripeService.createSessionPayment(req);
        res.json(sessionUrl);
    } catch (error) {
        console.error('Error creating session payment:', error);
        res.status(500).json({ error: 'An error occurred while creating the session payment' });
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        await stripeService.handleWebhook(req);
        res.status(200).json('Webhook processed successfully');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'An error occurred while processing the webhook' });
    }
};

exports.handlePaymentSuccess = async (req, res) => {
    const session_id = req.query.session_id;
    try {
        const message = await stripeService.handlePaymentSuccess(session_id);
        res.json(message);
    } catch (error) {
        console.error('Error handling payment success:', error);
        res.status(500).json({ error: 'An error occurred while handling the payment success' });
    }
};