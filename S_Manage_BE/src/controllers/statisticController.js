const statisticService = require('../models/statisticService');

module.exports = {
    getStatisticUser: async (req, res) => {
        try {
            const statistics = await statisticService.getStatisticUser();
            res.status(200).json(statistics);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching user statistics' + error });
        }
    },

    getStatisticMoney: async (req, res) => {
        try {
            const statistics = await statisticService.getStatisticMoney();
            res.status(200).json(statistics);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching money statistics' + error });
        }
    }

    ,
    listMoney: async (req, res) => {
        try {
            const { year } = req.params;
            const statistics = await statisticService.listmoney(year);
            res.status(200).json(statistics);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching money statistics' + error });
        }
    },

    listYear: async (req, res) => {
        try {
            const ListYear = await statisticService.getYears();
            res.status(200).json(ListYear);
        }catch (error) {
            res.status(500).json({ error });
        }
    }
};