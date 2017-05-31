import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import StorageCategoriesList from './StorageCategoriesList'
import {StorageFilters} from '../../const/Events'

const StoreTools = (state) => {
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

				<StorageCategoriesList onEdit={state.changeCategory} showAll={true} val={filters.categorySelect} />

			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		filters : state.storageFilters
	}),
	dispatch => ({
		changeCategory : (event, index, value) => dispatch({type: StorageFilters.chCat, data: value}),
		changeSearchText : (ev, val) => dispatch({type: StorageFilters.chText, data: val.toLowerCase()}),
		changeShowSearchText : ev => dispatch({type: StorageFilters.toggleText, data: ev.target.value}),
	})
)(StoreTools);
