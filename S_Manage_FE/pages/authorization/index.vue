<template>
    <NuxtLayout name="admin">
        <section class="bg-background flex items-center justify-center h-screen">
            <div class="w-full max-w-screen-sm">
                <div class="bg-surface py-5 rounded-lg flex justify-center items-center" style="height: 400px;">
                    <div class="p-6 space-y-4">
                        <form class="table-auto space-y-4" action="#">
                            <select v-model="roleSelected.role_id" placeholder="Select admin type" style="width:300px"
                                @change="changeAdmin">
                                <option v-for="(role, i) in rolesData" :key="i" :value="role.role_id">{{ role.name_role }}
                                </option>
                            </select>
                            <tbody>
                                <tr v-for="permission in permissionData" :key="permission.permission_id">
                                    <td class="pb-4">
                                        <div class="mx-3">
                                            <p>{{ permission.name_permission }}</p>
                                        </div>
                                    </td>
                                    <td class="px-2 py-2"  >
                                        <input v-model="roleSelected.rolePermission"  class="h-5 w-5" type="checkbox"
                                             >
                                       
                                    </td>
                                </tr>
                            </tbody>
                        </form>
                    </div>
                   <VBtn class="bg-primary" @click="assignRoles" >Assign</VBtn>
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
const roleSelected = ref({
    role_id: null,
    rolePermission:null
});

const permission = ref('');

const getRoles = async () => {
    try {
        const response = await axios.get('http://localhost:8080/author/get_all_role');
        rolesData.value = response.data;
        console.log(rolesData.value)
    } catch (error) {
        console.error(error);
        rolesData.value = [];
    }
};

const getPermission = async () => {
    try {
        const response = await axios.get('http://localhost:8080/author/get_all_permission');
        permissionData.value = response.data;
        console.log(permissionData.value)
    } catch (error) {
        console.error(error);
        permissionData.value = [];
    }
};

const changeAdmin = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/author/${roleSelected.value.role_id}/get_permissions/`);
        console.log(roleSelected.value.role_id)
        
        roleSelected.value.rolePermission = response.data.permissions.map(item => item.permission_id);
         console.log(roleSelected.value.rolePermission)
       
    } catch (error) {
        console.error(error);
        roleSelected.value.rolePermission = []
    }
};

const assignRoles = async () => {
    try { 
         permission.value = roleSelected.value.rolePermission
        const response = await axios.post(`http://localhost:8080/${roleSelected.value.role_id}/author/AddPermissions/`,{
            permission: parseInt(permission.value)
        });
        if (response.status === 200) {
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