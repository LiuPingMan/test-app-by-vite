import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

/**
 *
 * @param {string} path
 * @returns
 */
function a(path) {
  return path + '3'
}
