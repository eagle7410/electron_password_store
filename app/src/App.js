// Libs
import React from 'react';
import './App.css';
import {Route, Redirect} from 'react-router-dom';
// Componets
import Settings from './componets/Settings/Settings';
import Store from './componets/Storage/Storage';
import Users from './componets/Users/Users';
import Login from './componets/Login/Login';
import Logout from './componets/Logout';

const App = () => (
	<div className='App'>
		<div className='App-body container'>
			<div className="row">
				<Route path="/" render={() => <Redirect to="/storage"/>}/>
				<Route path="/storage"  component={Store}/>
				<Route path="/settings"   component={Settings}/>
				<Route path="/users" component={Users}/>
				<Route path="/login" component={Login}/>
				<Route path="/logout" component={Logout}/>
			</div>
		</div>
	</div>
);

export default App;
