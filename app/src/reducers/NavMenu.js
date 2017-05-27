
const initialState = {
	routeTo: '/',
	routeForm: '/',
	select : 0
};

const navMenu = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'goTo' :
			return {
				...state,
				routeForm : state.routeTo,
				...action.data
			};
		case 'goToClear' :
			return {
				...state,
				routeForm : state.routeTo,
			};
		case 'logout':
			return {
				...initialState
			}
	}

	return state;
};

export {navMenu};
