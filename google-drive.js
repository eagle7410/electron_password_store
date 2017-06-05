var dbox = require('dbox')
var app = dbox.app({'app_key': 'ubcbn3drvnihgn5', 'app_secret': '5q63ex1wt3uohcf'});

var client = app.client(
	{ oauth_token_secret: 'b8svl4n9ezueyq0',
		oauth_token: 'segigyw2h71o5vcj',
		uid: '676270618' }

);
// client.account(function (status, reply) {
// 	console.log(reply)
// })
client.get('/Color', function (status, reply, metadata) {
	console.log(reply, metadata)
})
