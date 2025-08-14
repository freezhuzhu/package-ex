// 主进程：控制应用生命周期和窗口
const { app, BrowserWindow } = require("electron")
const path = require("path")

// 防止多实例运行
if (!app.requestSingleInstanceLock()) {
  app.quit()
}

// 创建窗口函数
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    // 窗口配置
    frame: true, // 显示标题栏
    titleBarStyle: "default",
    // 网页设置
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // 预加载脚本路径
      devTools: process.env.NODE_ENV !== "production", // 生产环境关闭devTools
      allowRunningInsecureContent: false, // 禁止不安全内容
      contextIsolation: true, // 隔离上下文
    },
  })

  // 加载Vue项目（开发环境加载本地服务，生产环境加载打包后的html）
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (process.env.NODE_ENV !== "production") {
      mainWindow.webContents.openDevTools() // 开发环境打开调试工具
    }
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"))
  }

  // 窗口关闭事件
  mainWindow.on("closed", () => {
    // 清空窗口实例
  })
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
  createWindow()

  // macOS特有：关闭窗口后保留应用进程
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 所有窗口关闭后退出应用（macOS除外）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
