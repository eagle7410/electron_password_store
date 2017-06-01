import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {Login as LoginEvent} from '../const/Events';

class Logout extends Component {
	render () {
		this.props.logout();

		return <Redirect to="/login" />;
	}
}

export default connect(
	state => ({
		store: state.login
	}),
	dispatch => ({
		logout : () =>dispatch({type : LoginEvent.logout})
	})
)(Logout);
