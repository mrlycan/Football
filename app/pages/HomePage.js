// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
// //import login from './jsCore/login';

import React, {
  Component
} from 'react';
import {
  TabBar,
  View,
  Text,
  StyleSheet,
  TabBarIOS,
  TabBarItemIOS,
  NavigatorIOS,
  Navigator,
  ScrollView,
  Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

import Me from './me';
import Game from './Game';
import Data from './data';
import global from '../GlobalConst';
import {HOME_TABS} from '../actions/actionTypes';

const tabBarItems = [
  {
    title: '赛程',
    icon: 'music',
    component: Me
  },
  {
    title: '资讯',
    icon: 'music',
    component: Data
  },
  {
    title: '数据',
    icon: 'music',
    component: Data
  },
  {
    title: '我',
    icon: 'music',
    component: Me
  },]

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'data',
    };

  };
  _onTabSelect(tab) {
    if (this.props.tab !== tab) {
      //this.props.dispatch(switchTab(tab));
    }
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <TabNavigator tabBarStyle= {{flex:1,alignItems:"flex-end"}}>
          <TabNavigator.Item
            title="数据"
            selected={this.state.selectedTab === 'data'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Icon name='bar-chart' size={20} color={'#9999'}/>}
            renderSelectedIcon={() => <Icon name='bar-chart' size={20} color={'#008B8B'}/>}
            onPress={() => this.setState({ selectedTab: 'data' }) }>
            <Data {...this.props}/>
          </TabNavigator.Item>
          <TabNavigator.Item
            title="我的"
            selected={this.state.selectedTab === 'me'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Icon name='user' size={20} color={'#9999'}/>}
            renderSelectedIcon={() => <Icon name='user' size={20} color={'#008B8B'}/>}
            onPress={() => this.setState({ selectedTab: 'me' }) }>
            <Me {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconStyle: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyleSel: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#9999',
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTextStyle: {
    color: '#008B8B',
    justifyContent: 'center',
  }
})