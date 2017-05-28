const initialState = {
	actionCancel  : '',
	actionConfirm : '',
	dataCancel    : false,
	dataConfirm   : false,
	question      : '',
	open          : false
};

const storageConfirm = (state = initialState, action) => {
	switch (action.type) {
		case 'storeCancelDelete':
			return {
				...state,
				dataCancel  : false,
				dataConfirm : false,
				open : false
			};

		case 'storeConfirm':
			let data = action.data;

			return {
				...state,
				...data,
				open : true,
			};
			
		case 'storeOnDelete':
			return {
				...state,
				open: false
			};
	}

	return state;
};

export {storageConfirm};
