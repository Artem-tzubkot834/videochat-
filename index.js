console.log("helloy");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow(){
    win = new BrowserWindow({
        width: 900,
        height: 700,
       
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file',
        slashes: true, 

    }));
    win.on("closed", () => {
        win = null;
    })
}

app.on('ready', createWindow);
app.on('window-all-close', () =>{
    if(process.platform !== 'darwin'){
        app.quit();
    }

    app.on('activate', () => {
        if(win === null){
            createWindow();
        }
    });
});
const packager = require('electron-packager')

async function bundleElectronApp(options) {
  const appPaths = await packager(options)
  console.log(`Electron app bundles created:\n${appPaths.join("\n")}`)
}