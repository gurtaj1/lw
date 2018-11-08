import { combineReducers } from 'redux';

const defaultState = {};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'ANY_ACTION':
        return Object.assign({}, state, {});
      default:
        return state;
    }
  }

const rootReducer = combineReducers({
    reducer
});

export default rootReducer;
