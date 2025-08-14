const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  // 集成Electron插件
  pluginOptions: {
    electronBuilder: {
      // 主进程文件（控制窗口、原生功能）
      mainProcessFile: "src/background.js",
      // 渲染进程入口（Vue项目入口）
      rendererProcessFile: "src/main.js",
      // 打包配置
      builderOptions: {
        // 应用基础信息
        appId: "com.your-app.id",
        productName: "你的应用名称",
        copyright: "Copyright © 2024 ${author}",
        // 多平台配置
        win: {
          target: ["nsis", "zip"], // Windows安装包和压缩包
          icon: "public/icons/icon.ico", // 图标（256x256）
        },
        mac: {
          target: ["dmg", "zip"], // macOS镜像和压缩包
          icon: "public/icons/icon.icns", // 图标（1024x1024）
        },
        // 压缩配置
        compression: "maximum",
        // asar打包（加密并减少文件数量）
        asar: true,
        // 额外资源（如静态文件）
        extraResources: ["public/extra/**/*"],
      },
      // 开发环境配置
      nodeIntegration: false, // 关闭node集成（安全）
      contextIsolation: true, // 开启上下文隔离
      preload: "src/preload.js", // 预加载脚本（桥接渲染进程和主进程）
    },
  },
})
