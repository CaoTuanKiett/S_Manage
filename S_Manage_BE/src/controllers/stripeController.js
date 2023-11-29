const stripeService = require('../models/stripeService');

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await stripeService.getAllPayments();
        res.status(200).json({ payments });
    } catch (error) {
        console.error('Error getting payments:', error);
        res.status(500).json({ error: 'An error occurred while getting the payments' });
    }
};
exports.getPaymentDetail = async (req, res) => {
    try {
        const payment_id = req.params.payment_id;
        const paymentDetail = await stripeService.getPaymentDetail(payment_id);
        res.status(200).json({ paymentDetail });
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
exports.getAllBill = async(req,res)=> {
    try {
        const newBills = await stripeService.getAllBill(req);
        res.status(200).json({ message: 'get bill successfully', bill: newBills });
    } catch (error) {
        console.error('Error get bill:', error);
        res.status(500).json({ error: 'An error occurred while get the bill' });
    }
}
exports.createBill = async (req, res) => {
    try {
        const newBills = await stripeService.createBill(req);
        res.status(200).json({ message: 'Bill created successfully', bill: newBills });
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ error: 'An error occurred while creating the bill' });
    }
};
exports.updateBill = async (req, res) => {
    const billId = req.params.id;
    const { fee_type, fee, description, payer, year, month } = req.body;

    try {
        const updatedBill = await stripeService.updateBill(
            billId,
            fee_type,
            fee,
            description,
            payer,
            year,
            month
        );

        if (updatedBill) {
            return res.json({ message: 'Bill updated successfully' });
        } else {
            return res.status(404).json({ message: 'Bill not found' + error });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error });
    }
};
exports.getBillByID = async (req, res) => {
    const billId = req.params.id;


        const bill = await stripeService.getBillByID(billId);

        if (bill!=null) {
            return res.json( bill );
        } else {
            return res.status(404).json({ message: 'Bill not found' });
        }
};
exports.deleteBill = async (req, res) => {
    const billId = req.params.id;

    try {
        const deletedBill = await stripeService.deleteBill(billId);

        if (deletedBill) {
            return res.json({ message: 'Bill deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Bill not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' + error });
    }
};
exports.getUnpaidBill = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const unpaidBills = await stripeService.getUnpaidBill(userId);
        res.status(200).json({ unpaidBills });
    } catch (error) {
        console.error('Error getting unpaid bill:', error);
        res.status(500).json({ error: 'An error occurred while getting the unpaid bill' +error });
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
        res.status(500).json({ error: 'An error occurred while processing the webhook' +error});
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