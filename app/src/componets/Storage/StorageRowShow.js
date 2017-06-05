import React from 'react';
import {connect} from 'react-redux';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../tools/ActionButtonDelete'
import ActionButtonEdit from '../tools/ActionButtonEdit'
import {Storage, Confirm as ConfirmAction} from '../../const/Events'
import {Confirm} from '../../const/Messages'
import AlertStatus from '../../const/AlertStatus'
import {del} from '../../api/Storage'

const styleDataLabel = {
	color : '#ccc'
}
const styleRow = {
	overflow: 'visible',
	fontSize : '18px'
}
const styleBlockInCell = {
	display : 'inline-block'
}

const StorageRowShow = (state) => {
	const row = state.row;
	const onDelete = id => {

		state.confirm(id, ()=> new Promise((ok, bad) => {
			del(id).then(r => ok(true), e => {
				console.log(Storage.move, e);
				state.showAlert(Storage.move, AlertStatus.BAD);
				bad();
			});
		}));

	};

	return (
		<TableRow >
			<TableRowColumn style={styleRow}>
				<div style={styleBlockInCell}>
					<div>
						<ActionButtonDelete id={row.id} onTouch={onDelete}/>
						<ActionButtonEdit id={row.id} onTouch={state.onEdit}/>
					</div>
				</div>
				<div style={styleBlockInCell}>
					<span style={styleDataLabel}>Category :</span> {state.categories.list[row.category]} <br/>
					<span style={styleDataLabel}>Title    :</span> {row.title} <br/>
					<span style={styleDataLabel}>Login    :</span> {row.login} <br/>
					<span style={styleDataLabel}>Pass     :</span> {row.pass} <br/>
					<span style={styleDataLabel}>Answer   :</span> {row.answer}
				</div>
			 </TableRowColumn>
			<TableRowColumn
				children={<textarea  rows='6' style={{width : '100%', fontSize : '18px'}}readOnly={true} defaultValue={row.desc}/>} onChange={state.onEditDesc}
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
		onEdit : id => dispatch({type : Storage.modeEdit, data : id}),
		confirm : (id, backPromise) => dispatch({
			type : ConfirmAction.show,
			data : {
				actionCancel       : Storage.moveCancel,
				actionConfirm      : Storage.move,
				question           : Confirm.question,
				dataConfirm        : id,
				callPromiseConfirm : backPromise
			}
		})
	})
)(StorageRowShow);
