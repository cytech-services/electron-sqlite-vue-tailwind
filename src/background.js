'use strict'

const fs = require('fs');
const path = require('path')

import { BrowserWindow, app, ipcMain, protocol } from 'electron'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

// Process environment variables
const isDevelopment = process.env.NODE_ENV !== 'production'
const storagePath = process.env.NODE_STORAGE_PATH || 'userData'
const storagePathExtra = process.env.NODE_STORAGE_PATH_EXTRA || ''
const storagePathDatabaseExtra = process.env.NODE_STORAGE_PATH_DATABASE_EXTRA || ''

process.on('unhandledRejection', (error) => {
	console.error(error)
})

ipcMain.handle('check-db-exists', () => {
	let appPath = path.join(app.getPath(storagePath), '.' + storagePathExtra + storagePathDatabaseExtra)

	// Create the app storage directory if it doesn't exist
	if (!fs.existsSync(appPath)) {
		fs.mkdirSync(appPath, { recursive: true });
	}

	return path.join(appPath, './mysqlite.db')
})

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
	{ scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		frame: false,
		width: 1280,
		height: 1000,
		minWidth: 1280,
		minHeight: 1000,
		x: 0,
		y: 0,
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: true,
			contextIsolation: true,
		},
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
		if (!process.env.IS_TEST) win.webContents.openDevTools()
	} else {
		createProtocol('app')
		// Load the index.html when not in development
		win.loadURL('app://./index.html')
	}

	// Listen for windows control button events and
	// apply the necessary action
	ipcMain.on('minimizeWindow', () => { win.minimize() })
	ipcMain.on('maximizeWindow', () => { win.maximize() })
	ipcMain.on('restoreWindow', () => { win.restore() })
	ipcMain.on('closeApplication', () => { win.close() })

	// Detect windows resize events and inform the
	// titlebar which icon and functionality it should
	// have: maximize or restore
	win.on('resize', function () {
		if (win.isMaximized()) {
			win.webContents.send('isMaximized')
		} else {
			win.webContents.send('isRestored')
		}
	});
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		// try {
		//   await installExtension(VUEJS3_DEVTOOLS)
		// } catch (e) {
		//   console.error('Vue Devtools failed to install:', e.toString())
		// }
	}
	createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit()
			}
		})
	} else {
		process.on('SIGTERM', () => {
			app.quit()
		})
	}
}
