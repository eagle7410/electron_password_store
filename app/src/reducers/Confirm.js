const initialState = {
	actionCancel  : '',
	actionConfirm : '',
	dataCancel    : false,
	dataConfirm   : false,
	question      : '',
	open          : false
};

const dataConfirm = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {

		case 'confirmCancel':
			return {...initialState	};

		case 'confirmOk':
			return {...initialState	};

		case 'storeConfirm':
			let data = action.data;

			return {
				...state,
				...data,
				open : true,
			};
	}

	return state;
};

export {dataConfirm};

