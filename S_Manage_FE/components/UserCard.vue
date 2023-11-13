<script setup>
  import { defineProps } from 'vue';

  defineProps({ 
    DataUser: {
      type: Object,
      required: true,
    },
  })

  defineEmits(['clickShowPopup', 'clickCloseAllPopup', 'clickOnDelete', 'clickEditUser'])


</script>

<template>
  
<div>
  <div 
      class="item-user flex items-center m-6 p-4 justify-around border-solid border-2 rounded-md"
     >
      <img class="w-16 h-16 rounded-full object-cover" :src="DataUser.avatar" alt="avt">
      <h3 class="font-bold text-lg" >{{DataUser.name}}</h3>
      <p class="font-medium text-base" >{{DataUser.age}}</p>
      <p class="font-medium text-base" >{{DataUser.gender}}</p>
      <p class="font-medium text-base" >{{DataUser.email}}</p>
      <p  class="font-medium text-base" > {{DataUser.role}} </p>
  
      <div class="action relative">
      
        <td class="relative">
          <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-gray-500 hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          @click="$emit('clickShowPopup', DataUser.id_user)"> 
              Actions 
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          <div :id="'action-' + DataUser.id_user" data-display="none" class="boxAction popup hidden absolute right-0 w-32 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
              <div class="px-1 py-1 popup">
                  <button class="popup hover:bg-gray-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm" 
                  @click="$emit('clickEditUser', DataUser.id_user)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                      Edit 
                  </button>
                  <button class="popup hover:bg-red-400 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                  @click="$emit('clickOnDelete', DataUser.id_user)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="popup w-5 h-5 mr-2 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> 
                      Delete 
                  </button>
              </div>
          </div>
      </td>
  
      
      </div>
  
    </div>

    <div @click="$emit('clickCloseAllPopup')" class=" hidden overlay  absolute top-0 right-0 left-0 bottom-0">
    </div>
</div>

</template>
