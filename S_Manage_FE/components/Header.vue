<script>

</script>

<template>
    <header class="fixed z-50 top-0 flex justify-between w-full p-6 align-middle bg-white">
        <div class="flex flex-col leading-7">
            <p class="text-xl font-bold">Hello, Yuh Wepo</p>
            <span class="text-sm leading-[21px]">Have a nice day</span>
        </div>
        <div class="flex justify-center gap-3 align-center">
            <font-awesome-icon :icon="['fas', 'bell']" class="text-xl cursor-pointer" />
            <div class="divide"></div>
            <div class="flex justify-center gap-3 align-center">
                <Nuxt-link to="/users/1" class="w-[45px] h-[45px] bg-stone-300 rounded-full">
                    <img src="https://picsum.photos/300" alt="" class="w-[45px] h-[45px] bg-stone-300 rounded-full">
                </Nuxt-link>
                <div class="flex flex-col">
                    <Nuxt-link to="/users/1" class="text-base font-bold">Yuh Wepo</Nuxt-link>
                    <span class="text-xs">Admin</span>
                </div>
                <font-awesome-icon :icon="['fas', 'chevron-down']" class="cursor-pointer text-m" />
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    width: calc(100% - 255px);
}

.divide {
    width: 0px;
    height: 48px;
    border: 1px solid #c2c2c2;
}
</style>