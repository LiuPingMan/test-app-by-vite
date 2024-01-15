import { createApp } from 'vue'
//引入unocss
import 'uno.css'
import './style.css'
//引入可伸缩布局方案
import 'amfe-flexible/index'
import App from './App.vue'
import SvgRaw from './components/SvgRaw.vue'
const app = createApp(App)

app.component('SvgRaw', SvgRaw).mount('#app')

fetch('/api/users', {
  method: 'post',
})
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
