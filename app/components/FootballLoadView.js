
import React, {
	Component,
	PropTypes
} from 'react';
import {
	Platform,
	StyleSheet,
	View,
	Modal,
	Text,
	Dimensions
} from 'react-native';


import Spinner from 'react-native-spinkit';
let {
	height,
	width
} = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'transparent',
		opacity: 0.5,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
			//backgroundColor: '#d35400',

	},

	float: {
		height: height,
		width: width,
		borderRadius: 0,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

const SIZES = ['small', 'normal', 'large'];

export default class FootballLoadView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			visible: this.props.visible
		}
	}


	static propTypes = {
		visible: PropTypes.bool,
		color: PropTypes.string,
		size: PropTypes.oneOf(['small', 'normal', 'large']),
		overlayColor: PropTypes.string,
		floatColor: PropTypes.string,
	};

	static defaultProps = {
		visible: false,
		color: '#ff9800',
		size: 'large', // 'normal',
		overlayColor: 'rgba(0, 0, 0, 0.25)',
		floatColor: 'rgba(0, 0, 0, 0.45)',
	};

	close() {
		this.setState({
			visible: false
		})
	}

	componentWillReceiveProps(nextProps) {
		const {
			visible
		} = nextProps
		this.setState({
			visible
		})
	}

	_renderSpinner() {
		const {
			visible
		} = this.state

		if (!visible)
			return (
				<View />
			);

		// once RN version is released for this pull request
		// then we will integrate this `"Normal"` styleAttr property as default
		//let styleAttr = 'Normal';

		let styleAttr = 'SmallInverse';
		let size = 'large';

		switch (this.props.size) {
			case 'small':
				styleAttr = 'SmallInverse';
				size = 'small';
				break;
			case 'large':
				styleAttr = 'LargeInverse';
				size = 'large';
				break;
		}
		let types = ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'];

		var index = Math.ceil(Math.random() * (types.length));
		var color = '#' + Math.floor(Math.random() * 16777215).toString(16)
		let spinner = (
			<View style={styles.container} key={'spinner' + Date.now()}>
          <View style={[styles.float, {backgroundColor:this.props.floatColor}]}>
            <Spinner
              color={color}
		type = {
types[index]
		}
              size={width/8}
              // size={'large'}
              style={{ flex: 1,marginTop: (height-(width/3))/2 }}
              styleAttr={styleAttr}/>
            <Text style={{color: this.props.color, fontSize: 15, marginTop: 5,}}>{this.props.text}</Text>
        </View>
      </View>
		);

		return (
			<Modal visible={visible} transparent>
        {spinner}
      </Modal>
		);

	}

	render() {
		return this._renderSpinner();
	}

};