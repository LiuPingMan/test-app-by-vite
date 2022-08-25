import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const { ENV_BASE_API, ENV_TARGET_URL } = loadEnv(mode, process.cwd(), "ENV") //按照mode将环境配置文件及process.env中的以'ENV'为前缀的变量返回
  return {
    server: {
      port: 3367,
      proxy: {
        ["^" + ENV_BASE_API]: {
          target: ENV_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => {
            const reg = new RegExp(`^${ENV_BASE_API}`)
            return path.replace(reg, "")
          },
        },
      },
    },
  }
})
