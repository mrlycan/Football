import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


export default function configureStore(initialState) {
	return createStoreWithMiddleware(reducers, initialState);
}