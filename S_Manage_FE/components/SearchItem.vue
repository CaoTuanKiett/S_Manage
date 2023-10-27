<template>

  <div>
    <input 
    type="text" 
    placeholder="Search for anything..." 
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full py-3 px-4 pr-12 rounded-md border-[1px] placeholder:text-slate-600 placeholder:italic shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-black text-base">
      <font-awesome-icon 
        :icon="['fas', 'magnifying-glass']" 
        class="absolute right-3 bottom-3 text-xl text-slate-500 cursor-pointer"
      />
  </div>
    
</template>

<script setup>
  
  import { defineProps, defineEmits } from 'vue';

  defineProps({ 
    modelValue: {
      type: String,
      required: false,
    },
    
  })

  defineEmits(['update:modelValue'])

</script>