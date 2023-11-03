
const db = require('../database/connectDB');

class mailModel {

    fetchOutstandingBills  = async () => {
    try {
        const list = await db
            .distinct('user.id_user', 'user.name','user.email','user.avatar', 'major.name_major', 'bill.month', 'bill.id_bill')
            .select(
                'user.id_user',
                'user.email',
                'user.name',
                'user.avatar',
                'major.name_major',
                'bill.month',
                'bill.id_bill',
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
            .leftJoin('bill_payment', 'bill.id_bill', 'bill_payment.bill_id')
            .leftJoin('payment', 'bill_payment.payment_id', 'payment.id_payment')
            .orderBy('user.id_user')
            .orderBy('bill.month');
            
        const mergedData = list.reduce((result, item) => {
            const { id_user, name,email, avatar, name_major, ...rest } = item;
            const key = `${id_user}`;

            if (!result[key]) {
                result[key] = {
                    id_user,
                    name,
                    email,
                    avatar,
                    name_major,
                    unpaidMonths: 0,
                };
            }
            if (rest.bill_status === 'unpaid') {
                result[key].unpaidMonths++; // Tăng số tháng unpaid khi trạng thái là 'unpaid'
            }

            return result;
        }, {});


        return mergedData;
    } catch (error) {
        console.error('Lỗi truy vấn: ' + error);
        throw error;
    }
}

}

module.exports = new mailModel();