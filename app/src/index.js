import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducers';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Router, Route } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory as createHistory } from 'history';

// Componets
import Add from './componets/Password/Add';
import List from './componets/Password/List';

const browserHistory = createHistory();
const middleware = routerMiddleware(browserHistory);
const store = createStore(reducer, composeWithDevTools(applyMiddleware(middleware)));
const history = syncHistoryWithStore(browserHistory, store);



// TODO: clear
console.log('Router', history);
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App/>

		</Router>
	</Provider>,
	document.getElementById('root')
);

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
