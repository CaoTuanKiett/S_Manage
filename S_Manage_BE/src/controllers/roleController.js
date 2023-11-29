const roleService = require('../models/roleService');

class RoleController {
    constructor() {
        this.roleService = new roleService();
    }

    async createRole(req, res) {
        try {
            const { roleName, major_id } = req.body;
            const roleId = await this.roleService.createRole(roleName, major_id);
            res.status(200).json({ message: 'Role added', roleId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create role', error });
        }
    }

    async deleteRole(req, res) {
        try {
            const { roleId } = req.params;
            await this.roleService.deleteRole(roleId);
            res.status(200).json({ message: 'Role deleted' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to delete role', error });
        }
    }
    async updateRole(req, res) {
        try {
            const { roleId } = req.params;
            const { roleName, major_id } = req.body;
            await this.roleService.updateRole(roleId, roleName, major_id);
            res.status(200).json({ message: "Role Updated" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to updated role', error });
        }
    }
    async assignPermissionToRole(req, res) {
        try {
            const { roleId } = req.params
            const { permissions } = req.body;
            await this.roleService.assignPermissionToRole(roleId, permissions);
            res.status(200).json({ message: 'Permission assigned to role' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to assign permission to role'+ error });
        }
    }

    async revokePermissionFromRole(req, res) {
        try {
            const { roleId } = req.params
            const { permission } = req.body;
            await this.roleService.revokePermissionFromRole(roleId, permission);
            res.status(200).json({ message: 'Permission revoked from role' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to revoke permission from role', error });
        }
    }

    async updatePermission(req, res) {
        try {
            const { permission_id } = req.params;
            const { permission_name } = req.body;
            await this.roleService.updatePermission(permission_id, permission_name);
            res.status(200).json({ message: "Permission Updated" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to updated Permission', error });
        }
    }

    async getRolePermissions(req, res) {
        try {
            const { roleId } = req.params;
            const permissions = await this.roleService.getRolePermissions(roleId);
            res.status(200).json({ permissions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to get role permissions', error });
        }
    }

    async getAllRole(req, res) {
        try {
            const roles = await this.roleService.getAllRole();
            res.status(200).json({roles});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to get all role', error });
        }
    }

    async getAllPermission(req,res){
        try {
            const permissions = await this.roleService.getAllPermission();
            res.status(200).json({permissions})
        } catch (error) {
            console.log(error)
                        res.status(500).json({ message: 'Failed to get all permission', error });

        }
    }

    async hasPermission(req, res) {
        try {
            const { roleId, permission } = req.params;
            const hasPermission = await this.roleService.hasPermission(roleId, permission);
            res.status(200).json({ hasPermission });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to check role permission', error });
        }
    }
}

module.exports = RoleController;
