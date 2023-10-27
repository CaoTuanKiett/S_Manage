<script>
export default defineComponent({
    setup() {
        const store = useSidebarStore();
        const { toggleMenu } = store;
        const is_expanded = computed(() => store.is_expanded);
        return { is_expanded, toggleMenu }
    }
});
</script>
<template>
    <!-- <Sidebar /> -->
    <div>
        <Sidebar />
        <div class="transition-all main" :class="is_expanded ? 'ml-[255px]' : 'ml-[calc(2rem+32px)]'">
            <Header />
            <div class="pt-[calc(2.5rem+97px)] p-10">
                <slot />
            </div>
            <!-- <Footer /> -->
        </div>
    </div>
</template>