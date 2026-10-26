// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('zooAPI', {
  showNotification: (payload) => {
    return ipcRenderer.invoke('zoo:notify', payload);
  },
  showMessageBox: (options) => {
    return ipcRenderer.invoke('zoo:message-box', options);
  }
});
