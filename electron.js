// electron.js

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load React app (build it first for production)
  win.loadURL(
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, 'build/index.html')}`
  );
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Quit the app when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Re-create a window if the dock icon is clicked in macOS
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});