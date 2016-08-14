'use strict'
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import GlobalConst from '../../GlobalConst';
import address from '../../actions/address';
export default class CompetitionInfo extends Component {
    constructor(props) {
        super(props)


    }

    onBackPress() {
        const {navigator} = this.props;
        navigator.pop();
    }
    render() {
        const {player} = this.props;
        let backImage = address.ZHTeamsVenueURL(player.team_id);
        let log = address.ZHTeamsIconURL(player.team_id);
        return (
            <View>
                <Image style={{ position: 'absolute', height: GlobalConst.window.height / 4, width: GlobalConst.window.width, resizeMode: 'cover' }}
                    source={{ uri: backImage }}/>
                <View>
                    <View style={Styles.titleBar}>
                        <TouchableHighlight onPress={this.onBackPress.bind(this) } underlayColor={'rgba(0,0,0,0)'}>
                            <Icon name='angle-left' size={40} color={'#FFFFFF'}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <Image style={Styles.teamLog} source={{ uri: log }}/>
                        <View>
                            <Text>{player.club_name}</Text>

                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const Styles = StyleSheet.create({

    titleBar: {
        marginTop: 20,
        marginLeft: 20,
        height: 20
    },
    teamLog: {
        margin: 20,
        width: 80,
        height: 80
    }
});