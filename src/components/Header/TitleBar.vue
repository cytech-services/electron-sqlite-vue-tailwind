<template>
    <header class="topBar h-10 flex flex-row items-center bg-gray-800 text-white">
        <!-- <div class="">Hamburger</div> -->
        <div class="h-10 px-3 flex justify-center items-center">Logo</div>
        <div class="menu">
            <Menu as="div" v-for="(item, menuName) in navigation" :key="item" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="h-10 inline-flex justify-center items-center w-full px-4 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-0"
                    >
                        {{ menuName }}
                    </MenuButton>
                </div>

                <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <MenuItems
                        class="origin-top-left absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-600 focus:outline-none"
                    >
                        <div v-for="group in item" :key="group" class="py-1">
                            <MenuItem v-for="menuItem in group" :key="menuItem" v-slot="{ active }">
                                <a
                                    href="#"
                                    :class="[active ? 'bg-gray-700 text-gray-200' : 'text-gray-300', 'block px-4 py-2 text-sm']"
                                    @click="menuItem.action"
                                    >{{ menuItem.label }}</a
                                >
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
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
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
// import { ChevronDownIcon } from '@heroicons/vue/solid'
import IconClose from '@/components/Icons/IconClose.vue'
import IconMinus from '@/components/Icons/IconMinus.vue'
import IconMaximize from '@/components/Icons/IconMaximize.vue'
import IconRestore from '@/components/Icons/IconRestore.vue'
import { reactive, ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        IconClose,
        IconMinus,
        IconMaximize,
        IconRestore,
    },
    setup() {
        const fullScreen = ref(false)

        let test = () => {
            console.log('test')
        }

        const navigation = reactive({
            File: [
                [
                    { label: 'Edit1', action: test },
                    { label: 'Edit2', action: test },
                    { label: 'Edit3', action: test },
                ],
                [
                    { label: 'Test1', action: test },
                    { label: 'Test2', action: test },
                    { label: 'Test3', action: test },
                ],
                [
                    { label: 'Woo1', action: test },
                    { label: 'Woo2', action: test },
                    { label: 'Woo3', action: test },
                ],
            ],
            Edit: [
                [
                    { label: 'Edit1', action: test },
                    { label: 'Edit2', action: test },
                    { label: 'Edit3', action: test },
                ],
                [
                    { label: 'Test1', action: test },
                    { label: 'Test2', action: test },
                    { label: 'Test3', action: test },
                ],
                [
                    { label: 'Woo1', action: test },
                    { label: 'Woo2', action: test },
                    { label: 'Woo3', action: test },
                ],
            ],
        })

        onMounted(() => {
            console.log(window.ipcRenderer)
        })

        // Windows control button functionality
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

        // Update the maximize / restore button when double clicking
        // the titlebar to maximize or restore the window, or when using
        // the window snap feature
        window.ipcRenderer.receive('isMaximized', () => {
            fullScreen.value = true
        })
        window.ipcRenderer.receive('isRestored', () => {
            fullScreen.value = false
        })

        return {
            fullScreen,
            minimize,
            maximize,
            restore,
            close,
            navigation,
            test,
        }
    },
}
</script>
