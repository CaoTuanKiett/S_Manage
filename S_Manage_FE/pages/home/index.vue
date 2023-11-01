<script setup>
const config = useRuntimeConfig();

console.log(config.public.email)
</script>

<template>
    <NuxtLayout name="custom">
        <div class="main ml-[255px]">
            <Header />
        </div>
        <div>
            this is home page
        </div>
    </NuxtLayout>
</template>

<style scoped></style>