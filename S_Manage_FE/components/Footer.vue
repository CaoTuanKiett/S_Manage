<template>
    <div class="  bottom-0 w-full text-center  bg-primary d-flex flex-column">
        <div>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="text"></v-btn>
        </div>
   
        <div class="px-5 pt-0 mx-auto text-surface ">
           S-Group/ Think Different - Make Different 
    S-Group là tổ chức hỗ trợ và đào tạo nền tảng chuyên môn cũng như phát triển các kinh nghiệm thực tiễn cho các bạn sinh viên.
    Hiện nay, S-Group đang đào tạo 3 chuyên môn chính: Lập trình, Marketing Online và Thiết kế, được hướng dẫn và đào tạo do chính các thành viên có kinh nghiệm làm việc trong các lĩnh vực trực tiếp đào tạo và chia sẻ.
        </div>

        <v-divider></v-divider>

        <div>
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </div>
    </div>
</template>
<script setup>

const icons = ref([
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
],)
   
 
</script>