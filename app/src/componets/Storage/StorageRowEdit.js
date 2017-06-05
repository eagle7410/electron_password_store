import React from 'react';
import {connect} from 'react-redux';
import ActionButtonSave from '../tools/ActionButtonSave'
import ActionButtonCancel from '../tools/ActionButtonCancel'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import StorageCategoriesList from './StorageCategoriesList'
import TextField from 'material-ui/TextField';
import {Storage, Alert} from '../../const/Events'
import {edit} from '../../api/Storage'
import AlertStatus from '../../const/AlertStatus'

const StorageRowEdit = (state) => {
	const store = state.store;
	const row = store.editRowData;
	const id = row.id;
	const save = () => {
		edit({
			_id      : store.editRow,
			title    : row.title,
			login    : row.login,
			pass     : row.pass,
			answer   : row.answer,
			desc     : row.desc,
			category : row.category
		}).then(state.onSaveEdit, err => state.showAlert(err, AlertStatus.BAD));
	};

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible', fontSize : '18px'}}>
				<div style={{display : 'inline-block'}}>
					<div>
						<ActionButtonCancel onTouch={state.onCancel}/>
						<ActionButtonSave onTouch={save}/>
					</div>
				</div>
				<div style={{display : 'inline-block'}}>
					<span style={{color : '#ccc'}}>Category :</span> <StorageCategoriesList onEdit={state.onEditCategory} keyPrev={'catEdit' + id} val={row.category} /> <br/>
					<span style={{color : '#ccc'}}>Title    :</span> <TextField id={`edtT_${id}`} value={row.title} onChange={ev => state.onEditText('title', ev.target.value)}/> <br/>
					<span style={{color : '#ccc'}}>Login    :</span> <TextField id={`edtL_${id}`} value={row.login} onChange={ev => state.onEditText('login', ev.target.value)}/> <br/>
					<span style={{color : '#ccc'}}>Pass     :</span> <TextField id={`edtP_${id}`} value={row.pass} onChange={ev => state.onEditText('pass', ev.target.value)}/> <br/>
					<span style={{color : '#ccc'}}>Answer   :</span> <TextField id={`edtA_${id}`} value={row.answer} onChange={ev => state.onEditText('answer', ev.target.value)}/>
				</div>
			 </TableRowColumn>
			<TableRowColumn children={<textarea  style={{width : '100%', fontSize : '18px'}} rows='10' defaultValue={row.desc} />} onChange={state.onEditDesc}/>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage
	}),
	dispatch => ({
		onCancel   : () => dispatch({type : Storage.editClear}),
		onSaveEdit : () => dispatch({type : Storage.saved}),
		onEditCategory: (event, index, value) => dispatch({type : Storage.edit, data: {
			type : 'category',
			val  : value
		}}),
		onEditDesc : ev => dispatch({type : Storage.edit, data : {
			type : 'desc',
			val  : ev.target.value
		}}),
		onEditText: (type,val) => dispatch({type : Storage.edit, data: {
			type : type,
			val  : val
		}}),
		showAlert: (mess, type) => dispatch({
			type: Alert.show, data: {
				message: mess,
				status: type
			}
		})
	})
)(StorageRowEdit);
