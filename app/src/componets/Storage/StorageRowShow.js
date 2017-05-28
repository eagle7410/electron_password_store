import React from 'react';
import {connect} from 'react-redux';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../tools/ActionButtonDelete'
import ActionButtonEdit from '../tools/ActionButtonEdit'

const StorageRowShow = (state) => {
	const row = state.row;
	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonDelete id={row.id} onTouch={state.onDelete}/>
				<ActionButtonEdit id={row.id} onTouch={state.onEdit}/>
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
