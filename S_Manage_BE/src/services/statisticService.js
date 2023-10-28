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
    },
    listmoney: async (year) => {
        try {
            const list = await db
                .distinct('user.id_user', 'user.name', 'major.name_major', 'bill.month', 'bill.bill_id')
                .select(
                    'user.id_user',
                    'user.name',
                    'major.name_major',
                    'bill.month',
                    'bill.bill_id',
                    db.raw(`CASE
                    WHEN bill_payment.bill_id IS NOT NULL AND bill_payment.payment_id IS NOT NULL THEN 'paid'
                    ELSE 'unpaid'
                END as bill_status`)
                )
                .from('user')
                .join('user_roles', 'user.id_user', 'user_roles.user_id')
                .join('roles', 'user_roles.role_id', 'roles.id_role')
                .join('major', 'roles.major_id', 'major.id_major')
                .leftJoin('bill', 'bill.payer', 'user.id_user')
                .leftJoin('bill_payment', 'bill.bill_id', 'bill_payment.bill_id')
                .leftJoin('payment', 'bill_payment.payment_id', 'payment.id_payment')
                .whereRaw(`bill.year= ${year}`)
                .orderBy('user.id_user')
                .orderBy('bill.month');
            const mergedData = list.reduce((result, item) => {
                const { id_user, name, name_major, ...rest } = item;
                const key = `${id_user}_${name}_${name_major}`;

                if (!result[key]) {
                    result[key] = {
                        id_user,
                        name,
                        name_major,
                        unpaidMonths: 0, // Thêm trường để lưu số tháng unpaid
                        bills: []
                    };
                }

                if (rest.bill_status === 'unpaid') {
                    result[key].unpaidMonths++; // Tăng số tháng unpaid khi trạng thái là 'unpaid'
                }
                result[key].bills.push(rest);

                return result;
            }, {});
            const finalResult = Object.values(mergedData);
            return finalResult;
        }
        catch (error) {
            console.error('Lỗi truy vấn: ' + error);
            throw error;
        }
    }
}