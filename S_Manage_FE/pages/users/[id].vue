
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';

import displayIMG from '../../../middleware/displayIMG';

definePageMeta({
  layout: 'custom'
});

const router = useRouter();
const route = useRoute();
const userId = route.params.id;

const config = useRuntimeConfig();
const URL_BE = config.public.API_BASE_BE;


const dataRole = ref([]);


const DataUser = ref({
  id_user: "",
  name: "",
  age: "",
  gender: "",
  phone: "",
  address: "",
  email: "",
  username: "",
  password: "",
  avatar: "",
  status: "",
  nameRole: "",
  idRole: ""
});

const errorValue = ref({
  id_user: "",
  name: "",
  age: "",
  gender: "",
  phone: "",
  address: "",
  email: "",
  username: "",
  password: "",
  avatar: "",
  status: ""
});

const validate = () => {
  let isValue = true;

  if (DataUser.value.name == "") {
    isValue = false;
    errorValue.value.name = "Name is required";
  } else {
    errorValue.value.name = "";
  }

  if (DataUser.value.age == "") {
    isValue = false;
    errorValue.value.age = "age is required";
  } else {
    errorValue.value.age = "";
  }

  if (DataUser.value.gender == "") {
    isValue = false;
    errorValue.value.gender = "gender is required";
  } else {
    errorValue.value.gender = "";
  }

  if (DataUser.value.phone == "") {
    isValue = false;
    errorValue.value.phone = "phone is required";
  } else {
    errorValue.value.phone = "";
  }

  if (DataUser.value.address == "") {
    isValue = false;
    errorValue.value.address = "address is required";
  } else {
    errorValue.value.address = "";
  }

  if (DataUser.value.email == "") {
    isValue = false;
    errorValue.value.email = "email is required";
  } else {
    errorValue.value.email = "";
  }

  if (DataUser.value.username == "") {
    isValue = false;
    errorValue.value.username = "username is required";
  } else {
    errorValue.value.username = "";
  }

  if (DataUser.value.password == "") {
    isValue = false;
    errorValue.value.password = "password is required";
  } else {
    errorValue.value.password = "";
  }

  if (DataUser.value.avatar == "") {
    isValue = false;
    errorValue.value.avatar = "avatar is required";
  } else {
    errorValue.value.avatar = "";
  }

  if (DataUser.value.status == "") {
    isValue = false;
    errorValue.value.status = "status is required";
  } else {
    errorValue.value.status = "";
  }

  return isValue;
}




const getUser = (id) => {
  axios
    .get(`${URL_BE}/api/v1/users/${id}`)
    .then((response) => {
      const data = response.data[0];
      // console.log(data);

      DataUser.value.id_user = data.id_user;
      DataUser.value.name = data.name;
      DataUser.value.age = data.age;
      DataUser.value.gender = data.gender;
      DataUser.value.phone = data.phone;
      DataUser.value.address = data.address;
      DataUser.value.email = data.email;
      DataUser.value.username = data.username;
      DataUser.value.password = data.password;
      DataUser.value.avatar = data.avatar;
      DataUser.value.status = data.status;
      DataUser.value.nameRole = data.name_role;
      DataUser.value.idRole = data.id_role;

      console.log(DataUser.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getRole = () => {
  axios
    .get(`${URL_BE}/api/v1/author/get_all_role`)
    .then((res) => {
      console.log(res.data);
      return dataRole.value = res.data
    })
    .catch((error) => {
      console.log(error);
    })
}


onMounted(async () => {
  displayIMG("imageInput", "imageDisplay");

  console.log("id", userId);
  if (userId != 0) {
    getUser(userId);

    getRole();

    console.log("img", DataUser.value);
  }




});



const saveUser = () => {
  if (validate()) {
    // Lấy tệp avatar từ input
    const avatarInput = document.getElementById('imageInput');
    const selectedAvatar = avatarInput.files[0];

    const data = DataUser.value;

    console.log("data", data);

    // Tạo FormData để chứa dữ liệu và tệp avatar
    const formData = new FormData();

    // Kiểm tra xem có tệp avatar đã được chọn không
    if (selectedAvatar) {
      formData.append('avatar', selectedAvatar);
    }

    // Thêm dữ liệu người dùng vào FormData
    for (const key in data) {
      formData.append(key, data[key]);
    }


    if (userId) {
      axios
        .put(`${URL_BE}/api/v1/users/${userId}`, formData)
        .then((response) => {
          console.log('Response:', response);
          notify({
            type: 'success',
            title: 'Update success',
            text: 'Update success',
          });
          Cancel();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
};

const Cancel = () => {
  router.go(-1);
}

</script>


<template>
  <div class="px-20 py-10">
    <div class="flex items-center w-20 cursor-pointer">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
      <button class="btn-SignUp hover:opacity-90 w-10 text-[04364A] font-bold border-b-2 border-[04364A] text-left ml-1 "
        @click="Cancel()">
        Back
      </button>
    </div>

    <div class="flex ">

      <form @submit.prevent="saveUser()" class="w-full pr-20 ">
        <div class="flex justify-between ">
          <div class="w-3/5 ">

            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">Họ và tên:</label>
              <input
                class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500"
                name="name" v-model="DataUser.name" type="text" placeholder="name" @blur="validate()"
                :class="{ 'is-invalid': errorValue.name }" />

              <div class="text-left invalid-feedback" v-if="errorValue.name"> {{ errorValue.name }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">Tuổi:</label>
              <input
                class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500"
                name="age" v-model="DataUser.age" type="text" placeholder="age" @blur="validate()"
                :class="{ 'is-invalid': errorValue.age }" />

              <div class="text-left invalid-feedback" v-if="errorValue.age"> {{ errorValue.age }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">Số điện thoại:</label>
              <input
                class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500"
                name="phone" v-model="DataUser.phone" type="text" placeholder="phone" @blur="validate()"
                :class="{ 'is-invalid': errorValue.phone }" />

              <div class="text-left invalid-feedback" v-if="errorValue.phone"> {{ errorValue.phone }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">Địa chỉ:</label>
              <input
                class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500"
                name="age" v-model="DataUser.age" type="text" placeholder="age" @blur="validate()"
                :class="{ 'is-invalid': errorValue.age }" />

              <div class="text-left invalid-feedback" v-if="errorValue.age"> {{ errorValue.age }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">User Name:</label>
              <input
                class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500"
                name="username" v-model="DataUser.username" type="text" placeholder="username" @blur="validate()"
                :class="{ 'is-invalid': errorValue.username }" />

              <div class="text-left invalid-feedback" v-if="errorValue.username"> {{ errorValue.username }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>


            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">Emai:</label>
              <input
                class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500"
                name="email" v-model="DataUser.email" type="text" placeholder="email" @blur="validate()"
                :class="{ 'is-invalid': errorValue.email }" />

              <div class="text-left invalid-feedback" v-if="errorValue.email"> {{ errorValue.email }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">Quyền truy cập:</label>
              <!-- <input 
              class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500" 
              name="role" 
              v-model="DataUser.role"
              type="text" 
              placeholder="role"
              @blur="validate()"
                :class="{'is-invalid': errorValue.role}"
              /> -->

              <div>
                <select name="role" id="role" v-model="DataUser.idRole">
                  <option v-for="role in dataRole.roles" :key="role.id_role" :value="role.id_role"
                    :selected="role.id_role === DataUser.idRole">{{ role.name_role }}</option>
                </select>
              </div>

              <div class="text-left invalid-feedback" v-if="errorValue.role"> {{ errorValue.role }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="relative w-3/4 p-2 mb-4 input">
              <label for="" class="text-base font-semibold text-black">Trạng thái:</label>
              <input
                class="w-full px-3 py-2 pr-12 mt-2 text-base border-2 rounded focus:outline-none placeholder:text-slate-500"
                name="status" v-model="DataUser.status" type="text" placeholder="status" @blur="validate()"
                :class="{ 'is-invalid': errorValue.status }" />

              <div class="text-left invalid-feedback" v-if="errorValue.status"> {{ errorValue.status }} </div>

              <font-awesome-icon class="absolute text-xl cursor-pointer right-6 bottom-5"
                :icon="['fas', 'pen-to-square']" />
            </div>

          </div>

          <div class="flex flex-col items-center justify-start w-2/5">

            <div>
              <img id="imageDisplay" :src="DataUser.avatar" alt="avt"
                class="w-[500px] h-[600px] rounded-3xl shadow-xl object-cover ">

              <input type="file" id="imageInput" name="avatar">
            </div>

            <div class="flex justify-center w-3/4 mt-6">
              <button type="submit"
                class="btn-SignIn hover:opacity-90 bg-[04364A] text-black font-bold py-2 px-10 rounded mr-8">
                Cập nhật thông tin
              </button>
            </div>

          </div>
        </div>







      </form>


    </div>

  </div>
</template>


