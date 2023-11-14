
import { defineStore } from 'pinia';
import VueJwtDecode from 'vue-jwt-decode'

 export const useDecodeTokenStore =  defineStore('decodeToken', {
    state: () => ({
        token : JSON.parse(localStorage.getItem('accessToken')),
        payload: null,
        decoded: null,
    }),
    actions: {
        decodeToken() {
            this.payload = VueJwtDecode.decode(this.token)
            this.decoded = {
                user_id : this.payload.idUser,
                role : this.payload.role,
            }
        }
    }
})
