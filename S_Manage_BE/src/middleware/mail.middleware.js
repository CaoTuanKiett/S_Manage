const knex = require('../database/connectDB');


class mailMiddlware {

    async createRandomToken() {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return token;
    }
    async FindUserToResetPass(email, passwordResetToken) {
        if (!email || Object.keys(email).length === 0) {
            throw new Error('Email not found');
        }
        try {
            const result = await this.db.promise().query(
                'SELECT * FROM user WHERE email = ? AND passwordResetToken = ?',
                [email, passwordResetToken, new Date(Date.now())]
            );
            const users = result[0];
            const user = users[0];
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }


}

module.exports = new mailMiddlware();