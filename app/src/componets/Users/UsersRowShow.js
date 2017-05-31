import React from 'react';
import {connect} from 'react-redux';
import {del} from '../../api/Category'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../tools/ActionButtonDelete'
import ActionButtonEdit from '../tools/ActionButtonEdit'
import AlertStatus from '../../const/AlertStatus'

const CategoriesRowShow = (state) => {

	const onDelete = id => {

		state.confirm(id, ()=> new Promise((ok, bad) => {
			del(id).then(r => ok(true), e => {
				console.log('Error delete category', e);
				state.showAlert('Error delete category', AlertStatus.BAD);
				bad();
			});
		}));

	};

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonDelete id={state.id} onTouch={onDelete}/>
				<ActionButtonEdit id={state.id} onTouch={state.onEdit}/>
				{state.row.login}
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
		confirm : (id, backPromise) => dispatch({
			type : 'storeConfirm',
			data : {
				actionCancel       : 'storeCancelDeleteCategory',
				actionConfirm      : 'storeOnDeleteCategory',
				question           : 'Are you sure?',
				dataConfirm        : id,
				callPromiseConfirm : backPromise
			}
		}),
		showAlert: (mess, type) => dispatch({
			type: 'alertShow', data: {
				message: mess,
				status: type
			}
		}),
	})
)(CategoriesRowShow);
