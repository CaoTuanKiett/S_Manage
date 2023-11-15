
<style scoped>
input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
<template>
    <section class="flex items-center justify-center h-screen bg-background">
        <div class="w-full max-w-md">

            <div class="border-2 border-gray-700 rounded-lg shadow bg-surface">
                <div class="p-6 space-y-4">

                    <form class="space-y-4" action="#">


                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-secondary">New password</label>
                            <input type="password" name="email" id="email"
                                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                                required v-model="passwordNew">
                        </div>

                        <v-btn block variant="outlined" size="x-large" class="mb-4 bg-primary" @click="resetPass"> Send
                        </v-btn>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>


import { useRoute } from 'vue-router';
import axios from 'axios';
import { notify, useNotification } from '@kyvg/vue3-notification'
const route = useRoute();

const config = useRuntimeConfig();
const API_BE = config.public.API_BASE_BE;

const token = route.query.token;

import { useToast } from 'vue-toastification'
const toast = useToast()


const passwordNew = ref('')
const data = ref([]);



const router = useRouter()
const URL_BE = config.public.API_BASE_BE;



    const resetPass = async () => {
        data.value.push({ "passwordNew": passwordNew.value })

        const DataPassword = data.value[0];

        await axios.post(`${API_BE}/api/v1/auth/reset-password?token=${token}`, DataPassword)
            .then(response => {
                if (response.status) {
                    useNotification(
                        notify({
                            title: "Send email Success",
                            text: "Check your email",
                        })
                    )
                    toast.success('Reset password successfully')
                    router.push("/")
                    console.log(response.status)
                }



            }).catch(error => {
                useNotification(notify({
                    title: " Send email unsuccessfully ",
                    text: " Please type your email again ",
                    type: "warn"
                }))
                toast.success('Send email unsuccessfully')
                console.log(error)
            })
    }





</script>
   

