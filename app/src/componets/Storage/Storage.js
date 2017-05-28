import React from 'react';
import {connect} from 'react-redux';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import IconAdd from 'material-ui/svg-icons/av/playlist-add'
import IconStore from 'material-ui/svg-icons/image/grid-on'

import Tools from './StorageTools'
import Table from './StorageTable'
import Add from './Add'

const Storage =  (state) => {

	return (
		<div>
			<NavMenu />
			<h1>Storage</h1>
			<Tabs>
				<Tab
					label="Data"
				    icon={<IconStore />}
				>
					<Paper zDepth={2}>
						<Tools
							handelChangeCategory={state.changeCategory}
							handelChangeSearchText={state.changeSearchText}
							handelChangeShowSearchText={state.changeShowSearchText}
						/>
					</Paper>
					<Table
						handelEdit={state.onEdit}
						handelEdited={state.onEdited}
						handelDelete={state.onDelete}
					/>
				</Tab>
				<Tab
					label="Add record"
				    icon={<IconAdd/>}
				>
					<Add/>
				</Tab>
			</Tabs>

			</div>

		);
};

export default connect(
	state => ({
		store: state.storage
	}),
	dispatch => ({
		changeCategory : (event, index, value) => dispatch({type: 'changeCategory', data: value}),
		changeSearchText : (ev, val) => dispatch({type: 'changeSearchText', data: val.toLowerCase()}),
		changeShowSearchText : ev => dispatch({type: 'changeShowSearchText', data: ev.target.value}),
		onEdit : id => dispatch({type : 'storeOnEdit', data : id}),
		onDelete : id => dispatch({type : 'storeOnDelete', data : id}),
	})
)(Storage);
