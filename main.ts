import { app, BrowserWindow, screen, ipcMain } from 'electron';

let win: BrowserWindow = null;

function createWindow(): BrowserWindow {

    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 500,
        icon: './src/favicon.ico',
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL('http://localhost:4200');

    win.webContents.openDevTools();
    return win;
}

try {
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });

    ipcMain.on('create-folder', (evt, arg) => {
        console.log('ipcMain');
        console.log(arg);
        evt.sender.send('create-folder-result', { msg: 'finished!' })
    });

} catch (e) {
    // Catch Error
    // throw e;
}


try {
    require('electron-reloader')(module, {});
} catch (_) {}
