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
	let filters = state.filters;
	let filterCategory = filters.categorySelect;
	let filterCheckText = (data) => data.toLowerCase().indexOf(filters.searchText);
	let rows = store.data.filter((row, inx) => !(
		(filterCategory !== filters.categoryAll && row.category !== filterCategory) ||
		(
			!~filterCheckText(row.login) &&
			!~filterCheckText(row.pass) &&
			!~filterCheckText(row.title) &&
			!~filterCheckText(row.desc)
		)
	));

	let headColumns = [];

	const headColumnsLabel =[
		'Actions',
		'Category',
		'Title',
		'Login',
		'Pass',
		'Answer',
		'Description'
	];

	for (let i = 0; i<headColumnsLabel.length; ++i)
		headColumns.push(<TableHeaderColumn key={'St_' + i}>{headColumnsLabel[i]}</TableHeaderColumn>);

	return (
		<Table fixedHeader={true} selectable={false}>
			<TableHeader displaySelectAll={false}>
				<TableRow>{headColumns}</TableRow>
			</TableHeader>
			<TableBody
				displayRowCheckbox={false}
				showRowHover={true}
			>
				{
					rows.map((row, inx) =>
						row.id === store.editRow
							? <RowEdit key={`store_${row.id}`} />
							: <RowShow key={`store_${row.id}`} row={row} />
					)
				}
			</TableBody>
		</Table>
	);
};

export default connect(
	state => ({
		store: state.storage,
		filters : state.storageFilters
	})
)(StorageTable);

