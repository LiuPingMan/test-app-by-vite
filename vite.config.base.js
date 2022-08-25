import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
//css原子化
import unocss from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"
//css语法降级、补全前缀
import postcssPresetEnv from "postcss-preset-env"
import path from "path"

export default defineConfig({
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
  ],
})
