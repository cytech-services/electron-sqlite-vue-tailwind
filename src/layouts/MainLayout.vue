<template>
    <TitleBar />

    <!-- Main Content -->
    <main class="h-[calc(100vh-2.5rem)] overflow-y-scroll">
        <slot />
    </main>

    <footer>FOOTER</footer>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import TitleBar from '@/components/Header/TitleBar.vue'

export default defineComponent({
    name: 'MainLayout',
    components: {
        TitleBar,
    },
    setup() {
        onMounted(() => {
            // console.log(window.ipcRenderer)
        })
    },
})
</script>
