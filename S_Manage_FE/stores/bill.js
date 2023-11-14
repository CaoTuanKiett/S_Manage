import { defineStore } from 'pinia';
import axios from 'axios';

export const useBillStore = defineStore({
  id: 'bill',
  state: () => ({
    listBill: [],
  }),
  actions: {
    setBills(bills) {
        this.listBill = bills;
    },
  },
});