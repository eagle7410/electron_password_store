import React from 'react';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionDown from 'material-ui/svg-icons/file/cloud-download';
import ActionUp from 'material-ui/svg-icons/file/cloud-upload';
import {path, load} from '../../api/Sdf'
import {list} from '../../api/Storage'
import {dropBoxTools, Storage} from '../../const/Events'
import {Tabs, Tab} from 'material-ui/Tabs';
import SettingsForm from './DropBoxComponent/SettingsForm'

const DropBox = () => {

	return (
		<Tabs >
			<Tab label='Connect' icon={<ActionBuild />} >
					<SettingsForm />
			</Tab>
			<Tab label='Upload to DropBox' icon={<ActionUp />} >
				<h1> Upload to DropBox </h1>
			</Tab>
			<Tab label='Download from DropBox' icon={<ActionDown />} >
				<h1> Download from DropBox </h1>
			</Tab>
		</Tabs>
	)
};

export default DropBox;
