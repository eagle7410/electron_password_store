import React from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/navigation/cancel';
import ActionSave from 'material-ui/svg-icons/content/save';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const StorageRowEdit = (state) => {
	const store = state.store;
	const row = store.editRowData;
	const id = row.id;
	const catergory = (
		<DropDownMenu
			value={row.category}
			onChange={state.onEditCategory}
		>
			{ Object.keys(store.categoryList).map(
				inx => Number(inx) === 1 ? false : <MenuItem value={Number(inx)} key={'catEdit'+id + inx } primaryText={store.categoryList[inx]} />
			)}
		</DropDownMenu>
	);
	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<IconButton tooltip="Edit"
							touch={true}
							onTouchTap={state.onEdited}
				>
					<ActionEdit color="#FFD600"/>
				</IconButton>
				<IconButton tooltip="Edit"
							touch={true}
							onTouchTap={state.onSaveEdit}
				>
					<ActionSave color="#43A047"/>
				</IconButton>
			</TableRowColumn>
			<TableRowColumn children={catergory} />
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
		store: state.storage
	}),
	dispatch => ({
		onEdited : () => dispatch({type : 'storeOnEdited'}),
		onSaveEdit : () => dispatch({type : 'storeOnSaveEdit'}),
		onEditCategory: (event, index, value) => dispatch({type : 'storeEditRowCategory', data: value}),
		onEditDesc : ev => dispatch({type : 'storeOnEditDesc', data : ev.target.value}),
		onEditText: (type,val) => dispatch({type : 'storeEditRowText', data: {
			type : type,
			val  : val
		}})
	})
)(StorageRowEdit);
