<script setup>
  import { defineProps } from 'vue';

  defineProps({ 
    name: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
    inputValue: {
      type: String,
      required: true,
    },
    errorValue: {
      type: String,
      required: true,
    },
    iconWeight: {
      type: String,
      required: false,
      default: 'fas'
    },
    icon: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },

  })


</script>



<template>
 <div class="input  p-2 mb-4 w-3/4 relative" >
    <label :for="inputId" class="text-base text-black font-semibold">{{ name }}</label>
    <input 
      class="focus:outline-none placeholder:text-slate-500 w-full border-2 rounded px-3 py-2  pr-12 mt-2 text-base" 
      :name="inputName" 
      v-model="inputValue"
      type="text" 
      placeholder="status"
      @blur="validate()"
      :class="{'is-invalid': errorValue}"
      />

      <div class="invalid-feedback text-left" v-if="errorValue" > {{errorValue }} </div>

      <font-awesome-icon 
        class="absolute right-6 bottom-5 text-xl cursor-pointer"
        :icon="[iconWeight, icon]" />
  </div>
</template>