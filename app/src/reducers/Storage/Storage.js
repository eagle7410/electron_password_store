import storageEdit from './StorageActionEdit'

const initialState = {
	data: [],
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
		case 'dataForStore':
			return {
				...state,
				data : action.data
			};
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
