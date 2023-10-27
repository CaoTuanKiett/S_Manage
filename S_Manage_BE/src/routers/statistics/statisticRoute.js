const express = require('express');
const statisticController = require('../../models/statisticController');
const statisticRoute = express.Router();

statisticRoute.get('/statistic-user', statisticController.getStatisticUser);
statisticRoute.get('/statistic-money', statisticController.getStatisticMoney);

module.exports = statisticRoute;