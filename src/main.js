const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
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

// Show About dialog with clickable links
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
    buttons: ['OK'],
    // Make the Email and GitHub links clickable
    checkboxLabel: 'Click to open links in the default browser',  // Optional (can be removed if not needed)
    noLink: true
  }).then(() => {
    // Add event listener for clicks on links after the dialog is shown
    mainWindow.webContents.on('new-window', (event, url) => {
      if (url.includes('mailto:')) {
        shell.openExternal(url); // Open email client
      } else {
        shell.openExternal(url); // Open GitHub URL or other links in the default browser
      }
      event.preventDefault(); // Prevent the default behavior
    });
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
