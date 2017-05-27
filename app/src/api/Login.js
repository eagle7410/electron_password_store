const loginList = () => new Promise((ok) => {
	const list = ['Igor','Vasia'];

	ok(list);
});

const auth = (login, pass) => new Promise((ok, bad) => {
	const secret = 'igor';

	if (login === 'Igor' && String(pass) === '123' ) {
		return ok(secret);
	}

	bad('No correct password');
});

export {loginList, auth};
