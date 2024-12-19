const { app, BrowserWindow, Menu, dialog, clipboard } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,   // Enable Node.js integration in the renderer process
      contextIsolation: false  // Allow access to Node.js in the renderer
    }
  });

  // Load the index.html file from the src folder
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Create a custom menu
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About Currency-Converter',
          click: () => {
            // Show About dialog
            showAboutDialog();
          }
        }
      ]
    }
  ];

  // Build the menu from the template
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu); // Set the application menu

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Show About dialog with copy buttons for email and GitHub link
function showAboutDialog() {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'About Currency-Converter',
    message: 'Currency Converter Application',
    detail: `
      Author: Zeeshan Khalid
      Email: nszeeshankhalid@gmail.com
      GitHub: https://github.com/manxlr
      License: MIT
    `,
    buttons: ['Copy Email', 'Copy GitHub', 'OK']
  }).then(result => {
    if (result.response === 0) {
      // User clicked "Copy Email" button
      clipboard.writeText('nszeeshankhalid@gmail.com');
      console.log('Email copied to clipboard');
    } else if (result.response === 1) {
      // User clicked "Copy GitHub" button
      clipboard.writeText('https://github.com/manxlr');
      console.log('GitHub URL copied to clipboard');
    }
  });
}

// Initialize the app when ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (macOS compatibility)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-create window on macOS when the app is activated
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
