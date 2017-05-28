import React from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import { TableRowColumn, TableRow } from 'material-ui/Table';

const StorageRowShow = (state) => {
	const row = state.row;
	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<IconButton tooltip="Delete"
							touch={true}
							onTouchTap={ev => state.onDelete(row.id, ev)}
				>
					<ActionDelete color="#B71C1C"/>
				</IconButton>
				<IconButton tooltip="Edit"
							touch={true}
							onTouchTap={ev => state.onEdit(row.id, ev)}
				>
					<ActionEdit color='#009688'/>
				</IconButton>
			</TableRowColumn>
			<TableRowColumn>{state.categories.list[row.category]}</TableRowColumn>
			<TableRowColumn>{row.title}</TableRowColumn>
			<TableRowColumn>{row.login}</TableRowColumn>
			<TableRowColumn>{row.pass}</TableRowColumn>
			<TableRowColumn>{row.answer}</TableRowColumn>
			<TableRowColumn
				children={<textarea  rows='6' readOnly={true} defaultValue={row.desc} />} onChange={state.onEditDesc}
			/>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage,
		categories : state.storageCategories
	}),
	dispatch => ({
		onEdit : id => dispatch({type : 'storeOnEdit', data : id}),
		onDelete : id => dispatch({
			type : 'storeConfirm',
			data : {
				actionCancel   : 'storeCancelDelete',
				actionConfirm  : 'storeOnDelete',
				question       : 'Are you sure?',
				dataConfirm    : id

			}
		}),
	})
)(StorageRowShow);
