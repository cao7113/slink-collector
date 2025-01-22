import { defineConfig } from "vite";

export default defineConfig({
  // https://vitejs.dev/config/build-options.html
  build: {
    // https://rollupjs.org/configuration-options/
    rollupOptions: {
      input: {
        popup: "popup.html",
        options: "options.html",
        background: "background.ts",
      },
      output: {
        entryFileNames: "[name].js", // 脚本文件的输出名称
        assetFileNames: "[name].[ext]", // 静态资源文件的输出名称
      },
      // output: {
      //   entryFileNames: "[name].js",
      //   chunkFileNames: "[name].js",
      //   assetFileNames: "assets/[name].[ext]",
      // },
    },
    emptyOutDir: true,
  },
});
