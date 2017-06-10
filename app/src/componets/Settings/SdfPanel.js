import React from 'react';
import {connect} from 'react-redux';
import LoadAnime from '../tools/LoadAnimation'
import TextField from 'material-ui/TextField';

const SdfPanel = (state) => {
	let store = state.store;
	let cont = '';

	if (!store.isTryLoad) {
		cont = '';
	} else if (store.isLoad) {
		cont = <LoadAnimation/>;
	} else if (store.isLoadOk) {
		cont = <div>{'Success'}</div>;
	} else if (!store.isLoadOk){
		cont = <div><div>{'Fail'}</div><div>{`Message : ${store.errorMeess}`}</div></div>;
	}

	return (
		<div style={ {textAlign : 'center'} }>
			<TextField
				disabled={true}
				floatingLabelText={`Load file ${store.filePath}`}
			/><br />
			{cont}
		</div>
	)
};

export default connect(
	state => ({ store: state.sdf })
)(SdfPanel);
