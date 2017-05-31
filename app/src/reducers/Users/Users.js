const initialState = {
	users : [],
	editName : '',
	addName  : '',
	addPass  : '',
	onEdit   : false,
};

const users = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'dataForUsers':
			return {
				...state,
				users : action.data
			};
		case 'storeOnChangeAddPassUser':
			return {
				...state,
				addPass : action.data
			};
		case 'storeOnChangeAddNameUser':
			return {
				...state,
				addName : action.data
			};
		case 'storeAddUser':
			let users = [].concat(state.users);
			users.push(action.data);
			return {
				...state,
				users : users,
				addName : '',
				addPass : ''
			};
	}

	return state;
};

export {users};
