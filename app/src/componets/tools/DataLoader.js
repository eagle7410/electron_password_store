import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadAnime from './LoadAnime'
import {fullData}  from '../../api/Loader'
import AlertStatus from '../../const/AlertStatus'
import {Redirect} from 'react-router-dom';
import {StorageCategory, Storage, Alert, DataLoader as DataLoaderEvent} from '../../const/Events'

class DataLoader extends Component {

	constructor (props) {
		super(props);

		fullData().then(res => {
			['Categories', 'Users', 'Storage', 'Settings'].forEach(
				p => props['init'+p](res[p.toLowerCase()])
			);
			props.isLoadOk();

		}, e => {
			console.log(Alert.noGetData, e );
			props.showAlert(Alert.noGetData, AlertStatus.BAD);
			props.isLoadBad();
		});
	}
	render() {
		let content = this.props.store.isOk ? <Redirect to={this.props.pathAfter} /> : <div>Not work</div>;

		return this.props.store.isLoad ? <LoadAnime /> : content ;
	}

}

export default connect(
	state => ({
		store: state.dataLoader
	}),
	dispatch => ({
		isLoadOk       : ()    => dispatch({type: DataLoaderEvent.ok}),
		isLoadBad      : ()    => dispatch({type: DataLoaderEvent.bad}),
		initUsers      : data  => dispatch({type: 'dataForUsers' , data:data}),
		initStorage    : data  => dispatch({type: Storage.init , data:data}),
		initSettings   : data  => dispatch({type: 'dataForSettings' , data:data}),
		initCategories : data  => dispatch({type: StorageCategory.init , data:data}),
		showAlert      : (mess, type) => dispatch({type : Alert.show, data: {
			message : mess,
			status  : type
		}})
	})
)(DataLoader);
