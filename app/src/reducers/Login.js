/* eslint-disable default-case */
const initialState = {
	login: false,
	pass: false,
	token: false,
	list: [],
	isLoad: true,
	isLoaded: false,
	isAuth: false,
	errorPass : '',
	errorLogin : ''
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case 'loginValidateBad':
			return {
				...state,
				...action.data
			};
		case 'loginOnLoadOk':
			let newState = {
				...state,
				isLoad: false,
				isLoaded: true,
				list: action.data
			};

			if (newState.list.length === 1) {
				newState.login = newState.list[0];
			}

			return newState;

		case 'loginOnLoginChange':
			return {
				...state,
				login: action.data
			};
		case 'loginOnPassChange':
			return {
				...state,
				pass: action.data
			};
		case 'loginOnSubmit':
			return {
				...state,
				errorPass: '',
				errorLogin: '',
			};
		case 'loginOnAuthOk':
			return {
				...state,
				isAuth: true,
				token: action.data
			};
		case 'loginOnAuthBad':
			return {
				...state,
				errorPass: action.data
			};
		case 'logout':
			return {
				...state,
				login: false,
				pass: false,
				token: false,
				isAuth: false,
			}
	}

	return state;
};

export {login};
