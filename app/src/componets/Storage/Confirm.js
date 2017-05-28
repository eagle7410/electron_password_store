import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Confirm = (state) => {
	let confirm = state.store;
	const actions = [
		<FlatButton
			label="Cancel"
			primary={true}
			onTouchTap={ev => state.onCancel(confirm.actionCancel, confirm.dataCancel) }
		/>,
		<FlatButton
			label="Ok"
			secondary={true}
			onTouchTap={ev => state.onOk(confirm.actionConfirm, confirm.dataConfirm) }
		/>,
	];

	return (
			<Dialog
				actions={actions}
				modal={false}
				open={confirm.open}
			>
				{confirm.question}
			</Dialog>
	);
};

export default connect(
	state => ({
		store : state.storageConfirm
	}),
	dispatch => ({
		onCancel : (type, data) => dispatch({type : type, data: data}),
		onOk     : (type, data) => dispatch({type : type, data: data }),
	})
)(Confirm);
