import React from 'react';
import {connect} from 'react-redux';
import NavMenu from '../NavMenu/NavMenu';
import RaisedButton from 'material-ui/RaisedButton';

const Users = () => {
	return (
		<div>
			<NavMenu />
			<h1>Users</h1>
			<RaisedButton>Login</RaisedButton>
		</div>
	);
};
export default connect(
	state => ({
		store: state.users
	})
)(Users);
