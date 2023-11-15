import { defineStore } from 'pinia';

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