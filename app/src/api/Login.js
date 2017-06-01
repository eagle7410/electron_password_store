import Routes from '../const/apiRoutes'
import {get, status} from '../utils/Req'
import {Auth} from '../const/Messages'

const loginList = () => new Promise((ok, bad) => {
	get(Routes.usrList)
		.then(r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad();

		}, bad);

});

const auth = (login, pass) => new Promise((ok, bad) => {

	get(Routes.auth, {login: login, pass: pass})
		.then(r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad(Auth.passBad);
		}, e => {
			console.log(Auth.authBad, e);
			bad(Auth.passBad)
		});
});

export {loginList, auth};
