import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'root-reducer';

const history = createBrowserHistory();

/**
 * Injecting Dependencies Into Epics
 * https://redux-observable.js.org/docs/recipes/InjectingDependenciesIntoEpics.html
 */
export const epicMiddleware = createEpicMiddleware();

const middleware = () => composeWithDevTools(
  applyMiddleware(epicMiddleware, routerMiddleware(history))
);

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  middleware()
);

export default configureStore;
