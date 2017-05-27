import React, {Component} from 'react';
import {connect} from 'react-redux';
import NavMenu from '../NavMenu/NavMenu';

class Settings extends Component {

	render() {
		return (
			<div>
				<NavMenu />
				<h1>Settings</h1>
			</div>

		);
	}
}

export default connect(
	state => ({
		store: state.list
	})
)(Settings);
