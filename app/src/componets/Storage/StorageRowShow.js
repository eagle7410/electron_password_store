import React from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import { TableRowColumn, TableRow } from 'material-ui/Table';

const StorageRowShow = (state) => {
	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<IconButton tooltip="Delete"
							touch={true}
							onTouchTap={ev => state.deleteRow(state.row.id, ev)}
				>
					<ActionDelete color="#B71C1C"/>
				</IconButton>
				<IconButton tooltip="Edit"
							touch={true}
							onTouchTap={ev => state.editRow(state.row.id, ev)}
				>
					<ActionEdit color='#009688'/>
				</IconButton>
			</TableRowColumn>
			<TableRowColumn>{state.store.categoryList[state.row.category]}</TableRowColumn>
			<TableRowColumn>{state.row.title}</TableRowColumn>
			<TableRowColumn>{state.row.login}</TableRowColumn>
			<TableRowColumn>{state.row.pass}</TableRowColumn>
			<TableRowColumn>{state.row.answer}</TableRowColumn>
			<TableRowColumn
				children={<textarea  rows='6' readOnly={true} defaultValue={state.row.desc} />} onChange={state.onEditDesc}
			/>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storage
	})
)(StorageRowShow);
