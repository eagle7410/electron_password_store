import React from 'react';
import {connect} from 'react-redux';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../tools/ActionButtonDelete'
import ActionButtonEdit from '../tools/ActionButtonEdit'
const CategoriesRowShow = (state) => {
	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonDelete id={state.id} onTouch={state.onDelete}/>
				<ActionButtonEdit id={state.id} onTouch={state.onEdit}/>
				{state.name}
			</TableRowColumn>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage,
		categories : state.storageCategories
	}),
	dispatch => ({
		onEdit : id => dispatch({type : 'storeOnEditCategory', data : id}),
		onDelete : id => dispatch({
			type : 'storeConfirm',
			data : {
				actionCancel   : 'storeCancelDeleteCategory',
				actionConfirm  : 'storeOnDeleteCategory',
				question       : 'Are you sure?',
				dataConfirm    : id

			}
		}),
	})
)(CategoriesRowShow);
