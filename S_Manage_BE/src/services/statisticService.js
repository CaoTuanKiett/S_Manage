const db = require('../database/connectDB');

module.exports = {
    getStatisticUser: async () => {
        const statistics = await db('user')
            .select('major.name_major')
            .count('user.id_user as number_of_user')
            .join('user_roles', 'user.id_user', '=', 'user_roles.user_id')
            .join('roles', 'user_roles.role_id', '=', 'roles.id_role')
            .join('major', 'roles.major_id', '=', 'major.id_major')
            .groupBy('major.name_major');

        return statistics;
    },

    getStatisticMoney: async () => {
        const totalAmountMoneySubquery = db('payment')
            .sum('amount_money')
            .as('Total Amount Money');

        const totalFeeSubquery = db('bill')
            .sum('fee')
            .as('Total Fee');

        const query = db
            .select(totalAmountMoneySubquery, totalFeeSubquery);

        const result = await query;
        const totalAmountMoney = result[0]['Total Amount Money'];
        const totalFee = result[0]['Total Fee'];

        return { totalAmountMoney, totalFee };
    }
};