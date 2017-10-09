import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import {clearError} from './actions'

import FrontLayout from './layouts/FrontLayout';
import EmptyLayout from './layouts/EmptyLayout';

import Home from './pages/Home';
import Backoffice from './pages/Backoffice';
import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn';

import './index.css';

const logger = createLogger({
  // Ignore `CHANGE_FORM` actions in the logger, since they fire after every keystroke
  predicate: (getState, action) => action.type !== 'CHANGE_FORM'
})

const sagaMiddleware = createSagaMiddleware()

// Creates the Redux store using our reducer and the logger and saga middlewares
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))
// We run the root saga automatically
sagaMiddleware.run(rootSaga)

/**
* Checks authentication status on route change
* @param  {object}   nextState The state we want to change into when we change routes
* @param  {function} replace Function provided by React Router to replace the location
*/
function checkAuth (nextState, replace) {
  const {loggedIn} = store.getState()

  store.dispatch(clearError())

  // Check if the path isn't backoffice. That way we can apply specific logic to
  // display/render the path we want to
  if (nextState.location.pathname !== '/backoffice') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace('/backoffice')
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname)
      } else {
        replace('/')
      }
    }
  }
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={ browserHistory }>
			<Route component={FrontLayout}>
				<IndexRoute name='index' component={ Home } />
	  		<Route path='/' component={Home} />
			</Route>
			<Route component={EmptyLayout} onEnter={checkAuth}>
				<Route path='/login' component={LogIn} />
	  		<Route path='/backoffice' component={Backoffice} />
			</Route>
			<Route path='*' component={NotFound}/>
		</Router>
	</Provider>
, document.getElementById('body'));