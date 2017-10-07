import React from 'react';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';

const StorageCategoriesList = (state) => {
	const categoriesList = state.store.list;
	// TODO: clear
	console.log('categoriesList', categoriesList);

	const menu = Object.keys(categoriesList).map(
		inx => !~state.store.noChoice.indexOf(Number(inx)) ||  state.showAll
			? <MenuItem value={Number(inx)} key={(state.keyPrev || 'catEdit') + inx } primaryText={categoriesList[inx]} />
			: false
	);

	// TODO: clear
	console.log('menu', menu);

	return state.label
		? <SelectField errorText={state.error} floatingLabelText={state.label} value={state.val} onChange={state.onEdit} >{menu}</SelectField>
		: <DropDownMenu style={state.style} value={state.val} onChange={state.onEdit} >{menu}</DropDownMenu>;
};

export default connect(
	state => ({
		store: state.storageCategories
	})
)(StorageCategoriesList);

