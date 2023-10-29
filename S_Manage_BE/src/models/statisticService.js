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
                .distinct('user.id_user', 'user.name', 'major.name_major', 'bill.month', 'payment_summary.bill_id')
                .select(
                    'user.id_user',
                    'user.name',
                    'major.name_major',
                    'bill.month',
                    'payment_summary.bill_id',
                    db.raw(`CASE WHEN payment_summary.total_amount >= bill.fee THEN 'paid'         
                    ELSE 'unpaid'       
                    END AS bill_status`)
                )
                .from('user')
                .join('user_roles', 'user.id_user', 'user_roles.user_id')
                .join('roles', 'user_roles.role_id', 'roles.id_role')
                .join('major', 'roles.major_id', 'major.id_major')
                .leftJoin('bill', 'bill.payer', 'user.id_user')
                .leftJoin(
                    db
                        .select('bill_payment.bill_id', db.raw('SUM(amount) AS total_amount'))
                        .from('bill_payment')
                        .groupBy('bill_payment.bill_id')
                        .as('payment_summary'),
                    'bill.bill_id',
                    'payment_summary.bill_id'
                )
                .where('bill.year', '2023')
                .orderBy('user.id_user')
                .orderBy('bill.month');
            //console.log(list);
            const mergedData = list.reduce((result, item) => {
                const { id_user, name, name_major, ...rest } = item;
                const key = `${id_user}_${name}_${name_major}`;
                //console.log(rest);
                if (!result[key]) {
                    result[key] = {
                        id_user,
                        name,
                        name_major,
                        unpaidMonths: 0,
                        bills: []
                    };
                }
                if (rest.bill_status === 'unpaid') {
                    result[key].unpaidMonths++; // Tăng số tháng unpaid khi trạng thái là 'unpaid'
                }
                result[key].bills.push(rest);
                //console.log(result[key].bills);
                return result;
            }, {}); const finalResult = Object.values(mergedData).map((item) => {
                const { id_user, name, name_major, bills } = item;
                const billMap = {};

                bills.forEach((bill) => {
                    const { month, bill_id, bill_status } = bill;
                    billMap[month] = {
                        bill_id: bill_id,
                        bill_status: bill_status
                    };
                });

                const finalBills = [];
                for (let month = 1; month <= 12; month++) {
                    const bill = billMap[month] || {
                        bill_id: null,
                        bill_status: 'unchanged'
                    };
                    finalBills.push({
                        month,
                        ...bill
                    });
                }

                return {
                    id_user,
                    name,
                    name_major,
                    unpaidMonths: item.unpaidMonths,
                    bills: finalBills
                };
            });

            return finalResult;
        } catch (error) {
            console.error('Lỗi truy vấn: ' + error);
            throw error;
        }
    }
};