import React, {Component} from 'react';
import {connect} from 'react-redux';

class List extends Component {

	render() {
		return (
			<h1>LIST</h1>
		);
	}
}

export default connect(
	state => ({
		store: state.home
	})
)(List);
