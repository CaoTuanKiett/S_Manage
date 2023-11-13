<script setup>
import VueJwtDecode from 'vue-jwt-decode'



const accessToken = localStorage.getItem('accessToken')


console.log(VueJwtDecode.decode(JSON.parse(accessToken)))


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