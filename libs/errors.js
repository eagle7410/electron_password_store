const constants = {
	valid : 'validation',
	auth  : 'auth',
	sdf   : 'sdf',
};

const valid = mess => ({
	type: constants.valid,
	mess: mess
});

const auth = mess => ({
	type: constants.auth,
	mess: mess || 'Bad password',
});

const sdf = mess => ({
	type: constants.sdf,
	mess: mess,
});

module.exports = {
	constants : constants,
	valid     : valid,
	auth      : auth,
	sdf       : sdf
};
