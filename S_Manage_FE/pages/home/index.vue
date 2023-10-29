<script setup>
const config = useRuntimeConfig();

console.log(config.public.email)
</script>

<template>
    <NuxtLayout name="custom">
        <!-- <Sidebar />
        <div class="main ml-[255px]">
            <Header />
            <Footer />
        </div> -->
        <div>
            this is home page
        </div>
    </NuxtLayout>
</template>

<style scoped></style>