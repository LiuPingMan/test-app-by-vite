import { createApp } from "vue"
//引入unocss
import "uno.css"
import "./style.css"
import App from "./App.vue"

createApp(App).mount("#app")

fetch("/api/users", {
  method: "post",
})
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
