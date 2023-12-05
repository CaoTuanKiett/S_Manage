<template>
  <NuxtLayout name="custom">
    <section class="flex items-center justify-center h-screen bg-white">
      <div class="w-full max-w-screen-sm">
        <div class="flex items-center">
          <p class="w-[200px]">Select admin type: </p>
          <select v-model="selectedRoleId"  @change="changeAdmin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
            <option v-for="(role, index) in rolesData" :key="index" :value="role.id_role">{{ role.name_role }}
            </option>
          </select>
        </div> 
        <div class="flex items-center justify-around py-5 rounded-lg bg-surface">
          <div class="p-6 space-y-4">
            <form class="space-y-4 table-auto" action="#">
              
              <tbody>
                <tr v-for="(permission) in permissionData" :key="permission.permission_id">
                  <td class="pb-4">
                    <div class="mx-3">
                      <p>{{ permission.name_permission }}</p>
                    </div>
                  </td>
                  <td class="px-2 py-2">
                    <input :checked="isPermissionChecked(permission.id_permission)"
                      v-model="rolePermission[permission.id_permission]" :id="permission.id_permission" class="w-5 h-5"
                      type="checkbox">
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
import axios, { all } from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification'
const toast = useToast()

const config = useRuntimeConfig();
const URL_BE = config.public.API_BASE_BE;

const rolesData = ref([]);
const permissionData = ref([]);

const selectedRoleId = ref(1)
const rolePermission = ref({})
const allPermission = ref([])

const getRoles = async () => {
  try {
    const response = await axios.get(`${URL_BE}/api/v1/author/get_all_role`);
    rolesData.value = response.data.roles;
    console.log(rolesData.value)
  } catch (error) {
    console.error(error);
    rolesData.value = [];
  }
};

const getPermission = async () => {
  try {
    const response = await axios.get(`${URL_BE}/api/v1/author/get_all_permission`);
    permissionData.value = response.data.permissions;
    console.log(permissionData.value)
  } catch (error) {
    console.error(error);
    permissionData.value = [];
  }
};

const changeAdmin = async () => {
  try {
    const response = await axios.get(`${URL_BE}/api/v1/author/${selectedRoleId.value}/get_permissions/`);
    let permissionsData = response.data

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


    for (const permission of permissionData.value) {
      if (rolePermission.value[permission.id_permission]) {
        allPermission.value.push(permission.id_permission)
      } else if (rolePermission.value[permission.id_permission] === false) {
        allPermission.value.splice(allPermission.value.indexOf(permission.id_permission), 1)
      }
    }

    console.log(allPermission.value)
    await axios.post(`${URL_BE}/api/v1/author/${selectedRoleId.value}/AddPermissions/`, {
      permissions: allPermission.value
    }).then(response => {
      console.log(response.data)
      toast.success('Assign successfully')

    }).catch(error => {
      console.log(error)
      toast.error('Assign failed')
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
