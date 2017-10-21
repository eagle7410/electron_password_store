const fs = require('fs-extra');
const root = `${__dirname}/../`;

const fileContentChange = async (pathRead, pathWrite, promiseWrite) => {
	let data = await fs.readFile(pathRead, 'utf8');

	data =  await promiseWrite(data.toString());

	await fs.writeFile(pathWrite, data);

};

const createServer = async () => {
	const transform = data => new Promise(
		write => write(
			data.replace(/\n(.*)console\.log\(\`\:\: \$\{action\}([^\n])+/, '')
				.replace('db_test', 'db')
				.replace('RoutesConstDev', 'RoutesConst')
	));

	await fileContentChange(root + 'server-dev.js', root + 'server.js', transform);
	console.log('Create server is ok.');
};

const createIndex = async () => {
	const transform = data => new Promise(
		write => {
			write(
				data.replace(/\/\/ dev([^\/]+)\/\/\send dev(.*)\n/gi, '')
					.replace('mainWindow.loadURL(\'http://localhost:3000/\');', 'mainWindow.loadURL(`file://${__dirname}/html/index.html`);')
					.replace(/\n(\t){0,}\n/g, '\n')
					.replace('./server-dev', './server')
			)

		});

	await fileContentChange(root + 'index-app-dev.js', root + 'index-app.js', transform);
	console.log('Index create is ok.');
};

const setProdArchiveName =  async () => {
	const transform = data => new Promise(
		write => write( data.replace(/fileName(\s){0,}=(\s){0,}\'(.*)\'/,'fileName    = \'data.json.zip\'') )
	)

	await fileContentChange(root + 'libs/path-manager.js', root + 'libs/path-manager.js', transform);
	console.log('Set prod archive name is ok.');
};

const removeCloudData =  async () => {
	let path = root + 'libs/clouds/init-data'
	let files = await fs.readdir(path);

	for (let file of files) {
		await fs.unlink(`${path}/${file}`)
		console.log('-- remove ' + file);
	}

	console.log('Remove cloud data is ok');
};

const createProdStart = async () => {
	try {
		await removeCloudData();
		await createIndex();
		await createServer();
		await setProdArchiveName();
		console.log('Success ...')
	} catch (e) {
		console.log('!!!Fail', e);
	}
};

createProdStart();
