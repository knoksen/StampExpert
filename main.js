const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Keep a global reference of the window object
let mainWindow;
let serverProcess;

const isDev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3000;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets', 'icon.png'), // We'll create this
    title: 'StampExpert - Desktop',
    show: false // Don't show until ready
  });

  // Start the Express server
  startServer();

  // Load the app
  const startUrl = `http://localhost:${PORT}`;
  
  // Wait a bit for server to start, then load the page
  setTimeout(() => {
    mainWindow.loadURL(startUrl);
    
    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      
      // Focus on window (optional)
      if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    });
  }, 2000);

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Set up menu
  createMenu();
}

function startServer() {
  // Start the Express server as a child process
  serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    env: { ...process.env, NODE_ENV: 'production', PORT: PORT.toString() }
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Analysis',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                document.getElementById('newAnalysisBtn')?.click() || 
                (document.getElementById('cancelBtn')?.click())
              `);
            }
          }
        },
        {
          label: 'Open Collection',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.executeJavaScript(`
                document.getElementById('collectionContainer')?.scrollIntoView({ behavior: 'smooth' })
              `);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About StampExpert',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About StampExpert',
              message: 'StampExpert Desktop',
              detail: 'Identify and catalog stamps from around the world with our advanced recognition system.\n\nVersion: 1.0.0'
            });
          }
        },
        {
          label: 'Learn More',
          click: () => {
            shell.openExternal('https://github.com/knoksen/StampExpert');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // Kill server process
  if (serverProcess) {
    serverProcess.kill();
  }
  
  // On macOS, keep app running even when no windows are open
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

// Handle app termination
app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
});