<script setup>
import { useDecodeTokenStore } from '#imports';

const decoded = useDecodeTokenStore()

decoded.decodeToken

console.log(decoded.decoded)

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