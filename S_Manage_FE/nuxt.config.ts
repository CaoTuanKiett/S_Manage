
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
 webpack:{
   loaders:{
    vue:{
       hotReload: true,
    }
   }
 },
//for tailwind
  css: ['~/index.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  //vuetify
 modules: [
    '@invictus.codes/nuxt-vuetify'
  ],
  
  vuetify: {
  
    /* vuetify options */
    vuetifyOptions: {                       
     theme: {
      themes: {
        light: {
          dark:false,
          colors: {
            background: '#F5F5F5',
            primary: '#4A85F6',
              surface: '#FFFFFF',
              secondary: '#000000'
          },
              
        },
        dark:{
          colors:{
            background: ''
          }

        }
       
      }
     }
      // @TODO: list all vuetify options
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: false,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: true ,
      autoImport: true,
      useVuetifyLabs: true, 
      /* nuxt-vuetify module options */
      
    }
  }
})
