<template>
    <div v-if="isOpen" @click.self="closePopup()"
        class="fixed flex justify-center align-center inset-0 shadow-2xl bg-[rgba(0,0,0,0.5)] popup z-[9999]">
        <div :class="type !== 'default' ? 'align-center' : 'w-1/2'"
            class="flex flex-col gap-6 p-6 bg-white rounded-lg popup-inner">
            <div class="popup-header">
                <slot name="popup-header" />
            </div>
            <div class="popup-body max-h-[60vh] overflow-auto">
                <slot />
            </div>
            <div class="flex justify-center gap-5 popup-footer algin-center">
                <button class="p-3 bg-gray-200 rounded-md hover:bg-gray-100 popup-close" @click="closePopup()">Close
                    popup</button>
                <slot name="popup-footer" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'default',
        },
    },
    mounted() {
        window.addEventListener('keyup', this.onKeyUp);
    },
    beforeUnmount() {
        window.removeEventListener('keyup', this.onKeyUp);
    },
    methods: {
        openPopup() {
            this.$emit('update-is-open', true);
        },
        closePopup() {
            this.$emit('update-is-open', false);
        },
        onKeyUp(event) {
            if (event.key === 'Escape' && this.isOpen) {
                this.closePopup();
            }
        },
    },
}
</script>

<style scoped></style>