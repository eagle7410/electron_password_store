const libError = require('./errors');
const fs = require('fs');

const fileContent = path => new Promise((ok, bad) => {
	fs.readFile(path, (err, data) => {

		if (err) {
			console.log('Error read file ' + path, e);
			return bad(libError.sdf('Error read file.'));
		}

		ok(data.toString());

	})
});

const toWord = (pass, code) => {
	let buf = '';
	let res = '';
	let k = z = 0;

	for (let i = 0; i < code.length; i++) {
		if (code.charAt(i) === '#') {
			buf = code.substr(k, (i - k));
			k = i + 1;
			if (z === (pass.length)) z = 0;
			res += String.fromCharCode(parseInt(buf) - pass.charCodeAt(z));

			z++;
		}
	}
	return res;
};

const decodeData = data => new Promise((ok, bad) => {
	data = data.replace(/\r/g, '').split("\n");
	let pass = (data.shift()).split('#').map(char => {
		char = Number(char) / 2;
		return String.fromCharCode(char);
	}).slice(0, -1).join('');

	let decodeData = [];

	while (data.length) {
		decodeData.push({
			title    : toWord(pass, data.shift()),
			login    : toWord(pass, data.shift()),
			pass     : toWord(pass, data.shift()),
			answer   : toWord(pass, data.shift()),
			desc     : toWord(pass, data.shift()),
			category : 3
		});
	}

	ok(decodeData);

});

module.exports.content = path => new Promise((ok, bad) => {
	fileContent(path)
		.then(decodeData)
		.then(ok)
		.catch(bad);
});
