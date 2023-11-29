const expireCache = require('expire-cache');
const db = require('../database/connectDB');

const cacheService = {
    async setOneUser(userId) {
        const rolePermissions = await db
            .select('r.id_role AS role', 'p.permission_id AS permission')
            .from('roles AS r')
            .join('user_roles AS ur', 'r.id_role', '=', 'ur.role_id')
            .leftJoin('role_permissions AS rp', 'r.id_role', '=', 'rp.role_id')
            .leftJoin('permission AS p', 'rp.permission_id', '=', 'p.permission_id')
            .where('ur.userId', userId);

        const roles = Array.from(new Set(rolePermissions.map((item) => item.role)));
        const permissions = Array.from(
            new Set(rolePermissions.filter((item) => item.permission != null).map((item) => item.permission))
        );
        const userCache = expireCache.namespace('userCache');
        userCache.set(userId, { roles, permissions }, process.env.JWT_EXPIRE_TIME);
    },
    async getOneUser(userId) {
        const userCache = expireCache.namespace('userCache');
        if (!userCache) {
            return null;
        }
        var data = userCache({ userId });
        return data;
    },
    async getAllUser() {
        const userCache = expireCache.namespace('userCache');
        if (!userCache) {
            return null;
        }
        var data = userCache();
        return data;
    },
};

Object.freeze(cacheService);

module.exports = {
    cacheService,
};