import { app, BrowserWindow, screen, ipcMain, BrowserView } from 'electron';

let win: BrowserWindow;
let view: BrowserView;
let viewContent: BrowserView;

function createWindow(): BrowserWindow {
    // let defaultUrl: string = 
    // Create the browser window.
    const mainScreen = screen.getPrimaryDisplay();
    win = new BrowserWindow({
        width: 900,
        height: 900,
        icon: './src/favicon.ico',
        webPreferences: {
            nodeIntegration: true,
        },
    });
   // win.webContents.openDevTools();
    return win;
}

try {
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', () => {
        win = createWindow();
        view = new BrowserView({
            webPreferences: {
                nodeIntegration: true,
                // preload: path.join(__dirname, './utils/preload.js'),
            },
        });
        viewContent = new BrowserView({
            webPreferences: {
                nodeIntegration: false,
                // preload: path.join(__dirname, './utils/preload.js'),
            },
        });
        win.addBrowserView(view);
        win.addBrowserView(viewContent);
        view.setBounds({ x: 0, y: 0, width: 900, height: 200});
        viewContent.setBounds({ x: 0, y: 200, width: 900, height: 700});
        view.setAutoResize({ horizontal: true });
        viewContent.setAutoResize({ width: true, height: true, horizontal: true, vertical: true  });
        view.webContents.loadURL('http://localhost:4200');
        viewContent.webContents.loadURL('http://localhost:8848');
        win.on('maximize', () => {
            console.log(77888)
            const mainScreen = screen.getPrimaryDisplay();
            view.setBounds({ x: 0, y: 0, width: mainScreen.workArea.width, height: 200});
            viewContent.setBounds({x: 0, y: 200, width: mainScreen.workArea.width, height: mainScreen.workArea.height - 200});
    
        });
    } );

   

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
        console.log(11111)
        if (!win) {
            createWindow();
        }
        
    });

    ipcMain.on('create-folder', (evt, arg) => {
        console.log('ipcMain');
        console.log(arg);
        evt.sender.send('create-folder-result', { msg: 'finished!' });
    });

    ipcMain.on('change', (evt, arg) => {
        console.log('change');
        
    });
} catch (e) {
    // Catch Error
    // throw e;
}

try {
    require('electron-reloader')(module, {});
} catch (_) { }
