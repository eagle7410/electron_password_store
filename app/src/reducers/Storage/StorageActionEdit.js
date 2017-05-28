
const storageActionEdit = (state, action) => {

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
	}

	return null;
};

export default storageActionEdit;
