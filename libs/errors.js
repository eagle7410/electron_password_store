const constants = {
	valid : 'validation',
	auth  : 'auth'
};

const valid = mess => ({
	type: constants.valid,
	mess: mess
});

const auth = mess => ({
	type: constants.auth,
	mess: mess || 'Bad password',
});

module.exports = {
	constants : constants,
	valid     : valid,
	auth      : auth
};
