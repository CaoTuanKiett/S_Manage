<template>
  <section class="bg-background flex items-center justify-center h-screen">
    <div class="w-full max-w-md">
      <a href="#" class="flex items-center justify-center mb-6 text-2xl font-semibold text-primary">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        S-Manage
      </a>
      <div class="bg-surface rounded-lg shadow border-2 border-gray-700">
        <div class="p-6 space-y-4">
          <h1 class="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900">
            Sign up
          </h1>
          <form @change="register()" class="space-y-4" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-secondary">Name</label>
              <input type="email" name="email" id="email"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                v-model="name" placeholder="Name" required>
            </div>

            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-secondary">Age</label>
              <input type="email" name="email" id="email"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                v-model="age" placeholder="Age" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-secondary">Gender</label>
              <input type="email" name="email" id="email"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                v-model="gender" placeholder="Gender" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-secondary">Username</label>
              <input type="email" name="email" id="email"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                v-model="username" placeholder="Username" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-secondary">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 " required
                v-model="password">
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-secondary">Email</label>
              <input type="email" name="email" id="email"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                v-model="email" placeholder="Email" required>
            </div>

            <v-btn @click="register" block variant="outlined" size="x-large" class="bg-primary mb-4"> Sign Up </v-btn>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios';
import { useNotification } from '@kyvg/vue3-notification';

const notify = useNotification();
const router = useRouter()

const config= useRuntimeConfig();
const URL_BE = config.public.API_BASE_BE;

const username = ref('')
const password = ref('')
const email = ref('')
const name = ref('')
const age = ref('')
const gender = ref('')


const register = async () => {

    try {
        const response = await axios.post(`${URL_BE}/api/v1/auth/register`, {
            username: username.value,
            password: password.value,
            name: name.value,
            gender: gender.value,
            email: email.value,
            age: parseInt(age.value)
        })
        if (response.data) {
            notify.notify({
                title: "Register successfully",
                text: " You have been redirect to login "
            })
            router.push("/");
        }
    } catch (error) {
        console.log(error)
        notify.notify({
            text: "Register failed",
            text: "Please type your information again",
        })

  }


}

</script>

<style scoped>
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
