import React from 'react';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';

const StorageCategoriesList = (state) => {
	const keyPrev = state.keyPrev || 'catEdit';
	const categoriesList = state.store.list;
	const menu = Object.keys(categoriesList).map(
		inx => !~state.store.noChoice.indexOf(Number(inx)) ||  state.showAll
			? <MenuItem value={Number(inx)} key={keyPrev + inx } primaryText={categoriesList[inx]} />
			: false
	);

	let component;

	if (state.label) {
		component = <SelectField errorText={state.error} floatingLabelText={state.label} value={state.val} onChange={state.onEdit} >{menu}</SelectField>
	} else {
		component = <DropDownMenu value={state.val} onChange={state.onEdit} >{menu}</DropDownMenu>
	}

	return component;
};

export default connect(
	state => ({
		store: state.storageCategories
	})
)(StorageCategoriesList);

