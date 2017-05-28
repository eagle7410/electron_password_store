import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionSave from 'material-ui/svg-icons/content/save';

const ActionButtonSave = (state) => {
	return (
		<IconButton tooltip="Edit"
		            touch={true}
		            onTouchTap={state.onTouch}
		>
			<ActionSave color="#43A047"/>
		</IconButton>
	);
};

export default ActionButtonSave;
