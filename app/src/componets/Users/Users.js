import React from 'react';
import {connect} from 'react-redux';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import IconUsers from 'material-ui/svg-icons/action/supervisor-account'
import UsersTools from './UsersTools'
import UsersTable from './UsersTable';
const styleTab = {
	background: '#FF9800'
};

const Users = () => {
	return (
		<div>
			<NavMenu />
			<h1>Users</h1>
			<Tabs >
				<Tab label="Users" icon={<IconUsers />}  style={styleTab}>
					<Paper zDepth={2}>
						<UsersTools/>
						<UsersTable/>
					</Paper>
				</Tab>
			</Tabs>
		</div>
	);
};
export default connect(
	state => ({
		store: state.users
	})
)(Users);
