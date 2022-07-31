import { defineConfig, loadEnv } from "vite"

import viteBaseConfig from "./vite.base.config"
import viteDevConfig from "./vite.dev.config"
import viteProdConfig from "./vite.prod.config"

const envResolver = {
  build: () => Object.assign({}, viteBaseConfig, viteProdConfig),
  serve: () => Object.assign({}, viteBaseConfig, viteDevConfig),
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "ENV") //按照mode将环境配置文件及process.env中的以'ENV'为前缀的变量返回
  return envResolver[command]()
})
