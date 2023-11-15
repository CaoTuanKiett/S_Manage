<script setup>
import { routerKey } from 'vue-router';
import { useSidebarStore } from '#imports';
import { useDecodeTokenStore } from '#imports';

        const store = useSidebarStore();
        const { toggleMenu } = store;
        const is_expanded = computed(() => store.is_expanded);
           
      const decoded = useDecodeTokenStore()
      decoded.decodeToken  
   
      const role_id = decoded.decoded.role
      const user_id = decoded.decoded.user_id
    
</script>

<template>
    <div class="fixed flex flex-col min-h-screen p-4 overflow-hidden transition-all bg-white sidebar"
        :class="`${is_expanded ? 'w-[255px]' : 'w-[calc(2rem+32px)]'}`">
        <div class="relative flex mb-4 logo align-center">
            <img src="../public/losdac.png" alt=""
                class="w-[2rem] absolute top-0 left-0">
            <span class="w-full text-xl font-bold text-center text-blue-500 whitespace-nowrap"
                :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">S-Manage</span>
        </div>
        <div class="relative top-0 flex justify-end mb-4 transition-all menu-toggle-wrap"
            :class="`${is_expanded ? 'top-[-3rem]' : ''}`">
            <button class="transition-all menu-toggle" :class="`${is_expanded ? 'rotate-180' : ''}`">
                <font-awesome-icon :icon="['fas', 'angles-right']" @click="toggleMenu"
                    class="text-xl transition-all hover:translate-x-2 hover:text-blue-500 " />
            </button>
        </div>
        <h3 class="mb-2 text-sm uppercase transition-all" :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Menu</h3>
        <div v-if="role_id === 1" class="flex flex-col menu mx-[-1rem]">
            <Nuxt-link to="/home"
                class="flex gap-2 px-4 py-2 transition-all button align-center hover:bg-blue-500 hover:text-white">
                <font-awesome-icon :icon="['fas', 'home']"
                    class="mr-2 text-[1.5rem] transition-all min-w-[24px] w-[24px]" />
                <span class="transition-all text whitespace-nowrap"
                    :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Dashboard</span>
            </Nuxt-link>
            <Nuxt-link to="/users"
                class="flex gap-2 px-4 py-2 transition-all button align-center hover:bg-blue-500 hover:text-white">
                <font-awesome-icon :icon="['fas', 'user']"
                    class="mr-2 text-[1.5rem] transition-all min-w-[24px] w-[24px]" />
                <span class="transition-all text whitespace-nowrap"
                    :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Users</span>
            </Nuxt-link>
            <Nuxt-link to="/money"
                class="flex gap-2 px-4 py-2 transition-all button align-center hover:bg-blue-500 hover:text-white">
                <font-awesome-icon :icon="['fas', 'money-bill-1-wave']"
                    class="mr-2 text-[1.5rem] transition-all min-w-[24px] w-[24px]" />
                <span class="transition-all text whitespace-nowrap"
                    :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Monthly Money</span>
            </Nuxt-link>
            <Nuxt-link to="/paymentHistory"
                    class="flex gap-2 px-4 py-2 transition-all button align-center hover:bg-blue-500 hover:text-white">
                    <font-awesome-icon :icon="['fas', 'credit-card']"
                        class="mr-2 text-[1.5rem] transition-all min-w-[24px] w-[24px]" />
                    <span class="transition-all text whitespace-nowrap"
                        :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Payment History</span>
                </Nuxt-link>

              <Nuxt-link to="/authorization"
                    class="flex gap-2 px-4 py-2 transition-all button align-center hover:bg-blue-500 hover:text-white">
                    <font-awesome-icon :icon="['fas', 'people-arrows']"
                        class="mr-2 text-[1.5rem] transition-all min-w-[24px] w-[24px]" />
                    <span class="transition-all text whitespace-nowrap"
                        :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Authorization </span>
                </Nuxt-link>  
        </div>

         <div v-else-if="role_id !== 1" class="flex flex-col menu mx-[-1rem]">
                <Nuxt-link to="/home"
                    class="flex gap-2 px-4 py-2 transition-all button align-center hover:bg-blue-500 hover:text-white">
                    <font-awesome-icon :icon="['fas', 'home']"
                        class="mr-2 text-[1.5rem] transition-all min-w-[24px] w-[24px]" />
                    <span class="transition-all text whitespace-nowrap"
                        :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Dashboard</span>
                </Nuxt-link>
                <Nuxt-link :to="`/users/${user_id}`"
                    class="flex gap-2 px-4 py-2 transition-all button align-center hover:bg-blue-500 hover:text-white">
                    <font-awesome-icon :icon="['fas', 'user']"
                        class="mr-2 text-[1.5rem] transition-all min-w-[24px] w-[24px]" />
                    <span class="transition-all text whitespace-nowrap"
                        :class="`${is_expanded ? 'opacity-1' : 'opacity-0'}`">Profile</span>
                </Nuxt-link>
              
            </div>
       
    </div>
</template>

<style scoped>
.router-link-exact-active {
    color: rgb(59, 130, 246);
    border-right: 5px solid rgb(59, 130, 246);
}

.router-link-exact-active:hover {
    color: white;
}
</style>