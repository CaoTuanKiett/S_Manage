const knex = require('../database/connectDB')

class roleService {
    async createRole(roleName, major_id) {
        const [roleId] = await knex('roles').insert({ name_role: roleName, major_id: major_id });
        return roleId;
    }

    async deleteRole(roleId) {
        await knex('roles').where('id_role', roleId).del();
    }

    async updateRole(roleId, roleName, major_id) {
        await knex('roles').where('id_role', roleId).update({ name_role: roleName, major_id: major_id });
    }

    async assignPermissionToRole(roleId, permission) {
        await knex('role_permissions').insert({ role_id: roleId, permission_id: permission });
    }

    async revokePermissionFromRole(roleId, permission) {
        await knex('role_permissions').where({ role_id: roleId, permission_id: permission }).del();
    }

    async updatePermission(permission_id, permission_name) {
        await knex('permission').where('permission_id', permission_id).update({ permission_name: permission_name });
    }

    async getRolePermissions(roleId) {
        const permissions = await knex('role_permissions')
            .join('permission', 'role_permissions.permission_id', 'permission.permission_id')
            .where('role_permissions.role_id', roleId)
            .select('permission.permission_name');
        return permissions.map((permission) => permission.permission_name);
    }

    async getAllRole() {
        const roles = await knex('roles')
            .select('*');
        return roles;
    }
    async getPermission() {
        const permissions = await knex('permision').select('*');
        return permissions;
    }

    async hasPermission(roleId, permission_id) {
        const permissions = await knex('role_permissions')
            .join('permission', 'role_permissions.permission_id', 'permission.permission_id')
            .where('role_permissions.role_id', roleId)
            .select('permission.permission_id');

        return permissions.map((perm) => perm.permission_id).includes(parseInt(permission_id));
    }
}
module.exports = roleService;
