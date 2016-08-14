'use strict';
import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	Switch,
	TouchableOpacity,
	AlertIOS
} from 'react-native';
import {
	connect
} from 'react-redux';
import {
	logOut
} from '../actions/Login'
import global from '../GlobalConst';

import CustomTitleBarComp from '../components/CustomTitleBarComp';
import login from './login';


class me extends Component {
	constructor(props) {
		super(props);
		this.onLogOut = this.onLogOut.bind(this);
	}

	render() {
		let titles = ['清除缓存',
			'消息中心',
			'个人信息'
		];


		return (
			<View style={styles.container}>
                <HeadView />
				{
					titles.map((title) => {
						return (
							<TouchableOpacity
                                key={title}
                                style={styles.cell}
								>
                                <Text>{title}</Text>

                            </TouchableOpacity>
						)
					})
				}
				<View>
					<TouchableOpacity
						accessibilityTraits="button"
						onPress={this.onLogOut}
						activeOpacity={0.8}
						style={styles.button}>

						<Text style={styles.whiteFont}>
							Login Out
						</Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}

	onLogOut() {


		this.props.navigator.push({
			name: "Login",
			component: login,
        });
		//dispatch(logOut());	


	}
}


function mapStateToProps(state) {
	const {
		login
	} = state;
	return {
		login,
	}
}

export default connect(mapStateToProps)(me);


class HeadView extends Component {
	constructor(props) {
		super(props);
		this.state = { name: '' }
	};

	componentWillMount() {

	}
	render() {
		return (
			<View>
                <Image style={styles.myBgImage} source={{ uri: 'img_my_bg' }}>
                    <Image style={styles.headIcon} source={{ uri: 'img_default_head' }}/>
                    <Text style={{ color: 'white' }}>{this.state.name}</Text>

                </Image>
            </View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 44,
		borderBottomColor: '#ccc',
		borderBottomWidth: 0.5,
		marginTop: 10
	},

	myBgImage: {
		flex: 1,
		height: 160,
		justifyContent: 'center',
		alignItems: 'center',
	},

	headIcon: {
		height: 80,
		width: 80,
	},

	login: {
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'white',
		borderWidth: 0.5,
		padding: 5,
		marginTop: 10,
	},

	jurisdictionView: {
		flexDirection: 'row',
		height: 100,
		borderBottomColor: 'rgb(241, 241, 241)',
		borderBottomWidth: 10
	},

	handleView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	switchCell: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
		borderBottomColor: 'rgb(241, 241, 241)',
		borderBottomWidth: 10
	},

	switch: {
		position: 'absolute',
		right: 15,
		top: 10,
	},

	cell: {
		flexDirection: 'row',
		height: 40,
		marginLeft: 10,
		//marginRight: 10,
		justifyContent: 'space-between',
		borderBottomColor: '#ccc',
		borderBottomWidth: 0.5,
		alignItems: 'center'
	},

	rightIcon: {
		position: 'absolute',
		right: -10,
		top: 5,
		height: 30,
		width: 30
	},


	button: {
		//backgroundColor: global.colors.themeColor,
		padding: 10,
		marginTop: 30,

		//height: 40,
		borderTopColor: '#ccc',
		borderTopWidth: 0.5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 0.5,
		alignItems: 'center',
		borderWidth: 0,
		//borderRadius: 8
	},
	whiteFont: {
		//color: '#fff',
		//fontWeight: 'bold',
		//fontSize: 18
	}

})