/**
 * Created by igor on 21.05.17.
 */

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const server        = require('./server');


app.on('ready', () => {
	const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
	installExtension(REDUX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	let mainWindow = new BrowserWindow({
		width: 800,
		height : 800,
	});

	server.run(mainWindow);

	mainWindow.maximize();
	mainWindow.loadURL('http://localhost:3000/');
	mainWindow.toggleDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
		app.quit();
	});

});
