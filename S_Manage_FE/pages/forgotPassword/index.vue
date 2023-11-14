<style scoped>
input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
<template>
    <section class="bg-background flex items-center justify-center h-screen">
        <div class="w-full max-w-md">
            <a href="#" class="flex items-center justify-center mb-6 text-2xl font-semibold text-primary">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                S-Manage
            </a>
            <div class="bg-surface rounded-lg shadow border-2 border-gray-700">
                <div class="p-6 space-y-4">
                    <h1 class=" text-lg  leading-tight tracking-tight text-gray-900">
                        Enter the email address associated with your account and we'll send a link to reset your password
                    </h1>
                    <form class="space-y-4" action="#">


                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-secondary">Email</label>
                            <input type="email" name="email" id="email"
                                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                                required 
                                v-model="email">
                        </div>

                        <v-btn block variant="outlined" size="x-large" class="bg-primary mb-4" @click="resetPass"> Send
                        </v-btn>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
  import axios from 'axios';
import { notify, useNotification } from '@kyvg/vue3-notification'

const config = useRuntimeConfig();
const API_BE = config.public.API_BASE_BE;

const email = ref('')
const router = useRouter();

const data = ref([])

const resetPass = async () => {

    data.value.push({"email": email.value})
    
    await  axios.post(`${API_BE}/api/v1/auth/forgot-password`, data.value)
    .then(response => {
        if (response.status) {
            useNotification(
                notify({
                    title: "Send email Success",
                    text: "Check your email",
                })
            )
            router.push("/")
            console.log(response.status)
        }



    }).catch(error => {
        useNotification(notify({
            title: " Send email unsuccessfully ",
            text: " Please type your email again ",
            type: "warn"
        }))

        console.log(error)
    })
}


</script>
   
