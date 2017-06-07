import React from 'react';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionDown from 'material-ui/svg-icons/file/cloud-download';
import ActionUp from 'material-ui/svg-icons/file/cloud-upload';
import {path, load} from '../../api/Sdf'
import {list} from '../../api/Storage'
import {dropBoxTools, Storage} from '../../const/Events'
import {Tabs, Tab} from 'material-ui/Tabs';
import SettingsForm from './DropBoxComponent/SettingsForm'
import StepsDownload from './DropBoxComponent/StepsDownload'
import StepsUpload from './DropBoxComponent/StepsUpload'

const DropBox = () => {

	return (
		<Tabs >
			<Tab label='Upload to DropBox' icon={<ActionUp />} >
				<StepsUpload />
			</Tab>
			<Tab label='Connect' icon={<ActionBuild />} >
				<SettingsForm />
			</Tab>
			<Tab label='Download from DropBox' icon={<ActionDown />} >
				<StepsDownload/>
			</Tab>
		</Tabs>
	)
};

export default DropBox;
