import React from 'react';
import {connect} from 'react-redux';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {StepsDownload as Events,Alert, StorageCategory, Users, Storage} from '../../../const/Events'
import {DropBox} from '../../../const/Messages'
import AlertStatus from '../../../const/AlertStatus'
import {styleBlock, styleButtonBlock} from '../../../const/Styles'
import {getArchive, extractArchive, mergeArchive, clearArchive} from '../../../api/Cloud'
import {fullData} from '../../../api/Loader'
import StepsSimpleContent from './StepsSimpleContent'


const StepsDownload = (state) => {
	const store    = state.steps;
	const typeData = state.type;
	const connect  = state.connect ;
	const finished  = store.finished;
	const stepIndex = store.stepIndex;
	const loading   = store.loading;
	const handelRun = async () => {
		let date;

		try {
			state.run(typeData);

			date = await getArchive(typeData);
			state.next(typeData);

			date = await extractArchive(date);
			state.next(typeData);

			date = await mergeArchive(date);
			state.next(typeData);

			await clearArchive(date);

			state.next(typeData);

			let updData = await fullData();

			['Categories', 'Users', 'Storage'].forEach(
				p => state[`init${p}`](updData[p.toLowerCase()])
			);

			state.next(typeData);

		} catch (err) {
			console.log('err ', err);
			state.stop(typeData);
			state.showAlert(DropBox.badTryUpload, AlertStatus.BAD);
		}
	};

	const actionDisable = !connect.init || loading;

	return (
		<div style={styleBlock}>
			<div style={styleButtonBlock}>
				<RaisedButton
					label={'Run'}
					disabled={actionDisable}
					primary={true}
					onTouchTap={handelRun}
				/>
				<RaisedButton
					label={'Restart'}
					disabled={!finished}
					secondary={true}
					onTouchTap={() => state.reset(typeData)}
				/>
				<StepsSimpleContent finished={finished} loading={loading} stop={store.stop}/>
			</div>
			<Stepper activeStep={stepIndex}>
				<Step><StepLabel>Download from DropBox</StepLabel></Step>
				<Step><StepLabel>Extract archive</StepLabel></Step>
				<Step><StepLabel>Merge data</StepLabel></Step>
				<Step><StepLabel>Clear</StepLabel></Step>
				<Step><StepLabel>Update App</StepLabel></Step>
			</Stepper>
		</div>
	);
};

export default connect(
	state => ({}),
	dispatch => ({
		run       : (typeData) => dispatch({type : Events.run,   data: typeData.type}),
		stop      : (typeData) => dispatch({type : Events.stop,  data: typeData.type}),
		next      : (typeData) => dispatch({type : Events.next,  data: typeData.type}),
		reset     : (typeData) => dispatch({type : Events.reset, data: typeData.type}),

		initUsers      : data  => dispatch({type: Users.init , data: data}),
		initStorage    : data  => dispatch({type: Storage.init , data: data}),
		initCategories : data  => dispatch({type: StorageCategory.init , data: data}),
		showAlert : (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(StepsDownload);
