const express = require('express');
const router = express.Router();
require('dotenv').config();

const mailController = require('../controllers/mail.controler');

const mailRouter = (app) => {
  router.get('/selectUserLate', mailController.selectUserLate); // localhost:8080/api/v1/mail/selectUserLate

  return app.use(`${process.env.API_V1}/mail`, router);
}

module.exports = mailRouter;