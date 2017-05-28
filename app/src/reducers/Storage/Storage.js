import storageEdit from './StorageActionEdit'

const initialState = {
	data: [{
		id: 1,
		category: 5,
		title: 'T1',
		login: 't1',
		pass: 'pp',
		desc: "deasds\r\n safdsf sadfasd\n",
		answer: 'asddsfa'
	}, {
		id: 2,
		category: 2,
		title: 'T2^',
		login: 't2',
		pass: 'ppp',
		desc: "deasds\r\n safdsf sadfasd\n",
		answer: 'asddsfa'
	}, {
		id: 3,
		category: 2,
		title: 'T3',
		login: 't3',
		pass: 'pppp@',
		desc: "deasds\r\n safdsf sadfasd\n",
		answer: 'asddsfa'
	}, {
		id: 4,
		category: 3,
		title: 'T4',
		login: 't4',
		pass: 'pppp',
		desc: "deasds\r\n safdsf sadfasd\n$",
		answer: 'asddsfa'
	}],
	editRow: -1,
	editRowData: false,
};

const storage = (state = initialState, action) => {

	let data = storageEdit(state, action);

	if (data !== null) {
		return data;
	}
	// eslint-disable-next-line
	switch (action.type) {
		case 'storeAddRow':
			return {
				...state,
				data : [action.data].concat(state.data)
			};

		case 'storeOnDelete':
			data = [].concat(state.data);
			data.splice(data.findIndex(row => row.id === action.data), 1);

			return {
				...state,
				data: data
			};

	}

	return state;
};

export {storage};
