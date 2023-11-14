const jwt = require('jsonwebtoken');
const { cacheService } = require('../services/cacheService');
require('dotenv').config();

const canAccessBy = (...allowedPermissions) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.sendStatus(401);
        }

        const token = authHeader.split(' ')[1];

        await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(401); // invalid token
            }

            const userCache = await cacheService.getOneUser(decoded.id);

            if (!userCache || !userCache.permissions) {
                return res.sendStatus(403); // unauthorized
            }

            const permissionArray = [...allowedPermissions];
            const result = userCache.permissions.map((item) => permissionArray.includes(item)).find((val) => val === true);

            if (!result) {
                return res.sendStatus(403);
            }

            next();
        });
    };
};

module.exports = canAccessBy;