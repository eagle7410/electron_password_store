import AlertStatus from '../const/AlertStatus';

const initialState = {
	status  : AlertStatus.OK,
	message : '',
	open    : false,
};

const alert = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'alertShow':
			return {
				...state,
				...action.data,
				open : true
			};
		case 'alertClose':
			return {
				...initialState,
			};
	}

	return state;
};

export {alert};
