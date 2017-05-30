const initialState = {
	list: {},
	noChoice : [2],
	onEdit   : false,
	editName : '',
	addName : ''
};

const storageCategories = (state = initialState, action) => {
	let list;
	// eslint-disable-next-line
	switch (action.type) {
		case 'dataForCategories':
			return {
				...state,
				list : action.data
			};
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

