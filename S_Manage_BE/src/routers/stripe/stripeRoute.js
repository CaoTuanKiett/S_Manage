const express = require('express');
const stripeController = require('../../models/stripeController.js');
const stripeRouter = express.Router();

stripeRouter.get('/get-all-payments', stripeController.getAllPayments);
stripeRouter.get('/get-payments/:user_id', stripeController.getPaymentsByUserId);
stripeRouter.get('/get-payment-detail', stripeController.getPaymentDetail);
stripeRouter.get('/get-payment-detail/:paymentID', stripeController.getPaymentDetailByID);
stripeRouter.post('/create-bill', express.json(), express.urlencoded({ extended: true }), stripeController.createBill);
stripeRouter.get('/get-unpaid-bill/:user_id', stripeController.getUnpaidBill);
stripeRouter.post('/stripe-checkout', express.json(), express.urlencoded({ extended: true }), stripeController.createSessionPayment);
stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), stripeController.handleWebhook);
stripeRouter.get('/pay-success', stripeController.handlePaymentSuccess);

module.exports = stripeRouter;