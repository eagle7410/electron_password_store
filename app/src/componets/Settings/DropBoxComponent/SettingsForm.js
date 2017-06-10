import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import StepsConnect from './StepsConnect'
import {DropBoxForm, Alert, StepsConnect as EventStep} from '../../../const/Events'
import {getConnect} from '../../../api/DropBox'
import AlertStatus from '../../../const/AlertStatus'
import {DropBox} from '../../../const/Messages'

const styleInline1 = { display : 'inline-block'};
const styleCenter  = {margin: 'auto', width : '100%', maxWidth: '700px'};

const SettingsForm = (state) => {
	let store = state.store;
	let action;
	const InitConnect = () => {
		getConnect()
			.then(
				() => state.connectInit(),
				err => state.showAlert(DropBox.badConnect, AlertStatus.BAD),
			)
	};

	const Reconnect = () => {
		state.reconnect();
		state.firstStep();
	};

	if (store.accessToken) {
		action = (<div style={styleCenter}>
			<RaisedButton
				label={'Init'}
				primary={true}
				disabled={store.init}
				onTouchTap={InitConnect}
			/>
			<RaisedButton
				label={'Reconnect'}
				secondary={true}
				onTouchTap={Reconnect}
			/>
			</div>)
	} else {
		action = <StepsConnect />;
	}

	return (
		<div style={{padding : '5px'}}>
			<div style={styleCenter}>
				<h3>Connect to DropBox</h3>
				<div style={styleInline1}>
					<TextField id={'apiKey'}
						disabled={store.accessToken}
						onChange={ev => state.handelEnterApiData('apiKey', ev.target.value)}
						value={store.apiKey}
						floatingLabelText={'api key'}
						hintText={'Enter api key'}
					/>
					<TextField id={'apiSecret'}
						style={{display: 'block'}}
						disabled={store.accessToken}
						onChange={ev => state.handelEnterApiData('apiSecret', ev.target.value)}
						value={store.apiSecret}
						floatingLabelText={'api secret'}
						hintText={'Enter api secret'}
					/>
				</div>
			</div>
			{action}
		</div>

	);
};

export default connect(
	state => ({
		store   : state.dropBoxSettingsForm,
		connect : state.dropBoxConnectSteps
	}),
	dispatch => ({
		firstStep   : () => dispatch({type : EventStep.stepFirst}),
		reconnect   : () => dispatch({type : DropBoxForm.reconnect}),
		connectInit : () => dispatch({type : DropBoxForm.connectInit}),
		showAlert   : (mess, type) => dispatch({
			type: Alert.show,
			data: {
				message: mess,
				status: type
			}
		}),
		handelEnterApiData : (type, val) => dispatch({
			type : DropBoxForm.apiEnter,
			data : {
				type : type,
				val  : val
			}
		}),
	})
)(SettingsForm);
