import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoadAnime from './LoadAnime'
import {fullData}  from '../../api/Loader'
import AlertStatus from '../../const/AlertStatus'
import {Redirect} from 'react-router-dom';

class DataLoader extends Component {

	constructor (props) {
		super(props);
		// let props = this.props;

		fullData().then(res => {
			props.dataForCategories(res.categories);
			props.dataForUsers(res.users);
			props.dataForStore(res.storage);
			props.dataForSettings(res.settings);
			props.isLoadOk();

		}, e => {
			console.log('Error get data', e );
			props.showAlert('No get data. Inner error. Go to support', AlertStatus.BAD);
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
		isLoadOk          : ()    => dispatch({type: 'dataLoadedOk'}),
		isLoadBad         : ()    => dispatch({type: 'dataLoadedBad'}),
		dataForStore      : data  => dispatch({type: 'dataForStore' , data:data}),
		dataForCategories : data  => dispatch({type: 'dataForCategories' , data:data}),
		dataForUsers      : data  => dispatch({type: 'dataForUsers' , data:data}),
		dataForSettings   : data  => dispatch({type: 'dataForSettings' , data:data}),
		showAlert  : (mess, type) => dispatch({type : 'alertShow', data: {
			message : mess,
			status  : type
		}})
	})
)(DataLoader);
