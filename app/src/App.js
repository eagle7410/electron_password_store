// Libs
import React, {Component} from 'react';
import './App.css';
import {NavLinkm, Link} from 'react-router-dom';
import {Route, Switch} from 'react-router';
// Componets
import Add from './componets/Password/Add';
import List from './componets/Password/List';

class App extends Component {
	render() {
		return (
			<div className='App'>
				<div className='App-body container'>
					<div className="menu row">
						<ul>
							<li><Link to="/" >List</Link></li>
							<li><Link to="/add">Add</Link></li>
						</ul>
					</div>
					<div className="row">
						<Switch>
							<Route  path="/" component={List}/>
							<Route path="/add" component={Add}/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
