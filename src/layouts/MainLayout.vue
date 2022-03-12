<template>
    <TitleBar />

    <!-- Main Content -->
    <main class="h-[calc(100vh-3rem)] overflow-y-scroll">
        <slot />
    </main>

    <footer>FOOTER</footer>
</template>

<script>
import { defineComponent } from 'vue'
import TitleBar from '@/components/Header/TitleBar.vue'

export default defineComponent({
    name: 'MainLayout',
    components: {
        TitleBar,
    },
    setup() {},
})
</script>
