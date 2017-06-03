import {Sdf} from '../../const/Events';

const initialState = {
	buttonLoad : false,
	buttonClear: false,
	buttonAdd  : true,
};

const sdfTools = (state = initialState, action) => {

	switch (action.type) {
		case Sdf.loadRun :
			return {
				...state,
				buttonLoad  : false,
				buttonClear : false,
				buttonAdd   : false,
			};
		case Sdf.loadBad :
		case Sdf.add :
			return {
				...state,
				buttonLoad  : true,
				buttonClear : true,
				buttonAdd   : false,
			};
		case Sdf.loadOk :
		case Sdf.clear :
			return {
				...initialState
			};
	}

	return state;
};

export {sdfTools};
