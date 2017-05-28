const routes = {
	login    : '/login',
	logout   : '/logout',
	storage  : '/storage',
	settings : '/settings',
	users    : '/users',
};

const afterAuth = routes.storage;
const index     = routes.storage;

export {routes, afterAuth, index};

