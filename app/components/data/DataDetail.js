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
    Image, AlertIOS
} from 'react-native'
import DataTeams from './DataTeams';
import DataPlayers from './DataPlayers';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

import {
    GetCompetitionTeamsData,
    GetCompetitionPlayersData
} from '../../actions/data';
import login from '../../pages/login';
export default class DataDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedIndex: 0,
        }
    }

    componentDidMount() {
        const {
            dispatch,
            competitionId,data
        } = this.props;
        data.teams={},
        data.players={},
        dispatch(GetCompetitionTeamsData(competitionId));
    }
    onChange(index) {

        const {dispatch,competitionId,data} = this.props;
        if (index === 1&&data.players.rowIDs===undefined&&data.info.competitionId===competitionId) {
            dispatch(GetCompetitionPlayersData(competitionId));
        } else if(index===0&&data.teams===undefined&&data.info.competitionId===competitionId) {
            if(!data.teams)
            dispatch(GetCompetitionTeamsData(competitionId));
        }
        this.setState({
            selectedIndex: index
        });
    }

    renderScene(route, navigator) {
        if (route.component) {
            const Component = route.component
            return <Component navigator={navigator} route={route} {...this.props} />
        }
    }


    onViewLayout(e) {
        let listView = e.nativeEvent.layout;
        let height = listView.height;
        //AlertIOS.alert('-'+height+'--'+WINDOW_HEIGHT);
    }
    
    renderHead(){
        return (
            <View style={{ flex: 1 }} >
                <Image style={{ position: 'absolute', zIndex: -1, opacity: 0.1, height: 60, width: WINDOW_WIDTH, resizeMode: 'cover', flex: 0 }} source={{ uri: data.detail.image }}/>
                <View style={{ alignItems: 'center', flexDirection: 'row', flex: 0 }} onLayout={this.onViewLayout.bind(this) } >
                    <Image style={styles.competition_logo} source={{ uri: data.detail.image }}/>
                    <View style={styles.competition_info}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text>{data.detail.name}</Text><Text style={{ color: '#DCDCDC' }}>{'(' + data.detail.season + ')'}</Text>
                        </View>
                        <View style={styles.button_box}>
                            <TouchableHighlight onPress={this.onChange.bind(this, 0) } underlayColor={'rgba(0,0,0,0)'}>
                                <View style={[selectedIndex === 0 ? styles.button_sel : styles.button_usel]}>
                                    <Text style={[styles.text, { color: selectedIndex === 0 ? '#FFFFFF' : '#1E90FF' }]}>{'积分榜'}</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.onChange.bind(this, 1) } underlayColor={'rgba(0,0,0,0)'}>
                                <View style={[selectedIndex === 1 ? styles.button_sel : styles.button_usel]}>
                                    <Text style={[styles.text, { color: selectedIndex === 1 ? '#FFFFFF' : '#1E90FF' }]}>{'球员榜'}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
    render() {

        let {selectedIndex} = this.state;
        
        const {data,competitionId,info, navigator} = this.props;
        if (data.loading) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 16 }}>
                        正在加载数据……
                    </Text>
                </View>

            )
        }
        
    let isEmpty = data.info === undefined;
    if(selectedIndex===0)
        isEmpty=data.teams.data===undefined;
    else
        isEmpty=data.players===null;
        
    if (isEmpty) {
      return (
        // <ScrollView
        //   automaticallyAdjustContentInsets={false}
        //   horizontal={false}
        //   contentContainerStyle={styles.no_data}
        //   style={{ flex: 1 }}

        //   >
        //   <View style={{ alignItems: 'center', paddingTop: -100 }}>
        //     <Text style={{ fontSize: 16 }}>
        //       目前没有数据，请刷新重试……
        //     </Text>
        //   </View>
        // </ScrollView>
           <View style={{ alignItems: 'center', paddingTop: -100 }}>
            <Text style={{ fontSize: 16 }}>
              目前没有数据，请刷新重试……
            </Text>
          </View>
      );
    }
        
        return (
            <View style={{ flex: 1 }} >
                <Image style={{ position: 'absolute', zIndex: -1, opacity: 0.1, height: 60, width: WINDOW_WIDTH, resizeMode: 'cover', flex: 0 }} source={{ uri: data.info.image }}/>
                <View style={{ alignItems: 'center', flexDirection: 'row', flex: 0 }} onLayout={this.onViewLayout.bind(this) } >
                    <Image style={styles.competition_logo} source={{ uri: data.info.image }}/>
                    <View style={styles.competition_info}>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text>{data.info.name}</Text><Text style={{ color: '#DCDCDC' }}>{'(' + data.info.season + ')'}</Text>
                        </View>
                        <View style={styles.button_box}>
                            <TouchableHighlight onPress={this.onChange.bind(this, 0) } underlayColor={'rgba(0,0,0,0)'}>
                                <View style={[selectedIndex === 0 ? styles.button_sel : styles.button_usel]}>
                                    <Text style={[styles.text, { color: selectedIndex === 0 ? '#FFFFFF' : '#1E90FF' }]}>{'积分榜'}</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.onChange.bind(this, 1) } underlayColor={'rgba(0,0,0,0)'}>
                                <View style={[selectedIndex === 1 ? styles.button_sel : styles.button_usel]}>
                                    <Text style={[styles.text, { color: selectedIndex === 1 ? '#FFFFFF' : '#1E90FF' }]}>{'球员榜'}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                {this.state.selectedIndex === 1 && <DataPlayers detail={data.players} navigator={navigator} height={WINDOW_HEIGHT - 200}/>}
                {this.state.selectedIndex === 0 && <DataTeams detail={data.teams} navigator={navigator} height={WINDOW_HEIGHT - 200}/>}
            </View>

        );
    }
}

DataDetail.propTypes = {
    //detail: PropTypes.object,
    competitionId:PropTypes.number,
    navigator: PropTypes.object
}

const styles = StyleSheet.create({
    myBgImage: {
        // flex: 1,
        // height:50,
        // width:WINDOW_WIDTH,

        // position:'relative',
    },
    competition_logo:
    {
        flex: 1,
        width: 50,
        height: 50,
        marginLeft: 20,
        alignItems: 'center',
        position: 'absolute'
    },
    competition_name:
    {
        //fontSize:16
    },
    competition_info:
    {
        width: WINDOW_WIDTH / 5 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
        //paddingTop:-10
    },
    button_box: {
        flexDirection: 'row',
        borderColor: '#1E90FF',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 5

    },
    button_usel: {
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        width: WINDOW_WIDTH / 5 - 1,
    },
    button_sel: {
        backgroundColor: '#1E90FF',
        borderStyle: 'solid',
        justifyContent: 'center',
        width: WINDOW_WIDTH / 5 - 1
    },
    text:
    {
        fontSize: 14,
        textAlign: 'center',
    }

});

