const initialState = {
	isLoad : true,
	isOk   : false
};

const dataLoader = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case 'dataLoadedOk':
			return {
				...state,
				isLoad : false,
				isOk   : true,
			};
		case 'dataLoadedBad':
			return {
				...state,
				isLoad : false
			};
	}

	return state;
};

export {dataLoader};
