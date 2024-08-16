import { app, BrowserWindow, Notification } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 主进程
let win;

// 创建窗口
const createWindow = () => {
  // BrowserWindow 负责创建和管理窗口
  win = new BrowserWindow({
    icon: path.join(__dirname, "favicon.png"),
    width: 1400,
    height: 900,
  });

  // 隐藏菜单
  win.setMenu(null);

  win.loadFile("index.html");
};

function showtit() {
  new Notification({
    title: "系统通知",
    body: "检查到你男朋友送来生日祝福，请立马查收...",
  }).show();
}

app
  .whenReady()
  .then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .then(showtit);

// 关闭窗口（windows&linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 任务栏配置
app.setUserTasks([
  {
    program: process.execPath,
    arguments: "--new-window",
    iconPath: process.execPath,
    iconIndex: 0,
    title: "再看一次",
    description: "打开一个新的窗口",
  },
]);
