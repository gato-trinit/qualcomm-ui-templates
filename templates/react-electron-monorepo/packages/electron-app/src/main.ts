import {app, BrowserWindow, ipcMain} from "electron"
import {resolve} from "node:path"
import {setTimeout} from "node:timers/promises"

import {registerHandlers} from "./handlers/registry"
import {store} from "./store"

let win: BrowserWindow

const appUrl = "http://localhost:5173"

const createWindow = async () => {
  const isDev = process.env.DEV

  const theme = store.get("theme")
  const backgroundColor = theme === "light" ? "#ffffff" : "#0a0a0a"

  win = new BrowserWindow({
    backgroundColor,
    height: 800,
    webPreferences: {
      preload: resolve(__dirname, "./preload.cjs"),
    },
    // add room for devTools panel
    width: isDev ? 1550 : 1200,
  })

  win.removeMenu()

  if (isDev) {
    /**
     * The electron process starts in local dev mode at the same time as the Angular
     * application.  The electron process generally starts quicker, so the Angular
     * app doesn't have enough time to load before the electron process tries to
     * access it. This function checks if the app is available.
     */
    const ora = await import("ora").then((pkg) => pkg.default)
    const spinner = ora("Checking for app ready state").start()

    let attempt = 0
    let appReady = false
    // default behavior = check for 60 seconds.
    while (attempt < 120 && !appReady) {
      attempt += 1
      spinner.text = `Checking for app ready state, attempt ${attempt}`
      const checkIfReady = await setTimeout(500, async () =>
        fetch(appUrl)
          .then((res) => {
            return res.status === 200
          })
          .catch(() => false),
      )
      if (await checkIfReady()) {
        appReady = true
        spinner.succeed(`App detected in local dev mode at ${appUrl}`)
      }
    }

    if (appReady) {
      win
        .loadURL(appUrl)
        .then(() => {
          win.webContents.openDevTools()
        })
        .catch((err: any) => {
          console.debug(`Error starting application - ${err}`)
        })
        .catch((err) => {
          console.debug("Critical application error, exiting", err)
          win.close()
          process.exit(0)
        })
    } else {
      spinner.fail(
        `Failed to start application. Please ensure that the React application is running at ${appUrl}`,
      )
      process.exit(0)
    }
  } else {
    await win.loadFile(`${__dirname}/index.html`).catch((err) => {
      console.log("Error starting application", err)
    })
  }
}

app.whenReady().then(() => {
  registerHandlers()

  // Sync handler so the preload can set data-theme before the page renders
  ipcMain.on("ipc::get-theme-sync", (event) => {
    event.returnValue = store.get("theme")
  })

  createWindow()
})

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
