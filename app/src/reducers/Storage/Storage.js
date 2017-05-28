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
	categoryList: {
		1: 'All Category',
		2: 'Unknown',
		3: 'First',
		4: 'Sec',
		5: 'Think'
	},
	editRow: -1,
	editRowData: false,
};

const storage = (state = initialState, action) => {

	let editRowData;
	let data;

	// eslint-disable-next-line
	switch (action.type) {
		case 'storeOnEdit':
			const id = action.data;

			return {
				...state,
				editRow: action.data,
				editRowData: Object.assign({}, state.data.find(row => row.id === id))
			};
		case 'storeOnEdited':
			return {
				...state,
				editRow: -1,
				editRowData: false
			};
		case 'storeEditRowCategory':
			editRowData = Object.assign({}, state.editRowData);
			editRowData.category = action.data;

			return {
				...state,
				editRowData: editRowData
			};
		case 'storeEditRowText':
			editRowData = Object.assign({}, state.editRowData);
			editRowData[action.data.type] = action.data.val;

			return {
				...state,
				editRowData: editRowData
			};
		case 'storeOnEditDesc':

			editRowData = Object.assign({}, state.editRowData);
			editRowData.desc = action.data;

			return {
				...state,
				editRowData: editRowData
			};

		case 'storeOnSaveEdit':
			data = [].concat(state.data);
			data[data.findIndex(row => row.id === state.editRow)] = Object.assign({}, state.editRowData);

			return {
				...state,
				editRowData: false,
				editRow: -1,
				data: data
			};
		case 'storeOnDelete':
			data = [].concat(state.data);
			data.splice(data.findIndex(row => row.id === action.data), 1);

			return {
				...state,
				data: data
			}
	}
	return state;
};

export {storage};
