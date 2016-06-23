import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import {getInitialState} from './initial_state';

const enhancers = [];

if ((<any>window).devToolsExtension) {
  enhancers.push((<any>window).devToolsExtension());
}

const finalCreateStore = compose(
  applyMiddleware(thunk),
  ...enhancers
)(createStore);


const store = createStore(rootReducer, getInitialState(), compose(
  applyMiddleware(thunk),
  ...enhancers
));
export default store;
