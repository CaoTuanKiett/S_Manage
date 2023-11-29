<template>
  <div class="flex w-full">
   <div class="w-1/6">
       <Sidebar />
   </div>

   <div class="w-5/6 relative ">
       <Header />

       <div class="mt-20 w-full">
           <slot />
       </div>

       <!-- <Footer /> -->
   </div>
  </div>
</template>