import React, {
	Component
} from 'react';

import {
	Navigator,
	StyleSheet,
	StatusBar,
	View
} from 'react-native';
import HomePage from './pages/HomePage';
import {
	connect
} from 'react-redux';

class RootPage extends Component {

	constructor(props) {
		super(props);
	}

	_handlerConfigureScene() {
		return Navigator.SceneConfigs.PushFromRight;
	}

	_renderScene(route, navigator) {
		if (route && route.component) {
			var {component: Component, ...route} = route;
			return <Component navigator={navigator} {...route} />;
		}

		return <HomePage navigator={navigator} {...route} />;
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor={'rgba(0, 0, 0, 0.2)'} />
				<Navigator
					ref={component => this.navigator = component}
					initialRoute={{}}
					configureScene={this._handlerConfigureScene}
					renderScene={this._renderScene.bind(this) }
					/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

function mapStateToProps(state) {
	const {
		login
	} = state;
	return {
		login
	}
}
export default connect(mapStateToProps)(RootPage);