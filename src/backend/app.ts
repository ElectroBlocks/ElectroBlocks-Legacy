import { app, BrowserWindow, Menu, ipcMain, dialog, shell } from 'electron';

import { AppEnums } from './app.enums';
import * as path from 'path';
import * as fs from 'fs';
import { autoUpdater } from "electron-updater";
import log from 'electron-log';
import { UsbService } from "./usb.service";
import { UploadService } from "./upload.service";
import { distinctUntilChanged, filter, map, tap } from "rxjs/operators";
import { firmware, simpleCode } from "../arduino.code";


/**
 * Windows
 */
let mainWindow: BrowserWindow | undefined;


let aboutSoftware: BrowserWindow | undefined;

let codeWindow: BrowserWindow | undefined;

let serialMonitor: BrowserWindow | undefined;

let currentFilePath: string = undefined;

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
log.transports.file.level = 'info';
log.info( 'App starting...' );


const menuTemplate = [
	{
		label: AppEnums.APP_TITLE,
		submenu: [
			{
				label: 'Code View',
				click() {
					if (!codeWindow) {
						codeWindow = new BrowserWindow( {
							title: 'Code View',
							width: 500,
							height: 520,
							autoHideMenuBar: true
						} );
						codeWindow.loadURL( 'file://' + path.join( __dirname, '..', '..', 'view', 'code-view.html' ) );
					}
					codeWindow.show();
					codeWindow.on( 'close', () => codeWindow = null );
				}
			},

			{
				label: 'About Software',
				click() {
					if (!aboutSoftware) {
						aboutSoftware = new BrowserWindow( {
							title: 'About ElectroBlocks IDE',
							width: 500,
							height: 520,
							autoHideMenuBar: true
						} );
						aboutSoftware.loadURL( 'file://' + path.join( __dirname,'..', '..', 'view', 'about.html' ) );
						aboutSoftware.show();
					}

					aboutSoftware.on( 'close', () => aboutSoftware = null );
				}
			},
			{
				label: 'Close',
				click() {
					app.quit();
				}
			},
			{
				role: 'toggledevtools'
			},

		]
	},
	{
		label: 'File',
		submenu: [
			{
				label: 'New',
				click() {
					currentFilePath = undefined;
					mainWindow.webContents.send( 'menu:new' );
				}
			},
			{
				label: 'Open',
				click() {
					dialog.showOpenDialog( mainWindow, {
						properties: [ 'openFile' ],
						filters: [
							{ name: 'ElectroBlocks', extensions: [ 'xml' ] }
						]
					}, ( filePaths, err ) => {
						if (err) {
							console.log( err );
							mainWindow.webContents.send( AppEnums.NODE_ERROR, 'There was an error trying to open the file.' );
							return;
						}
						if (filePaths && filePaths.length > 0) {
							const filePath = filePaths[ 0 ];
							currentFilePath = filePath;
							mainWindow.webContents.send( 'open:file', fs.readFileSync( filePath ).toString() );
						}
					} );
				}
			},
			{
				label: 'Save',
				click() {
					mainWindow.webContents.send( 'menu:save', typeof currentFilePath === 'undefined' );
				}
			},
			{
				label: 'Save As',
				click() {
					mainWindow.webContents.send( 'menu:save', true );
				}
			},
			{
				label: 'Close',
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
			{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
			{ label: 'Cut', accelerator: "CmdOrCtrl+X", selector: "cut:" },

		]
	},
	{
		label: 'Url Settings',
		submenu: [
			{
				label: 'Change Upload Url',
				click() {
					mainWindow.webContents.send( 'menu:changeUploadUrl' );
				}
			},
			{
				label: 'Reset Upload Url',
				click() {
					uploadService.setUploadUrl( UploadService.DEFAULT_ARDUINO_URL )
				}
			},
		]
	},
	{
		label: 'Help',
		submenu: [
			{
				label: 'Online Help',
				click() {
					shell.openExternal( 'http://codingwithnoah.com/arduino-ide-help' )
				}
			},
			{
				label: 'Report a bug',
				click() {
					shell.openExternal( 'https://github.com/phptuts/ElectroBlocks/issues' )
				}
			},
		]
	}
];

const usbService = new UsbService();

const uploadService = new UploadService( usbService );

app.on( 'ready', async () => {
	try {
		await autoUpdater.checkForUpdatesAndNotify();

		await usbService.connect();

		mainWindow = new BrowserWindow( {
			title: AppEnums.APP_TITLE,
			width: 1400,
			height: 900,
			icon: path.join( 'icons', 'icon.png' )
		} );

		mainWindow.loadURL( 'file://' + path.join( __dirname, '..', '..', 'view', 'workspace.html' ) );
		Menu.setApplicationMenu( Menu.buildFromTemplate( menuTemplate ) );

		mainWindow.on( 'close', () => app.quit() );

	} catch (e) {
		console.log( 'startup error', e );
	}
} );

usbService.message$.pipe(
	tap(message => {
		console.log(message.toString(), 'usb message');
	}),
	filter(message => message.toString().indexOf('|******COMPLETE*****|') > 0),
	tap(() => {
		mainWindow.webContents.send('complete:video_debug:arduino.command');
	})
).subscribe();

usbService.message$
	.pipe(
		filter( data =>
			data.toString().indexOf( AppEnums.DEBUG_TABLE_FILTER ) > -1 ),
		map( data => {
			const [ name, type, value ] = data.toString()
				.replace( AppEnums.DEBUG_TABLE_FILTER, '' )
				.split( '_|_' );


			return {
				name: name.toString().trim(),
				type: type.toString().trim(),
				value: value.toString().trim()
			};
		} )
	)
	.subscribe( debugMessage => {
		mainWindow.webContents.send( 'debug:message', debugMessage );
	} );

usbService.message$
	.pipe(
		filter( data => data.toString().indexOf( AppEnums.DEBUG_BLOCK ) > -1 ),
		map( data => data.toString().replace( AppEnums.DEBUG_BLOCK, '' ).trim() )
	).subscribe( blockId => {
	mainWindow.webContents.send( 'debug:block', blockId );
} );

usbService.usb$
	.pipe(
		map( usb => usb !== undefined ),
		distinctUntilChanged()
	)
	.subscribe( async ( hasUsb: boolean ) => {
		if (hasUsb) {
			await usbService.connect();
		}
		mainWindow.webContents.send( 'arduino:usb', hasUsb );
	} );

usbService.message$
	.pipe(
		filter( () => {
			return serialMonitor !== undefined && serialMonitor !== null;
		})
	)
	.subscribe(
		message => serialMonitor.webContents.send('usb:message', message)
	);

ipcMain.on( 'upload:code', async ( event: any, code: string ) => {
	try {
		await uploadService.uploadCode( code );
		mainWindow.webContents.send( 'upload:complete', false, null )
	} catch (e) {
		console.log( e, 'error' );
		mainWindow.webContents.send( 'upload:complete', true, e.message );
	}

} );

ipcMain.on( 'check:usb', async () => {
	const usb = await usbService.getArduinoUsbPort();
	mainWindow.webContents.send( 'arduino:usb', usb !== undefined );
} );

ipcMain.on( 'upload:change_url', ( event: any, url: string ) => {

	uploadService.setUploadUrl( url );

} );

ipcMain.on( 'open:serial-monitor', () => {
	if (!serialMonitor) {
		serialMonitor = new BrowserWindow( {
			title: 'Messages',
			width: 520,
			height: 520,
			autoHideMenuBar: true
		} );
		serialMonitor.loadURL( 'file://' + path.join( __dirname, '..', '..', 'view', 'serial-monitor.html' ) );
		serialMonitor.show();
	}

	serialMonitor.on( 'close', () => {
		serialMonitor = null;
		mainWindow.webContents.send( 'close:serial-monitor' );
	} );
} );

ipcMain.on('send:video_debug:arduino.command', async (e: any, command: string) => {
	await usbService.sendMessage(command);
});

ipcMain.on( 'get:code', () => mainWindow.webContents.send( 'get:code' ) );

ipcMain.on( 'display:code', ( event: any, code: string ) => {
	if (codeWindow) {
		codeWindow.webContents.send( 'show:code', code );
	}
} );

ipcMain.on('video:debug-mode', async (event: any, isOn: boolean) => {

	const usbPort = await  usbService.getArduinoUsbPort();

	if (!usbPort) {
		mainWindow.webContents.send('video:debug', isOn);
		return;
	}

	const code = isOn ? firmware : simpleCode;

	console.log(isOn ? 'Uploading FirmWare' : 'Uploading Simple Code');

	await uploadService.uploadCode(code);

	mainWindow.webContents.send('video:debug', isOn);
});

ipcMain.on( 'debug:continue', async () => await usbService.sendMessage( 's|' ) );

ipcMain.on( 'send:message', async ( e: any, word: string ) => {
	await usbService.sendMessage( word );
} );

ipcMain.on( 'save:file', ( e: any, code: string, filePath?: string ) => {
	currentFilePath = filePath ? filePath : currentFilePath;
	fs.writeFile( currentFilePath, code, err => {
		if (err) {
			mainWindow.webContents.send( AppEnums.NODE_ERROR, 'There was an trying to save the file.' );
			return;
		}
	} );
} );


autoUpdater.on( 'checking-for-update', () => {
	log.error( 'Checking for update...' );
} );
autoUpdater.on( 'update-available', ( info ) => {
	log.error( 'Update available. \n' + JSON.stringify( info ) );
} );
autoUpdater.on( 'update-not-available', ( info ) => {
	log.error( 'Update not available.\n' + JSON.stringify( info ) );
} );
autoUpdater.on( 'error', ( err ) => {
	log.error( 'Error in auto-updater. ' + err );
} );
autoUpdater.on( 'download-progress', ( progressObj ) => {
	let log_message = "Download speed: " + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
	log.error( log_message );
} );
autoUpdater.on( 'update-downloaded', ( info ) => {
	log.error( 'Update downloaded\n' + JSON.stringify( info ) );
} );
