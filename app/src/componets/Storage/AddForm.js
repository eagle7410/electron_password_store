import React from 'react';
import {connect} from 'react-redux';
import StorageCategoriesList from './StorageCategoriesList'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionSave from 'material-ui/svg-icons/content/save';
import AlertStatus from '../../const/AlertStatus';
import {addRecord} from '../../api/Storage'

const AddForm = (state) => {
	let store = state.store;
	const textField =[
		'title',
		'login',
		'pass',
		'answer',
	];

	const onSave = () => {
		state.onSave();
		
		if (!store.category) {
			return state.onCategoryError('No select category');
		}

		let isEmpty = true;

		for (let i = 0; i<textField.length; ++i) {
			let name = textField[i];

			if (store[name]) {
				isEmpty = false;
				break;
			}
		}

		if (isEmpty && !store.desk) {
			return state.showAlert('This is record empty', AlertStatus.BAD);
		}

		addRecord({
			category : store.category,
			title    : store.title,
			login    : store.login,
			pass     : store.pass,
			desc     : store.desc,
			answer   : store.answer
		}).then(data => {
			state.save(data);
			state.clear();
			state.showAlert('Record is saved.', AlertStatus.OK);
		}, err => {
			state.showAlert('No save record. Inner error. Go to support', AlertStatus.BAD);
		});

	};

	return (
		<Paper >
			<StorageCategoriesList error={store.errorCategory} onEdit={state.onEditCategory} val={store.category} label='Choice category'/><br/>
			{
				textField.map(name =>
					<div key={'warpAdd'+name}>
						<TextField id={'add'+name}
								   value={store[name]}
								   hintText ={'Enter ' + name}
								   onChange={ev => state.onEditText(name, ev.target.value)}
						/>
					</div>
				)
			}
			<textarea onChange={state.onEditDesc} value={store.desc} placeholder='Enter descriptions' rows='10' cols='30' /><br/>
			<RaisedButton
				label="Save"
				primary={true}
				style ={{margin : '5px'}}
				icon={<ActionSave />}
				onTouchTap = {onSave}
			/>
		</Paper>
	);
};

export default connect(
	state => ({
		store: state.recordAdd
	}),
	dispatch => ({
		clear: () => dispatch({type : 'storeAddInit'}),
		save : data => dispatch({type : 'storeAddRow', data: data}),
		showAlert : (mess, type) => dispatch({type : 'alertShow', data: {
			message : mess,
			status  : type
		}}),
		onCategoryError : err => dispatch({type : 'storeAddRecordErrorCategory', data: err}),
		onSave : () => dispatch({type : 'storeAddRecordOnSave'}),
		onEditCategory : (event, index, value) => dispatch({type : 'storeAddRecordAddCategory', data: value}),
		onEditDesc : (event) => dispatch({type : 'storeAddRecordAddDesc', data : event.target.value}),
		onEditText: (type,val) => dispatch({type : 'storeAddRecordAddText', data: {
			type : type,
			val  : val
		}})
	})
)(AddForm);
