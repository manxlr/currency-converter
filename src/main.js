const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load your HTML file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools (optional)
  // mainWindow.webContents.openDevTools();

  // When the window is closed, set the window object to null
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initializing
app.whenReady().then(createWindow);

// Quit when all windows are closed (for macOS compatibility)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-create the window on macOS when the app is activated
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
