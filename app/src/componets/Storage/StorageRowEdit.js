import React from 'react';
import {connect} from 'react-redux';
import ActionButtonSave from '../tools/ActionButtonSave'
import ActionButtonCancel from '../tools/ActionButtonCancel'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import StorageCategoriesList from './StorageCategoriesList'
import TextField from 'material-ui/TextField';
import {Storage} from '../../const/Events'

const StorageRowEdit = (state) => {
	const store = state.store;
	const row = store.editRowData;
	const id = row.id;

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonCancel onTouch={state.onCancel}/>
				<ActionButtonSave onTouch={state.onSaveEdit}/>
			</TableRowColumn>
			<TableRowColumn children={<StorageCategoriesList onEdit={state.onEditCategory} keyPrev={'catEdit' + id} val={row.category} />}/>
			<TableRowColumn children={<TextField id={`edtT_${id}`} value={row.title} onChange={ev => state.onEditText('title', ev.target.value)}/>} />
			<TableRowColumn children={<TextField id={`edtL_${id}`} value={row.login}/>} onChange={ev => state.onEditText('login', ev.target.value)}/>} />
			<TableRowColumn children={<TextField id={`edtP_${id}`} value={row.pass}/>} onChange={ev => state.onEditText('pass', ev.target.value)}/>} />
			<TableRowColumn children={<TextField id={`edtA_${id}`} value={row.answer}/>} onChange={ev => state.onEditText('answer', ev.target.value)}/>}/>
			<TableRowColumn children={<textarea  rows='10' defaultValue={row.desc} />} onChange={state.onEditDesc}/>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage,
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
		}})
	})
)(StorageRowEdit);
