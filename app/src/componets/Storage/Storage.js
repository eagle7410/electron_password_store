import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavMenu from '../NavMenu/NavMenu';
import Table from './StorageTable';

class Storage extends Component {

	render() {
		return (
			<div>
				<NavMenu />
				<h1>Storage</h1>
				<Table/>
			</div>

		);
	}
}

export default connect(
	state => ({
		store: state.storage
	})
)(Storage);
