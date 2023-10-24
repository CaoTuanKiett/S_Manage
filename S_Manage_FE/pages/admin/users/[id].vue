
<script setup>

  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import { notify } from '@kyvg/vue3-notification';


  const router = useRouter();
  const route = useRoute();
  const userId = route.params.id;

  const URL_BE = import.meta.env.VITE_APP_BASE_BE || 'http://localhost:8080'

  const tableName = 'user';
  const idUser = 'id_user';
  const name = 'name';
  const age = 'age';
  const gender = 'gender';
  const salt = 'salt';
  const email = 'email';
  const username = 'username';
  const password = 'password';
  const avatar = 'avatar';
  const passwordResetToken = 'password_reset_token';
  const passwordResetExpiration = 'password_reset_expiration';
  const createdAt = 'created_at';
  const createdBy = 'created_by';
  const status = 'status';

  const DataUser = ref({
    id_user: "",
    name: "",
    age: "",
    gender: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
    status: ""
  });

  const errorValue = ref({
    id_user: "",
    name: "",
    age: "",
    gender: "",
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
        console.log(data);

        DataUser.value.id_user = data.id_user;
        DataUser.value.age = data.age;
        DataUser.value.gender = data.gender;
        DataUser.value.email = data.email;
        DataUser.value.username = data.username;
        DataUser.value.password = data.password;
        DataUser.value.avatar = data.avatar;
        DataUser.value.status = data.status;


      })
      .catch((error) => {
        console.log(error);
      });
  };


  onMounted( async () => {
    console.log("id", userId);
    if (userId != 0){
      getUser(userId);
    }
  });


  const saveUser = () => {
    if(validate()){
      if(userId){
        axios
        .put(`${URL_BE}/api/v1/users/${userId}`, DataUser.value)
        .then((response) => {
          console.log(response);
          notify({
            type: 'success',
            title: 'Update success',
            text: 'Update success',
          });
          Cancel();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  };

  const Cancel = () => {
    router.push('/admin/users');
  }

</script>


<template>
 
  <div class="px-20 py-10">
    <div class="w-20  cursor-pointer flex items-center">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
      <button
        class="btn-SignUp hover:opacity-90 w-10 text-[var(--color-primary)] font-bold border-b-2 border-[var(--color-primary)] text-left ml-1 "
        @click="Cancel()"
      >
        Back
      </button>
    </div>

    <div class="flex ">

      <form  
          @submit.prevent="saveUser()"
          class=" w-3/5 pr-20"
          >
            
            <div  class=" w-full">
          
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Họ và tên:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="name" 
                v-model="DataUser.name"
                type="text" 
                placeholder="name"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.name}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.name" > {{errorValue.name }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Tuổi:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="age" 
                v-model="DataUser.age"
                type="text" 
                placeholder="age"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.age}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.age" > {{errorValue.age }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">User Name:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="username" 
                v-model="DataUser.username"
                type="text" 
                placeholder="username"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.username}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.username" > {{errorValue.username }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Mật Khẩu:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="password" 
                v-model="DataUser.password"
                type="text" 
                placeholder="password"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.password}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.password" > {{errorValue.password }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>

            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Trạng thái:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="status" 
                v-model="DataUser.status"
                type="text" 
                placeholder="status"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.status}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.status" > {{errorValue.status }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>

  
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Emai:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="email" 
                v-model="DataUser.email"
                type="text" 
                placeholder="email"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.email}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.email" > {{errorValue.email }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>
  
            <!-- <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Số điện thoại:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="phone" 
                v-model="DataUser.phone"
                type="text" 
                placeholder="phone"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.phone}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.phone" > {{errorValue.phone }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div> -->
  
            <!-- <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Địa chỉ:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="address" 
                v-model="DataUser.address"
                type="text" 
                placeholder="address"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.address}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.address" > {{errorValue.address }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div> -->
  
            <div class="input  p-2 mb-4 w-3/4 relative" >
              <label for="" class="text-base text-black font-semibold">Quyền truy cập:</label>
              <input 
                class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
                name="role" 
                v-model="DataUser.role"
                type="text" 
                placeholder="role"
                @blur="validate()"
                  :class="{'is-invalid': errorValue.role}"
                />
  
                <div class="invalid-feedback text-left" v-if="errorValue.role" > {{errorValue.role }} </div>
  
                <font-awesome-icon 
                  class="absolute right-6 bottom-5 text-xl cursor-pointer"
                  :icon="['fas', 'pen-to-square']" />
            </div>
  
        
  
          <div class="flex justify-center mt-6 w-3/4">
              <button type="submit"  class="btn-SignIn hover:opacity-90 bg-[var(--color-primary)] text-white font-bold py-2 px-10 rounded mr-8">
                Cập nhật thông tin
              </button>
            </div>
        </div>
      </form>
  
      <div class="w-2/5 flex justify-start items-center">
        <img 
          :src="DataUser.avatar" 
          alt="avt"
          class="w-[500px] h-[600px] rounded-3xl shadow-xl "
          >
      </div>
    </div>

  </div>

 

 
</template>


