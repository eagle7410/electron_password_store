const initialState = {
	data : [ {
		id       : 1,
		category : 1,
		title    : 'T1',
		login    : 't1',
		pass     : 'pp',
		desc     : "deasds\r\n safdsf sadfasd\n",
		answer   : 'asddsfa'
	}, {
		id       : 2,
		category : 2,
		title    : 'T2',
		login    : 't2',
		pass     : 'ppp',
		desc     : "deasds\r\n safdsf sadfasd\n",
		answer   : 'asddsfa'
	},{
		id       : 3,
		category : 2,
		title    : 'T3',
		login    : 't3',
		pass     : 'pppp',
		desc     : "deasds\r\n safdsf sadfasd\n",
		answer   : 'asddsfa'
	},{
		id       : 4,
		category : 3,
		title    : 'T4',
		login    : 't4',
		pass     : 'ppppp',
		desc     : "deasds\r\n safdsf sadfasd\n",
		answer   : 'asddsfa'
	}],
};

const storage = (state = initialState, action) => {
	return state;
};

export {storage};
