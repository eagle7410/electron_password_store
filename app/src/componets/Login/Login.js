import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginList, auth} from '../../api/Login'
import Form from './Form'
import Load from './Load'
import {Redirect} from 'react-router-dom';
//Const
import {afterAuth} from '../../const/Routes';

class Login extends Component {
	constructor (props) {
		super(props);

		let that = this;

		if (that.props.store.isLoaded !== true) {
			loginList().then(that.props.onLoadedOk, that.props.onLoadedBad);
		}
	}

	validateData () {
		let that = this;
		let login = that.props.store.login;
		let pass = that.props.store.pass;
		let err = {
			errorLogin: '',
			errorPass: ''
		};

		if (!login) {
			err.errorLogin = 'Select login';
		}

		if (!pass) {
			err.errorPass = 'Enter password';
		}

		return !err.errorLogin && !err.errorPass ? false : err;
	}

	handelSubmit () {
		let that = this;
		let errors = that.validateData();

		that.props.onSubmit();

		if (errors) {
			return that.props.validateErrors(errors);
		}

		auth(that.props.store.login, that.props.store.pass)
			.then(that.props.onAuthOk, that.props.onAuthBad);
	}

	render () {
		let that = this;

		if (that.props.store.isLoad === true) {
			return (<Load/>);
		}

		if (that.props.store.token && that.props.store.isAuth) {
			return (<Redirect to={afterAuth}/>);
		}

		return (
			<div>
				<h1>Login</h1>
				<Form
					handelSubmit = {that.handelSubmit.bind(that)}
					handelChangeLogin = {that.props.handelChangeLogin}
					handelChangePass = {that.props.handelChangePass}
					key="loginForm"/>
			</div>
		);
	}
}

export default connect(
	state => ({
		store: state.login,
		navMenu: state.navMenu
	}),
	dispatch => ({
		validateErrors : errs => dispatch({type: 'loginValidateBad', data : errs}),
		onLoadedBad : err => dispatch({type: 'loginOnLoadBad', data : err}),
		onLoadedOk: data => dispatch({type: 'loginOnLoadOk', data: data}),
		onSubmit : () => dispatch({type: 'loginOnSubmit'}),
		onAuthOk : token => dispatch({type: 'loginOnAuthOk', data: token}),
		onAuthBad : err => dispatch({type: 'loginOnAuthBad', data: err}),
		handelChangeLogin: data => dispatch({type: 'loginOnLoginChange', data: data}),
		handelChangePass: data => dispatch({type: 'loginOnPassChange', data: data}),
		logout : () =>dispatch({type : 'logout'})
	})
)(Login);


