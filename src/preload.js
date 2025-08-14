// 预加载脚本：在渲染进程加载前执行，安全地暴露原生API给Vue
const { contextBridge, ipcRenderer } = require('electron');

// 向Vue项目暴露有限的原生功能（避免直接暴露ipcRenderer）
contextBridge.exposeInMainWorld('electronAPI', {
  // 示例：获取系统信息
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  // 示例：打开文件对话框
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  // 监听主进程消息
  onMessage: (callback) => ipcRenderer.on('message', (event, data) => callback(data))
});

// 禁止修改预加载脚本的全局变量
Object.freeze(window.electronAPI);
