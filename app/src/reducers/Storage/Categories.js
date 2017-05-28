const initialState = {
	list: {
		1: 'All Category',
		2: 'Unknown',
		3: 'First',
		4: 'Sec',
		5: 'Think'
	},
	noChoice : [1],
	onEdit   : false,
	editName : '',
	addName : ''
};

const storageCategories = (state = initialState, action) => {
	let list;
	// eslint-disable-next-line
	switch (action.type) {
		case 'storeOnChangeAddNameCategory':
			return {
				...state,
				addName : action.data
			};
		case 'storeAddCategory':
			list = Object.assign({}, state.list);
			list[action.data.id] = action.data.name;

			return {
				...state,
				list : list,
				addName : ''
			};
		case 'storeChangeEditCategory':
			return {
				...state,
				editName : action.data
			};
		case 'storeOnSaveEditCategory':
			list = Object.assign({}, state.list);
			list[String(state.onEdit)] = state.editName;
			return {
				...state,
				list: list,
				onEdit: false,
				editName: ''
			};
		case 'storeOnEditCategory':
			return {
				...state,
				onEdit: action.data,
				editName : state.list[String(action.data)]
			};
		case 'storeOnCancelEditCategory':
			return {
				...state,
				onEdit: false,
				editName: ''
			};
		case 'storeOnDeleteCategory':
			list = Object.assign({}, state.list);
			delete list[action.data];
			return {
				...state,
				list : list
			};

	}

	return state;
};

export {storageCategories};

