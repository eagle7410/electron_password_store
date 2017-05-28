import React from 'react';
import {connect} from 'react-redux';

const Categories = (state) => {

	return (
		<h1>StoreCategory</h1>
	);
};

export default connect(
	state => ({
		store: state.store
	})
)(Categories);
