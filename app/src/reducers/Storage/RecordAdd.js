const initialState = {
	category: false,
	title: '',
	login: '',
	pass: '',
	desc: '',
	answer: '',
	errorCategory : ''
};

const recordAdd = (state = initialState, action) => {
	let newState;

	// eslint-disable-next-line
	switch (action.type) {
		case 'storeAddInit':
			return {...initialState};

		case 'storeAddRecordErrorCategory':
			return {
				...state,
				errorCategory : action.data
			};
		case 'storeAddRecordOnSave':
			return {
				...state,
				errorCategory : ''
			};

		case 'storeAddRecordAddText':
			newState = Object.assign({}, state);
			newState[action.data.type] = action.data.val;

			return {
				...state,
				...newState
			};

		case 'storeAddRecordAddCategory':
			return {
				...state,
				category: action.data
			};

		case 'storeAddRecordAddDesc':
			return {
				...state,
				desc: action.data
			};
	}

	return state;
};

export {recordAdd};
