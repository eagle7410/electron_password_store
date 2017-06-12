const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const server        = require('./server');

app.on('ready', () => {
	let mainWindow = new BrowserWindow({
		width  : 800,
		height : 800,
	});

	server.run(mainWindow)
		.then(() => {
			mainWindow.loadURL(`file://${__dirname}/html/index.html`);

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
