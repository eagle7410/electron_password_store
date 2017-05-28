import React from 'react';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

const StoreTools = (state) => {
	let store = state.store;
	let filters = state.filters;
	let fieldSearch = '';

	if (filters.showSearchText) {
		fieldSearch = <TextField
			id="inputSearch"
			hintText='Enter for search'
			onChange ={state.changeSearchText}
		/>
	}

	return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text="Tools" />
				<IconButton
					tooltip="Search"
					touch={true}
					tooltipPosition="bottom-right"
				>
					<ActionSearch
						hoverColor={filters.searchIcoActive}
						color={filters.searchIcoNow}
						onTouchTap={state.changeShowSearchText}
					/>
				</IconButton>
				{fieldSearch}
				<ToolbarSeparator />

				<DropDownMenu value={filters.categorySelect} onChange={state.changeCategory} >
					{Object.keys(store.categoryList).map(
						inx => <MenuItem value={Number(inx)} key={'cat'+inx } primaryText={store.categoryList[inx]} />
					)}
				</DropDownMenu>

			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		store : state.storage,
		filters : state.storageFilters
	}),
	dispatch => ({
		changeCategory : (event, index, value) => dispatch({type: 'changeCategory', data: value}),
		changeSearchText : (ev, val) => dispatch({type: 'changeSearchText', data: val.toLowerCase()}),
		changeShowSearchText : ev => dispatch({type: 'changeShowSearchText', data: ev.target.value}),
	})
)(StoreTools);
