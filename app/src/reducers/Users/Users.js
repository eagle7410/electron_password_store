
const initialState = {
	users : [],
};

const users = (state = initialState, action) => {
	switch (action.type) {
		case 'dataForUsers':
			return {
				...state,
				users : action.data
			};
	}
	return state;
};

export {users};
