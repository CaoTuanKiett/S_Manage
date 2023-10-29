import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('is_expanded', {
    state: () => ({
        is_expanded: true,
    }),
    actions: {
        toggleMenu() {
            this.is_expanded = !this.is_expanded;
        }
    }
})