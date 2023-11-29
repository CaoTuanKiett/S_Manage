
import { defineStore } from 'pinia';
import VueJwtDecode from 'vue-jwt-decode'

export const useDecodeTokenStore = defineStore('decodeToken', {
  state: () => ({
    payload: null,
    decoded: null,
  }),
  getters: {
    decodeToken() {
      const token = JSON.parse(localStorage.getItem('accessToken'));
      this.payload = VueJwtDecode.decode(token);
     return this.decoded = {
        user_id: this.payload.idUser,
        role: this.payload.role,
      };
    },
  },
});
