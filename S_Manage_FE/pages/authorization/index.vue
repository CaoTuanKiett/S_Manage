<template>
    <NuxtLayout name="admin">
        <section class="bg-background flex items-center justify-center h-screen">
            <div class="w-full max-w-screen-sm">
                <div class="bg-surface py-5 rounded-lg flex justify-center items-center" style="height: 400px;">
                    <div class="p-6 space-y-4">
                        <form class="table-auto space-y-4" action="#">
                            <select v-model="selectedRoleId" placeholder="Select admin type" style="width:300px"
                                @change="changeAdmin">
                                <option v-for="(role, i) in rolesData" :key="i" :value="role.id_role">{{ role.name_role }}
                                </option>
                            </select>
                            <tbody>
                                <tr v-for="(permission, i) in permissionData" :key="permission.permission_id">
                                    <td class="pb-4">
                                        <div class="mx-3">
                                            <p>{{ permission.name_permission }}</p>
                                        </div>
                                    </td>
                                    <td class="px-2 py-2">
                                        <input :checked="isPermissionChecked(permission.id_permission)"
                                            v-model="rolePermission[permission.id_permission]"
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

const selectedRoleId = ref(1)
const rolePermission = ref({})
const allPermission = ref([])

const getRoles = async () => {
    try {
        const response = await axios.get('http://localhost:9696/api/v1/author/get_all_role');
        rolesData.value = response.data.roles;
        console.log(rolesData.value)
    } catch (error) {
        console.error(error);
        rolesData.value = [];
    }
};

const getPermission = async () => {
    try {
        const response = await axios.get('http://localhost:9696/api/v1/author/get_all_permission');
        permissionData.value = response.data.permissions;
        console.log(permissionData.value)
    } catch (error) {
        console.error(error);
        permissionData.value = [];
    }
};

const changeAdmin = async () => {
    try {
        const response = await axios.get(`http://localhost:9696/api/v1/author/${selectedRoleId.value}/get_permissions/`);
        let permissionsData = await response.data

        if (!Array.isArray(permissionsData)) {
            permissionsData = Object.values(permissionsData);
        }
        allPermission.value = []
        for (let permission of permissionsData) {
            permission.forEach((item) => {
                allPermission.value.push(item.id_permission);
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const assignRoles = async () => {
    try {
        const permissionsToAssign = [];
        // const permissionsToDelete = [];
        for (const permission of permissionData.value) {
            if (rolePermission.value[permission.id_permission]) {
                permissionsToAssign.push(permission.id_permission);
            }
        }
        await axios.post(`http://localhost:9696/api/v1/author/${selectedRoleId.value}/AddPermissions/`, {
            permissions: permissionsToAssign
        }).then(response => {
            console.log(response.data)
            window.location.reload()
        }).catch(error => {
            console.log(error)
        })
    } catch (error) {
        console.log(error);
    }
};
const isPermissionChecked = (permissionId) => {
    if (allPermission.value.includes(permissionId)) {
        return true;
    } else {
        return false;
    }
}
onMounted(async () => {
    await getRoles();
    await getPermission();
    await changeAdmin()
});
</script>