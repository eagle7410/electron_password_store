import React from 'react';
import {connect} from 'react-redux';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import {
	StepsDownload as Events,
	Alert,
	StorageCategory,
	Users,
	Storage
} from '../../../const/Events'
import {DropBox} from '../../../const/Messages'
import AlertStatus from '../../../const/AlertStatus'
import LoadAnime from '../../tools/LoadAnime'
import {getArchive,
	putDropBoxArchive,
	extractArchive,
	mergeArchive,
	clearArchive
} from '../../../api/DropBox'
import {fullData} from '../../../api/Loader'

const styleBlock       = {width: '100%', maxWidth: 700, margin: 'auto'};
const styleContent     = {margin: '0 16px', overflow: 'hidden'};
const styleButtonBlock = {marginTop: 24, marginBottom: 12};

/**
 * A contrived example using a transition between steps
 */
const StepsDownload = (state) => {
	const store    = state.store;
	const connect  = state.connect ;
	const finished  = store.finished;
	const stepIndex = store.stepIndex;
	const loading   = store.loading;

	const renderContent = () => {
		if (finished) {

			let message;store.stop ? '' : 'Success';
			let color;

			if (store.stop) {
				message = 'Fail';
				color = '#E64A19';
			} else {
				message = 'Success';
				color = '#00E676';
			}

			return (
				<div style={styleContent}>
					<h1 style={{color : color}}>{message}</h1>
				</div>
			);
		}

		return (
			<div style={styleContent}>
				<div>{loading ? <LoadAnime key={'anima'} /> : <div/>}</div>
			</div>
		);
	}

	const handelRun = () => {
		state.run();

		getArchive()
			.then(date => {
				state.next();
				return extractArchive(date);
			})
			.then(date => {
				state.next();
				return mergeArchive(date);
			})
			.then(date => {
				state.next();
				return clearArchive(date);
			})
			.then(fullData)
			.then(res => new Promise(ok => {
				['Categories', 'Users', 'Storage'].forEach(
					p => state['init' + p](res[p.toLowerCase()])
				);
				state.next();
				ok();
			}))
			.then(() => {
				state.next();
			})
			.catch(err => {
				state.stop();
				console.log('Error download archive', err);
				state.showAlert(DropBox.badTryUpload, AlertStatus.BAD);
			});
	}

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
					onTouchTap={state.reset}
				/>
				{renderContent()}
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
}

export default connect(
	state => ({
		store: state.dropBoxStepsDownload,
		connect : state.dropBoxSettingsForm
	}),
	dispatch => ({
		run       : () => dispatch({type : Events.run}),
		stop      : () => dispatch({type : Events.stop}),
		next      : () => dispatch({type : Events.next}),
		reset     : () => dispatch({type : Events.reset}),
		initUsers      : data  => dispatch({type: Users.init , data: data}),
		initStorage    : data  => dispatch({type: Storage.init , data: data}),
		initCategories : data  => dispatch({type: StorageCategory.init , data: data}),
		showAlert : (mess, type) => dispatch({
			type: Alert.show, data: {
				message: mess,
				status: type
			}
		})
	})
)(StepsDownload);
