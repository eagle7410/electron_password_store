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

			// Create the Application's main menu
			const template = [{
				label: "Application",
				submenu: [
					{ label: "About Application", selector: "orderFrontStandardAboutPanel:" },
					{ type: "separator" },
					{ label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
				]}, {
				label: "Edit",
				submenu: [
					{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
					{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
					{ type: "separator" },
					{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
					{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
					{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
					{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
				]}
			];

			Menu.setApplicationMenu(Menu.buildFromTemplate(template));
		});
});
