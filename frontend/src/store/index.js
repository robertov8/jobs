import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import issues from './modules/issue/reducer';

const rootReducer = combineReducers({ issues });

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(thunk), console.tron.createEnhancer())
    : applyMiddleware(thunk);

const store = createStore(rootReducer, composeEnhancers);

export default store;
