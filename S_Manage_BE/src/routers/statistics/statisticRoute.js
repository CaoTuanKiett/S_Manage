const express = require('express');
const statisticController = require('../../controllers/statisticController');
const statisticRoute = express.Router();

statisticRoute.get('/statistic-user', statisticController.getStatisticUser);
statisticRoute.get('/statistic-money', statisticController.getStatisticMoney);
statisticRoute.get('/list-money/:year', statisticController.listMoney);
statisticRoute.get('/list-year', statisticController.listYear)

module.exports = statisticRoute;