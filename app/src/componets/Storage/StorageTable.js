import React from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

const style = {
	tooltip : {
		left : '10px'
	}
};

const StorageTable = (state) => {

	return (
		<Table fixedHeader={true} selectable={false}>
			<TableHeader  displaySelectAll={false}>
				<TableRow>
					<TableHeaderColumn>Actions</TableHeaderColumn>
					<TableHeaderColumn>Category</TableHeaderColumn>
					<TableHeaderColumn>Login</TableHeaderColumn>
					<TableHeaderColumn>Pass</TableHeaderColumn>
					<TableHeaderColumn>Answer</TableHeaderColumn>
					<TableHeaderColumn>Description</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody
				displayRowCheckbox={false}
				showRowHover={true}
			>
				{
					state.store.data.map((record, inx)=> (
						<TableRow key={`store_${inx}`} data-inx={record.inx} >
							<TableRowColumn style={{ overflow: 'visible' }}>
								<IconButton tooltip="Delete"
											touch={true}
											tooltipStyles={style.tooltip}>
									<ActionDelete />
								</IconButton>
								<IconButton tooltip="Edit"
											touch={true}
											tooltipStyles={style.tooltip}>
									<ActionEdit />
								</IconButton>
							</TableRowColumn>
							<TableRowColumn>{record.category}</TableRowColumn>
							<TableRowColumn>{record.login}</TableRowColumn>
							<TableRowColumn>{record.pass}</TableRowColumn>
							<TableRowColumn>{record.answer}</TableRowColumn>
							<TableRowColumn dangerouslySetInnerHTML={{	__html: record.desc.replace("\n", '<br/>')	}}></TableRowColumn>
						</TableRow>
					))
				}
			</TableBody>
		</Table>
	);
};

export default connect(
	state => ({
		store: state.storage
	})
)(StorageTable);

