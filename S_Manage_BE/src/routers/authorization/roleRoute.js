const express = require('express');
const roleRoute = express.Router();
const RoleController = require('../../controllers/roleController.js');
//const checkAccess = require('../midleware/checkUser').checkAccess;

const roleController = new RoleController();

// Tạo role mới
roleRoute.post('/', async (req, res) => {
    await roleController.createRole(req, res);
});

// Xóa role
roleRoute.delete('/:roleId', async (req, res) => {
    await roleController.deleteRole(req, res);
});
//update role
roleRoute.put('/:roleId', async (req, res) => {
    await roleController.updateRole(req, res);
}),
    // Gán quyền hạn cho role
roleRoute.post('/:roleId/AddPermissions', async (req, res) => {
        await roleController.assignPermissionToRole(req, res);
    });

// Thu hồi quyền hạn từ role
roleRoute.delete('/:roleId/DeletePermissions', async (req, res) => {
    await roleController.revokePermissionFromRole(req, res);
});
//update permission
roleRoute.put('/update_permission/:permission_id', async (req, res) => {
    await roleController.updatePermission(req, res);
}),
    // Lấy danh sách quyền hạn của role
roleRoute.get('/:roleId/get_permissions', async (req, res) => {
        await roleController.getRolePermissions(req, res);
    });
//Select all role
roleRoute.get('/get_all_role', async (req, res) => {
    await roleController.getAllRole(req, res);
});
roleRoute.get('/get_all_permission', async (req, res) => {
    await roleController.getAllPermission(req, res);
})

// Kiểm tra quyền hạn của role
roleRoute.get('/:roleId/has_permission/:permission', async (req, res) => {
    await roleController.hasPermission(req, res);
});

module.exports = roleRoute;
