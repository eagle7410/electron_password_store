import React from 'react';
import {connect} from 'react-redux';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import {StepsConnect as Events, Alert} from '../../../const/Events'
import {DropBox} from '../../../const/Messages'
import AlertStatus from '../../../const/AlertStatus'
import {getLink, getAccess} from '../../../api/DropBox'

const styleBlock       = {width: '100%', maxWidth: 700, margin: 'auto'};
const styleContent     = {margin: '0 16px', overflow: 'hidden'};
const styleButtonBlock = {marginTop: 24, marginBottom: 12};

/**
 * A contrived example using a transition between steps
 */
const StepsConnect = (state) => {
	const store     = state.store;
	const form      = state.form;
	const finished  = store.finished;
	const stepIndex = store.stepIndex;
	const loading   = store.loading;

	const handleNext = () => {
		state.nextRun();

		switch (stepIndex + 1) {
			case 1 :
				if (form.apiKey && form.apiSecret) {
					getLink({
						apiKey    : form.apiKey,
						apiSecret : form.apiSecret
					}).then(
						link => state.setLink(link),
						err => {
							state.nextStop();
							state.showAlert(DropBox.apiDataBad, AlertStatus.BAD)
						}
					)
				} else {
					state.nextStop();
					state.showAlert(DropBox.apiEmpty, AlertStatus.BAD);
				}

				break;

			case 2 :
				getAccess()
					.then(
						() => state.setAccess(),
						err => {
							state.nextStop();
							state.showAlert(DropBox.apiNoAccess, AlertStatus.BAD)
						}
					)


		}
	};

	const getStepContent = (stepIndex) => {

		switch (stepIndex) {
			case 0:
				return (<p>Enter api data.</p>);

			case 1:
				return (<p>Go to {form.confirmLink} and confirm connect. </p>);

			default:
				return 'You\'re a long way from home sonny jim!';
		}
	}

	const renderContent = () => {

			if (finished) {

				return (
						<div style={styleContent}>
				<p>
				  <a href='#' onClick={(event) => {
									event.preventDefault();
									state.first();
								}}
								>
					Click here
				  </a> to reset the example.
				</p>
		  </div>
				);

			}

	  return (
		<div style={styleContent}>
		  <div>{getStepContent(stepIndex)}</div>
		  <div style={styleButtonBlock}>
			<RaisedButton
			  label={stepIndex === 1 ? 'Finish' : 'Next'}
			  primary={true}
			  onTouchTap={handleNext}
			/>
		  </div>
		</div>
	  );
		}

	return (
		 <div style={styleBlock}>
			<Stepper activeStep={stepIndex}>
			  <Step>
				<StepLabel>Enter config</StepLabel>
			  </Step>
			  <Step>
				<StepLabel>Confirm link</StepLabel>
			  </Step>
			</Stepper>
			<ExpandTransition loading={loading} open={true}>
			  {renderContent()}
			</ExpandTransition>
		  </div>
		);
}

//dropBoxConnectSteps
export default connect(
	state => ({
		store: state.dropBoxConnectSteps,
		form : state.dropBoxSettingsForm
	}),
	dispatch => ({
		nextRun  : () => dispatch({type : Events.nextRun}),
		nextStop : () => dispatch({type : Events.nextStop}),
		next     : () => dispatch({type : Events.next}),
		first    : () => dispatch({type : Events.stepFirst}),
		setLink  : link => dispatch({type : Events.linkConfirm, data: link}),
		setAccess : () => dispatch({type : Events.haveAccess}),
		showAlert: (mess, type) => dispatch({
			type: Alert.show, data: {
				message: mess,
				status: type
			}
		})
	})
)(StepsConnect);
