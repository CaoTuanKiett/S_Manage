const jsonwebtoken = require('jsonwebtoken');
const role = require('../models/roleService')
const roleService = new role();
function checkRoleHasPermission(permission) {
    return async (req, res, next) => {
        const author = req.headers.authorization.substring(7);
        const role = jsonwebtoken.verify(author, process.env.secretKey).role;
        // Kiểm tra quyền truy cập
        if (await roleService.hasPermission(role, permission)) {
            next(); // Cho phép truy cập tiếp theo
        } else {
            res.status(403).json({ message: 'Access denied' });
            console.log("access denied"); // Truy cập bị từ chối
        }
    };
}

module.exports = { checkRoleHasPermission };