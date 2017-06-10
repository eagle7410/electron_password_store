import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import IconSDF from 'material-ui/svg-icons/editor/insert-drive-file'
import IconDropBox from 'material-ui/svg-icons/action/cached'
import SdfTools from './SdfTools'
import SdfPanel from './SdfPanel'
import DropBox from './DropBox'

const styleTab = {
	background:
};

const Settings = () => (
	<div>
		<NavMenu />
		<h1>Settings</h1>
		<Tabs initialSelectedIndex={0}>
			<Tab label='DropBox' icon={<IconDropBox />}  style={styleTab}>
				<Paper zDepth={2}>
					<DropBox/>
				</Paper>
			</Tab>
			<Tab label='Load SDF' icon={<IconSDF />}  style={styleTab}>
				<Paper zDepth={2}>
					<SdfTools/>
					<SdfPanel/>
				</Paper>
			</Tab>
		</Tabs>
	</div>
);

export default Settings;
