
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
       
            <div class="bg-surface rounded-lg shadow border-2 border-gray-700">
                <div class="p-6 space-y-4">
                
                    <form class="space-y-4" action="#">


                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-secondary">New password</label>
                            <input type="email" name="email" id="email"
                                class="w-full p-2.5 rounded-lg focus:ring-primary-600 focus:border-primary-600 text-secondary  "
                                required v-model="passwordNew">
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
import { useToast } from 'vue-toastification'
const toast = useToast()

const passwordNew = ref('')
const router = useRouter()
const config = useRuntimeConfig();
const URL_BE = config.public.API_BASE_BE;

const resetPass = async () => {
    try {
        const response = await axios.post(`${URL_BE}/api/v1/auth/reset-password`, {
            passwordNew: passwordNew.value
        });
        if (response.status === 200) {
            toast.success('Reset password successfully');
            router.push("/");
            console.log(response.data);
        }
    } catch (error) {
        toast.error('Reset password failed');
        console.log(error);
    }
};


</script>
   

