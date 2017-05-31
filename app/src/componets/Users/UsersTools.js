import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {add} from '../../api/User'
import AlertStatus from '../../const/AlertStatus'

const UsersTools = (state) => {
	let store = state.store;

	const handelSave = () => {
		const login = store.addName;
		const pass  = store.addPass;

		if (!login) {
			return state.showAlert('Enter user login', AlertStatus.BAD);
		}

		if (!pass) {
			return state.showAlert('Enter user pass', AlertStatus.BAD);
		}
		const data = {
			login : login,
			pass  : pass
		};

		add(data).then(id => {
			state.save({
				...data,
				_id : id,
			});
			state.showAlert('User is saved.', AlertStatus.OK);
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
					label="Add user"
					primary={true}
					icon={<ActionAdd />}
					onTouchTap={handelSave}
				/>
				<TextField
					hintText={'Enter user'}
					value={store.addName}
					onChange={state.onChangeAddName}
				/>
				<TextField hintText={'Enter password'}
				           value={store.addPass}
				           onChange={state.onChangeAddPass}
				/>
			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		store: state.users
	}),
	dispatch => ({
		onChangeAddName : ev => dispatch({type : 'storeOnChangeAddNameUser', data : ev.target.value}),
		onChangeAddPass : ev => dispatch({type : 'storeOnChangeAddPassUser', data : ev.target.value}),
		save : (data) => dispatch({type : 'storeAddUser', data : data}),
		showAlert: (mess, type) => dispatch({
			type: 'alertShow', data: {
				message: mess,
				status: type
			}
		}),
	})
)(UsersTools);
