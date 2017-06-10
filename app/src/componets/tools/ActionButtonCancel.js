import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionCancel from 'material-ui/svg-icons/navigation/cancel';

const ActionButtonCancel = (state) => (
	<IconButton tooltip="Cancel" touch={true} onTouchTap={state.onTouch}>
		<ActionCancel color="#FFD600"/>
	</IconButton>
);

export default ActionButtonCancel;
