import React, {Component} from 'react';
import {connect} from 'react-redux';

class Add extends Component {

	render() {
		return (
			<h1>THIS PASS Add</h1>
		);
	}
}

export default connect(
	state => ({
		store: state.record
	})
)(Add);
