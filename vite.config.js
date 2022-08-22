import { defineConfig } from "vite"

import viteBaseConfig from "./vite.base.config"
import viteProdConfig from "./vite.prod.config"
//vite.dev.config中defineConfig的参数为function，返回值亦为function
import viteDevConfig from "./vite.dev.config"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envResolver = {
    build: Object.assign({}, viteBaseConfig, viteProdConfig),
    serve: Object.assign({}, viteBaseConfig, viteDevConfig({ command, mode })),
  }
  return envResolver[command]
})
