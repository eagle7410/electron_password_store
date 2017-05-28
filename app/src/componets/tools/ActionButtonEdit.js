import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';

const ActionButtonEdit = (state) => {
	return (
		<IconButton tooltip="Edit"
		            touch={true}
		            onTouchTap={ev => state.onTouch(state.id, ev)}
		>
			<ActionEdit color='#009688'/>
		</IconButton>
	);
};

export default ActionButtonEdit;
