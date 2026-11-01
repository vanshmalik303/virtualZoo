import { app, BrowserWindow, ipcMain, dialog, Notification } from "electron";
import path from "path";
import fs from "fs";

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "🦁 Safari Haven - Virtual Zoo Sanctuary",
    width: 1240,
    height: 840,
    minWidth: 960,
    minHeight: 650,
    backgroundColor: "#0f172a",
    webPreferences: {
      devTools: true,
      preload: path.join(import.meta.dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load the built production bundle; fall back to dev server only if dist is missing
  const distPath = path.join(import.meta.dirname, '../dist/index.html');
  const devUrl = 'http://localhost:5173';

  if (fs.existsSync(distPath)) {
    mainWindow.loadFile(distPath);
  } else {
    // Dist not built yet — try the Vite dev server
    mainWindow.loadURL(devUrl);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers for Zoo desktop features
ipcMain.handle('zoo:notify', (_event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title || 'Safari Haven Zoo Alert',
      body: body || '',
      silent: false
    }).show();
    return true;
  }
  return false;
});

ipcMain.handle('zoo:message-box', async (_event, options) => {
  if (!mainWindow) return null;
  return dialog.showMessageBox(mainWindow, options);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
