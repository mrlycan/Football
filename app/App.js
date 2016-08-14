import React, {
	Component
} from 'react';
import {
	Provider
} from 'react-redux';
import {
	View
} from 'react-native';

import RootPage from './RootPage';
import configureStore from './store/index';

const store = configureStore();

class App extends Component {
	constructor(props) {
		super(props);
		this.store = {
			test: '1'
		}
	}

	render() {
		return (
			<Provider store={store}>
				<RootPage/>
			</Provider>


		);
	}
}


export default App;