<script setup>
import axios from 'axios';
import { useToast } from 'vue-toastification'
const toast = useToast()

const config= useRuntimeConfig();
 const URL_BE = config.public.API_BASE_BE;

const username = ref('')
const password = ref('')
const router = useRouter()

const accessToken = localStorage.getItem('accessToken')

const login = async () => {
  try {
    const response = await axios.post(`${URL_BE}/api/v1/auth/login`, {
      username: username.value,
      password: password.value
    });
    console.log(response.data.data);
    if (response.status === 200) {
      const token = response.data.data;
      localStorage.setItem("accessToken", JSON.stringify(token));
      toast.success('Login successfully');
      router.push("/home");
    }
  } catch (error) {
    console.log(error);
    toast.error('Login failed');
  }
};
 const checkToken = async () => {
    if(accessToken){
      window.location.href = router.resolve('/home').href
    }
 }
 onMounted( async () => {
  await checkToken()
  })

</script>

<template>
  <section class="flex items-center justify-center h-screen bg-background">
    <div class="w-full max-w-md">
      <a href="#" class="flex items-center justify-center mb-6 text-2xl font-semibold text-primary">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        S-Manage
      </a>
      <div class="border-2 border-gray-700 rounded-lg shadow bg-surface">
        <div class="p-6 space-y-4">
          <h1 class="text-2xl font-bold leading-tight tracking-tight text-center text-gray-900 ">
            Sign in to your account
          </h1>
          <form  class="space-y-4" action="#">
            <div class="form-group">
              <label for="email" class="block mb-2 text-sm font-medium text-secondary">Username</label>
              <input type="email" name="email" id="email"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                placeholder="Username" required v-model="username">
            </div>
            <div class="form-group">
              <label for="password" class="block mb-2 text-sm font-medium text-secondary">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••"
                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 " v-model="password"
                required>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required>
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-secondary">Remember me</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-primary hover:underline dark:text-primary-500">
                <NuxtLink to="/resetPassword">Forgot password</NuxtLink>
              </a>
            </div>
            <v-btn block variant="outlined" size="x-large" class="mb-4 bg-primary" @click="login"> Sign In
            </v-btn>
            <p class="text-sm font-light text-secondary">
              Don’t have an account yet? <a href="#"
                class="font-medium text-primary hover:underline dark:text-primary-500">
                <NuxtLink to="/Register">Sign up
                </NuxtLink>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
