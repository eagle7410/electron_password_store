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
	categorySelect: 1,
	searchText: '',
	showSearchText: false,
	searchIcoActive: '#F44336',
	searchIcoInactive: '#FFA726',
	searchIcoNow: '#FFA726',
	editRow: -1,
	editRowData: false
};

const storage = (state = initialState, action) => {

	let editRowData;

	// eslint-disable-next-line
	switch (action.type) {
		case 'changeCategory':
			return {
				...state,
				categorySelect: action.data
			};
		case 'changeSearchText':
			return {
				...state,
				searchText: action.data
			};
		case 'changeShowSearchText':
			const show = !state.showSearchText;

			return {
				...state,
				showSearchText: show,
				searchText: show ? state.searchText : '',
				searchIcoNow: show ? state.searchIcoActive : state.searchIcoInactive
			};
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
			let data = [].concat(state.data);
			let inx = data.findIndex(row => row.id === state.editRow);
			data[inx] = Object.assign({}, state.editRowData);

			return {
				...state,
				editRowData: false,
				editRow: -1,
				data: data
			};
	}
	return state;
};

export {storage};
