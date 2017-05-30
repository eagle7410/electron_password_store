const initialState = {
	categorySelect: 2,
	categoryAll   : 2,
	searchText: '',
	showSearchText: false,
	searchIcoActive: '#F44336',
	searchIcoInactive: '#FFA726',
	searchIcoNow: '#FFA726',
};

const storageFilters = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case 'changeCategory':
			return {
				...state,
				categorySelect: action.data
			};
		case 'changeSearchText':
			return {
				...state,
				searchText: action.data
			};
		case 'changeShowSearchText':
			const show = !state.showSearchText;

			return {
				...state,
				showSearchText: show,
				searchText: show ? state.searchText : '',
				searchIcoNow: show ? state.searchIcoActive : state.searchIcoInactive
			};
	}
	return state;
};

export {storageFilters};
