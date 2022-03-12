<template>
    <header class="topBar h-10 flex flex-row items-center bg-gray-800 text-white">
        <!-- <div class="">Hamburger</div> -->
        <div class="h-10 px-3 flex justify-center items-center">Logo</div>
        <div class="titleBar h-10 grow flex justify-center items-center" style="-webkit-app-region: drag"></div>
        <div class="h-10">
            <button class="h-10 px-3 hover:bg-gray-600" title="Minimize" @click="minimize()">
                <IconMinus class="fill-white" />
            </button>
            <button v-show="!fullScreen" class="h-10 px-3 hover:bg-gray-600" title="Maximize" @click="maximize()">
                <IconMaximize />
            </button>
            <button v-show="fullScreen" class="h-10 px-3 hover:bg-gray-600" title="Restore" @click="restore()">
                <IconRestore class="m-1 h-4 w-4 fill-white" />
            </button>
            <button class="h-10 px-3 hover:bg-red-700" title="Close" @click="close()">
                <IconClose />
            </button>
        </div>
    </header>
</template>

<script>
import IconClose from '@/components/Icons/IconClose.vue'
import IconMinus from '@/components/Icons/IconMinus.vue'
import IconMaximize from '@/components/Icons/IconMaximize.vue'
import IconRestore from '@/components/Icons/IconRestore.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    components: {
        IconClose,
        IconMinus,
        IconMaximize,
        IconRestore,
    },
    setup() {
        const fullScreen = ref(false)

        onMounted(() => {
            console.log(window.ipcRenderer)
        })

        let minimize = () => {
            window.ipcRenderer.send('minimizeWindow')
        }
        let maximize = () => {
            fullScreen.value = true
            window.ipcRenderer.send('maximizeWindow')
        }
        let restore = () => {
            fullScreen.value = false
            window.ipcRenderer.send('restoreWindow')
        }
        let close = () => {
            window.ipcRenderer.send('closeApplication')
        }

        return {
            fullScreen,
            minimize,
            maximize,
            restore,
            close,
        }
    },
}
</script>
