<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { test } from '@/api/test'
import SvgRaw from './components/SvgRaw.vue'
import { debounce } from 'lodash-es'

const handleTestBtnClick = () => {
  test()
}
const debounceHandleTestBtnClick = debounce(handleTestBtnClick, 500)
</script>

<template>
  <div>
    <SvgRaw name="logo" class="color1"></SvgRaw>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <button @click="debounceHandleTestBtnClick">test api</button>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.color1 :deep(g) {
  fill: red;
}
.color1 :deep(circle) {
  fill: #299;
}
</style>
