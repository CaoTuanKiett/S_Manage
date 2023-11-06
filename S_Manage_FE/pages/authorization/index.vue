<template>
    <NuxtLayout name="admin">
        <section class="bg-background flex items-center justify-center h-screen">
            <div class="w-full max-w-screen-sm">
                <div class="bg-surface py-5 rounded-lg flex justify-center items-center" style="height: 400px;">
                    <div class="p-6 space-y-4">
                        <form class="table-auto space-y-4" action="#">
                            <select v-model="selectedRoleId" placeholder="Select admin type" style="width:300px"
                                @change="changeAdmin">
                                <option v-for="(roles, i) in rolesData.roles" :key="i" :value="roles.id_role">{{ roles.name_role }}
                                </option>
                            </select>
                            <tbody>
                                <tr v-for="(permission, i) in permissionData.permissions" :key="permission.id_permission">
                                    <td class="pb-4">
                                        <div class="mx-3">
                                            <p>{{ permission.name_permission }}</p>
                                        </div>
                                    </td>
                                    <td class="px-2 py-2">
                                        <input v-model="rolePermission[permission.id_permission]"
                                            :id="permission.id_permission" class="h-5 w-5" type="checkbox">
                                            
                                    </td>
                                </tr>
                            </tbody>
                        </form>
                    </div>
                    <VBtn class="bg-primary" @click="assignRoles">Assign</VBtn>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>


<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const rolesData = ref([]);
const permissionData = ref([]);

const selectedRoleId = ref(null)
const rolePermission = ref({})


const getRoles = async () => {
    try {
        const response = await axios.get('http://localhost:9696/api/v1/author/get_all_role');
        rolesData.value = response.data;
        console.log(rolesData.value.roles)
    } catch (error) {
        console.log(error);
        rolesData.value = [];
    }
};

const getPermission = async () => {
    try {
        const response = await axios.get('http://localhost:9696/api/v1/author/get_all_permission');
        permissionData.value = response.data;
        console.log(permissionData.value.permissions)
    } catch (error) {
        console.log(error);
        permissionData.value = [];
    }
};

const changeAdmin = async () => {
    try {
        const response = await axios.get(`http://localhost:9696/api/v1/author/${selectedRoleId.value}/get_permissions/`);
        let permissions = response.data.permissions

        console.log(response.data)

        console.log(permissions)
        rolePermission.value = {}
        for (const permission of permissionData.value) {
            rolePermission.value[permission.id_permission] =  permissions.some(perm => perm.id_permission === permission.id_permission);
        }

    } catch (error) {
        console.log(error);

    }
};

const assignRoles = async () => {
    try {
        const permissionsToAssign = [];
        const permissionsToDelete = [];
        for (const permission of permissionData.value.permissions) {
            if (rolePermission.value[permission.id_permission]) {
                permissionsToAssign.push(permission.id_permission);
            } else {
                permissionsToDelete.push(permission.id_permission);
            }
        }

        if (permissionsToAssign.length > 0) {
            await axios.post(`http://localhost:9696/api/v1/author/${selectedRoleId.value}/AddPermissions/`, {
                permission: permissionsToAssign

            });
        }
        if (permissionsToDelete.length > 0) {
            await axios.delete(`http:localhost:9696/api/v1/author/${selectedRoleId.value}/DeletePermissions/`, {
                permission: permissionsToDelete
            });
        }

        if (permissionsToAssign.length > 0 || permissionsToDelete.length > 0) {
            console.log('Role has been assigned successfully!');
            window.location.reload();
        } else {
            console.log('Failed to assign role.');
        }
    } catch (error) {
        console.log(error);
    }
};

onMounted(async () => {
    await getRoles();
    await getPermission();

});
</script>