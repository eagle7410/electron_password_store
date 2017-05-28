import React from 'react';
import {connect} from 'react-redux';

const Add = (state) => {

	return (
		<h1>THIS_REACT</h1>
	);
};

export default connect(
	state => ({
		store: state.recordAdd
	})
)(Add);
