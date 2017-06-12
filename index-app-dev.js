const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const server        = require('./server-dev');

app.on('ready', () => {
	const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
	//noinspection JSUnresolvedFunction
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
	//noinspection JSUnresolvedFunction
	installExtension(REDUX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	let mainWindow = new BrowserWindow({
		width  : 800,
		height : 800,
	});

	server.run(mainWindow)
		.then(() => {
			mainWindow.maximize();
			mainWindow.toggleDevTools();
			mainWindow.loadURL('http://localhost:3000/');

			mainWindow.on('closed', () => {
				mainWindow = null;
				app.quit();
			});

			require('./menu-app').add(Menu, app);
		});
});
