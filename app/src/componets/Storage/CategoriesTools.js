import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {add} from '../../api/Category'
import AlertStatus from '../../const/AlertStatus'

const CategoriesTools = (state) => {
	let store = state.store;

	const handelSave = () => {
		const val = store.addName;

		if (!val) {
			return state.showAlert('Enter new category name', AlertStatus.BAD);
		}

		add(val).then(data => {
			state.save(data);
			state.showAlert('Category is saved.', AlertStatus.OK);
		}, err => {
			state.showAlert(err, AlertStatus.BAD);
		});
	};

	return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text="Tools"/>
				<ToolbarSeparator />
				<RaisedButton
					label="Add category"
					primary={true}
					icon={<ActionAdd />}
					onTouchTap={handelSave}
				/>
				<TextField
					hintText={'Enter category'}
					value={store.addName}
					onChange={state.onChangeAddName}
				/>

			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		store: state.storageCategories
	}),
	dispatch => ({
		onChangeAddName : ev => dispatch({type : 'storeOnChangeAddNameCategory', data : ev.target.value}),
		save : data => dispatch({type : 'storeAddCategory', data : data}),
		showAlert: (mess, type) => dispatch({
			type: 'alertShow', data: {
				message: mess,
				status: type
			}
		}),
	})
)(CategoriesTools);
