<script>
import { userInfo } from '@/stores/userInfo'
import Popup from './Popup.vue';

export default defineComponent({
    setup() {
        const store = useSidebarStore();
        const { toggleMenu } = store;
        const is_expanded = computed(() => store.is_expanded);

        const showLogout = ref(false)
        const isOpen = ref(false)
        const clickShow = () => {
            isOpen.value = !isOpen.value
        }
        const router = useRouter()
        const accessToken = localStorage.getItem('accessToken')
        const isLogin = computed(() => Boolean(accessToken.value))

        const logout = () => {
            if (isLogin) {
                localStorage.removeItem('accessToken')
                router.push("/")
            }
        }

        return { is_expanded, toggleMenu, showLogout, clickShow, logout, isLogin, Popup, isOpen }
    },
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            userInfo: {},
        }
    },
    methods: {
        getUserInfo() {
            const user = userInfo();
            user.setUserInfo();
            this.userInfo = user.$state.userInfo;
            console.log("this.userInfo",this.userInfo);
        }

    }
});
</script>

<template>
    <header class="fixed top-0 flex justify-between p-6 align-middle transition-all bg-white z-[999]"
        :class="is_expanded ? 'w-[calc(100%-255px)]' : 'w-[calc(100%-2rem-32px)]'">
        <div class="flex flex-col leading-7">
            <p class="text-xl font-bold">Hello, {{ userInfo.username }}</p>
            <span class="text-sm leading-[21px]">Have a nice day</span>
        </div>
        <div class="flex justify-center gap-3 align-center">
            <font-awesome-icon :icon="['fas', 'bell']" class="text-xl cursor-pointer" />
            <div class="divide"></div>
            <div class="flex justify-center gap-3 align-center">
                <Nuxt-link :to="'/users/' + userInfo.idUser" class="w-[45px] h-[45px] bg-stone-300 rounded-full">
                    <img :src=userInfo.avatar alt="" class="w-[45px] h-[45px] bg-stone-300 rounded-full">
                </Nuxt-link>
                <div class="flex flex-col">
                    <Nuxt-link :to="'/users/' + userInfo.idUser" class="text-base font-bold">{{ userInfo.username
                    }}</Nuxt-link>
                    <span class="text-xs">{{ userInfo.email }}</span>
                </div>
                <font-awesome-icon @click="clickShow()" :icon="['fas', 'arrow-right-from-bracket']"
                    class="cursor-pointer text-m" />
            </div>
        </div>
        <Popup @update-is-open="isOpen = $event" :type="'navbar'" :is-open="isOpen">
            <template #popup-header>
                <h2 class="text-2xl font-bold text-center text-blue-500">Do you want to logout?</h2>
            </template>
            <template #popup-footer>
                <button @click="logout" class="p-3 text-white bg-blue-500 rounded-md hover:bg-blue-400">Logout</button>
            </template>
        </Popup>
    </header>
</template>

<style scoped>
.divide {
    width: 0px;
    height: 48px;
    border: 1px solid #c2c2c2;
}
</style>