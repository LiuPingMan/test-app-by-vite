import { defineConfig } from "vite"

export default defineConfig({
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
})
