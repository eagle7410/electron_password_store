import React, {Component} from 'react';
import {connect} from 'react-redux'
import Menu from './Menu';
import Navigate from './Navigate';

class NavMenu extends Component {

	componentDidMount() {
		this.props.noRedirect();
	}

	render() {
		let that = this;
		let route = '/storage';

		const select = (index) => {
			// eslint-disable-next-line
			switch (index) {
				case 1:
					route = '/users';
					break;
				case 2:
					route = '/settings';
					break;
				case 3:
					route = '/logout';
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
