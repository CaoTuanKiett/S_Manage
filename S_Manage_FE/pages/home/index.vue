<script setup>
import { useDecodeTokenStore } from '#imports';

const decoded = useDecodeTokenStore()

decoded.decodeToken


</script>

<template>
    <NuxtLayout name="custom">
        <!-- <Sidebar />
        <div class="main ml-[255px]">
            <Header />
            <Footer />
        </div> -->
        <div>
            <img src="../../assets/img/home.png" alt="home">
        </div>
    </NuxtLayout>
</template>

<style scoped></style>