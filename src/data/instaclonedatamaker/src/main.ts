import { app, BrowserWindow } from 'electron';
import * as path from 'path';

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, '../public/index.html'));
}

app.whenReady().then(createWindow);