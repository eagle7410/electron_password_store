const prefix = 'store';

const Storage = {
	init       : prefix + 'Init',
	move       : prefix + 'OnDelete',
	cancelMove : prefix + 'OnCancelDelete',
	modeEdit   : prefix + 'OnModeEdit',
	editClear  : prefix + 'OnEditClear',
	edit       : prefix + 'OnEdit',
	saved      : prefix + 'OnSaveEdit',
	change     : prefix + 'OnEdit',
};

export default Storage;
