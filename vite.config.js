import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
//css原子化
import unocss from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"
//css语法降级、补全前缀
import postcssPresetEnv from "postcss-preset-env"
import { viteMockServe } from "vite-plugin-mock"
import svgLoader from "vite-svg-loader"

export default defineConfig(({ command, mode }) => {
  const { ENV_BASE_API, ENV_TARGET_URL } = loadEnv(mode, process.cwd(), "ENV") //按照mode将环境配置文件及process.env中的以'ENV'为前缀的变量返回
  return {
    envPrefix: "ENV", //将环境配置文件中以‘ENV’为前缀的属性配置到import.meta.env中
    optimizeDeps: {
      exclude: [], //将数组中的依赖不进行依赖预构建
    },
    css: {
      modules: {
        scopeBehaviour: "local", //默认'local'所有类名都是本地的，需要模块化,'local'|'global'
        globalModulePaths: [], //配置全局样式文件路径，不需要模块化
        generateScopedName: "[name]_[local]_[hash:5]", //配置类名后缀，
        localsConvention: "camelCaseOnly", //配置css文件映射的对象的键名格式
      },
      preprocessorOptions: {
        less: {
          math: "always", //css属性值计算
          globalVars: {
            //全局变量配置
            mainColor: "blue",
          },
        },
      },
      devSourcemap: true, //开启样式文件sourcemap
      postcss: {
        plugins: [postcssPresetEnv()],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
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
    build: {
      //配置rollup的构建策略
      rollupOptions: {
        //控制输出
        output: {
          //配置静态资源的打包后文件名
          assetFileNames: "[name].[hash].[ext]",
        },
      },
      assetsInlineLimit: 20 * 1024, //将小于20kb的静态资源打包为base64
      outDir: "dist", //配置打包输出的文件夹名,默认为dist
      assetsDir: "assets", //配置静态资源打包目录，默认为assets
      emptyOutDir: true, //打包前清空打包目录，默认为true
    },
    plugins: [
      vue(),
      unocss({
        //使用unocss
        presets: [presetUno(), presetAttributify(), presetIcons()],
        rules: [
          [
            "p-c",
            {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            },
          ],
        ],
      }),
      viteMockServe({
        //mock文件路径，默认值mock
        path: "mock",
      }),
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: "cleanupIDs",
              params: {
                prefix: {
                  // 避免不同 svg 内部的 filter id 相同导致样式错乱
                  // https://github.com/svg/svgo/issues/674#issuecomment-328774019
                  toString() {
                    let count = this.count ?? 0
                    count++
                    this.count = count
                    return `svg-random-${count.toString(36)}-`
                  },
                },
              },
            },
          ],
        },
      }),
    ],
  }
})
