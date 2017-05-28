import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete-forever';

const ActionButtonDelete = (state) => {
	return (
		<IconButton tooltip="Delete"
		            touch={true}
		            onTouchTap={ev => state.onTouch(state.id, ev)}
		>
			<ActionDelete color="#B71C1C"/>
		</IconButton>
	);
};

export default ActionButtonDelete;
