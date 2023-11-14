const express = require('express');
const stripeController = require('../../controllers/stripeController.js');
const stripeRouter = express.Router();

stripeRouter.get('/get-all-payments', stripeController.getAllPayments);
stripeRouter.get('/get-payments/:user_id', stripeController.getPaymentsByUserId);
stripeRouter.get('/get-payment-detail/:payment_id', stripeController.getPaymentDetail);
stripeRouter.post('/create-bill', express.json(), express.urlencoded({ extended: true }), stripeController.createBill);
stripeRouter.get('/bill', stripeController.getAllBill);
stripeRouter.put('/bill/:id', express.json(), express.urlencoded({ extended: true }), stripeController.updateBill);
stripeRouter.get('/bill/:id', stripeController.getBillByID);
stripeRouter.delete('/bill/:id', stripeController.deleteBill);
stripeRouter.get('/get-unpaid-bill/:user_id', stripeController.getUnpaidBill);
stripeRouter.post('/stripe-checkout', express.json(), express.urlencoded({ extended: true }), stripeController.createSessionPayment);
stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleWebhook);
stripeRouter.get('/pay-success', stripeController.handlePaymentSuccess);

module.exports = stripeRouter;