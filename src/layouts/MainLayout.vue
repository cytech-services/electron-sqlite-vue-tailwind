<template>
    <TitleBar />

    <!-- Main Content -->
    <main class="h-main overflow-y-scroll">
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
