const Routes   = require('../routes/RoutesConstDev');
const send     = require('../libs/send');
const libErr   = require('../libs/errors');

const reqTypes = send.reqTypes;
let model = null;

module.exports = {
	setModel: (dbModel) => model = dbModel,
	config: [
		{
			type   : reqTypes.put,
			route  : Routes.cat,
			handel : (res, action, data) => {
				model.updateSafe(data.id, data.name)
					.then(() => {
						send.ok(res, action);
					}).catch(err => {
					switch (err.type) {
						case libErr.constants.valid :
							send.err(res, action, err.mess);
							break;
						default :
							console.log('!ERR update category', err);
							send.err(res, action, 'No update category. Create ticket to support.');
					}
				});
			}
		},
		{
			type   : reqTypes.del,
			route  : Routes.cat,
			handel : (res, action, id) => {
				model.delete(id)
					.then(() => {
						send.ok(res, action);
					}).catch(err => {
					console.log('!ERR delete category', err);
					send.err(res, action);
				});
			}
		},
		{
			type   : reqTypes.post,
			route  : Routes.cat,
			handel : (res, action, name) => {
				model.save(name)
					.then(cat => {
						send.ok(res, action, cat);
					}).catch(err => {
					switch (err.type) {
						case libErr.constants.valid :
							send.err(res, action, err.mess);
							break;
						default :
							console.log('!ERR save category', err);
							send.err(res, action, 'Server error no save.');
					}
				});
			}
		}
	]
};
