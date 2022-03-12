<template>
    <MainLayout>
        <img alt="Vue logo" src="./assets/logo.png" class="mx-auto" />

        <div id="names">
            <!--  -->
        </div>

        <HelloWorld msg="Welcome to Your Vue.js App" />
    </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
import HelloWorld from './components/HelloWorld.vue'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'App',
    components: {
        MainLayout,
        HelloWorld,
    },
    setup() {
        onMounted(() => {
            console.log('mounted')
            // document.addEventListener('DOMContentLoaded', async () => {
            window.api.loadDatabase().then((result) => {
                console.log(result)

                let names = window.api.getNames(result)
                console.log(names)

                if (names) {
                    let divNames = document.getElementById('names')
                    let namesArray = []
                    names.forEach((name) => {
                        namesArray.push(name.name)
                    })
                    let nameString = namesArray.join('<br />')
                    divNames.innerHTML = nameString
                }
            })
            // })
        })
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
