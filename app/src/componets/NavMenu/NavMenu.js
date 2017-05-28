import React, {Component} from 'react';
import {connect} from 'react-redux'
import Menu from './Menu';
import Navigate from './Navigate';
//Const
import {routes, afterAuth} from '../../const/Routes';

class NavMenu extends Component {

	render() {
		let that = this;
		let route = afterAuth;

		const select = (index) => {
			// eslint-disable-next-line
			switch (index) {
				case 0:
					route = routes.storage;
					break;
				case 1:
					route = routes.users;
					break;
				case 2:
					route = routes.settings;
					break;
				case 3:
					route = routes.logout;
					break;
			}

			that.props.goTo({
				routeTo : route,
				select : index
			});
		};

		return <div>
			<Navigate/>
			<Menu onSelect={select}/>
		</div>

	}

	componentDidMount() {
		this.props.noRedirect();
	}
}

export default connect(
	state => ({
		store: state.navMenu
	}),
	dispatch => ({
		goTo: route => dispatch({type: 'goTo', data: route}),
		noRedirect : () => dispatch({type: 'goToClear'}),
	})
)(NavMenu);
