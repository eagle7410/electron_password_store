import {get, status} from '../utils/Req'

const loginList = () => new Promise((ok, bad) => {
	get('users-list')
		.then(r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad();

		}, bad);

});

const auth = (login, pass) => new Promise((ok, bad) => {
	const messBad = 'No correct password';

	get('auth', {login: login, pass: pass})
		.then(r => {
			if (r.status === status.ok) {
				return ok(r.data);
			}

			bad(messBad);
		}, e => {
			console.log('Err response auth', e);
			bad(messBad)
		});
});

export {loginList, auth};
