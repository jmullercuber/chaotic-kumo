const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  ipcRenderer.send("resize-window", 150, 165);
});
