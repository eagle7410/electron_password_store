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
	let fieldSearch = '';

	if (store.showSearchText) {
		fieldSearch = <TextField
			id="inputSearch"
			hintText='Enter for search'
			onChange ={state.handelChangeSearchText}
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
						hoverColor={store.searchIcoActive}
						color={store.searchIcoNow}
						onTouchTap={state.handelChangeShowSearchText}
					/>
				</IconButton>
				{fieldSearch}
				<ToolbarSeparator />

				<DropDownMenu value={store.categorySelect} onChange={state.handelChangeCategory} >
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
		store : state.storage
	})
)(StoreTools);
