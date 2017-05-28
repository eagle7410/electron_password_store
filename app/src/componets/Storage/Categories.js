import React from 'react';
import {connect} from 'react-redux';
import CategoriesTools from './CategoriesTools'
import CategoriesTable from './CategoriesTable'
const Categories = (state) => {

	return (
		<div>
			<CategoriesTools/>
			<CategoriesTable/>
		</div>
	);
};

export default connect(
	state => ({
		store: state.store
	})
)(Categories);
