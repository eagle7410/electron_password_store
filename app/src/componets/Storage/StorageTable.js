import React from 'react';
import {connect} from 'react-redux';
import RowShow from './StorageRowShow';
import RowEdit from './StorageRowEdit';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow
} from 'material-ui/Table';

const StorageTable = (state) => {
	let store = state.store;

	let rows = store.data.filter((record, inx) => !(
		(store.categorySelect > 1 && record.category !== store.categorySelect) ||
		(
			record.login.toLowerCase().indexOf(store.searchText) === -1 &&
			record.pass.toLowerCase().indexOf(store.searchText) === -1 &&
			record.title.toLowerCase().indexOf(store.searchText) === -1 &&
			record.desc.toLowerCase().indexOf(store.searchText) === -1
		)
	));

	return (
		<Table fixedHeader={true} selectable={false}>
			<TableHeader displaySelectAll={false}>
				<TableRow>
					<TableHeaderColumn>Actions</TableHeaderColumn>
					<TableHeaderColumn>Category</TableHeaderColumn>
					<TableHeaderColumn>Title</TableHeaderColumn>
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
					rows.map((row, inx) =>
						row.id === store.editRow
							? <RowEdit key={`store_${row.id}`} />
							: <RowShow key={`store_${row.id}`} row={row} editRow={state.handelEdit} deleteRow={state.handelDelete}/>
					)
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

