import React from 'react';
import {connect} from 'react-redux';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import IconSDF from 'material-ui/svg-icons/editor/insert-drive-file'
import SdfTools from './SdfTools'
import SdfPanel from './SdfPanel'

const styleTab = {
	background: '#424242'
};

const Users = () => {
	return (
		<div>
			<NavMenu />
			<h1>Settings</h1>
			<Tabs >
				<Tab label="Load SDF" icon={<IconSDF />}  style={styleTab}>
					<Paper zDepth={2}>
						<SdfTools/>
						<SdfPanel/>
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
