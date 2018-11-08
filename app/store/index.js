import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'root-reducer';

const history = createBrowserHistory();

const middleware = () => composeWithDevTools(
  applyMiddleware(routerMiddleware(history))
);

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  middleware()
);

export default configureStore;
