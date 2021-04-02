const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    transparent: true,
    resizable: false,
    fullscreenable: false,
    maximizable: false, // not implemented on Linux
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  win.setAlwaysOnTop(true);
}

// https://stackoverflow.com/a/66068492/2877687
// electron can't be transparent on linux
// see issue on github: https://github.com/electron/electron/issues/2170

app.disableHardwareAcceleration();

//createWindow need to wait(more than about 100ms) if you want the window to be transparent
// app.whenReady won't work
app.on("ready", () => {
  setTimeout(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  }, 200);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("resize-window", (event, width, height) => {
  let browserWindow = BrowserWindow.fromWebContents(event.sender);
  browserWindow.setSize(width, height);
});
