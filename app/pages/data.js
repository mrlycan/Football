import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ListView,
  AlertIOS,
  RefreshControl, TouchableOpacity
} from 'react-native';
import {
  connect
} from 'react-redux';

import CustomTitleBarComp from '../components/CustomTitleBarComp';
import ViewPagerComp from '../components/ViewPagerComp';
import DataPlayers from '../components/data/DataPlayers';
import DataDetail from '../components/data/DataDetail';
import FootballTabBar from '../components/FootballTabBar';
import FootballLoadView from '../components/FootballLoadView'
import {switchTitleBarTab} from '../actions/titleBarTab';
import {COMMON_BACKGROUND_COLOR} from '../GlobalConst';
import {
  GetAllCompetition,
  GetCompetitionTeamsData,
  GetCompetitionPlayersData
} from '../actions/data'

import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
let {
  height,
  width
} = Dimensions.get('window');
class data extends Component {

  // GetAllCompetition() {
  //   const {
  //     dispatch,
  //     data
  //   } = this.props;

  //   dispatch(GetAllCompetition());
  // }
  constructor(props) {
    super(props);
    this.onViewPageScroll = this._onViewPageScroll.bind(this);
    this.state = {
      indicator: true,
      selectedCompetitionID: "51",
    }
    this.mount = true;
  }

  componentDidMount() {
    const {
      dispatch,
      data
    } = this.props;

    dispatch(GetAllCompetition());
  }


  onEndReached(competitionId) {
    let time = Date.parse(new Date()) / 1000;

    const {dispatch} = this.props;
  }

 
  onChanage(competitionId) {

    this.mount = false;
    const {data, dispatch} = this.props;
    this.setState({ selectedCompetitionID: competitionId });
  }
  
  renderContent(competitionId) {
    
    if (this.state.selectedCompetitionID === competitionId)
      return (<DataDetail competitionId={Number.parseInt(competitionId)} {...this.props}/>)
    else
      return null;
  }

  render() {
    const {
      data
    } = this.props;
    let competition = data.competition;
    //AlertIOS.alert('aa');
    var lists = [];
    competition.forEach((item) => {
      lists.push(
        <View
          key={item.competition_id}
          tabLabel={item.abbname}
          >
          {this.renderContent(item.competition_id) }

        </View>);
    });
    return (
      <View style={styles.container}>
        <CustomTitleBarComp
          ref="titleBar"
          title="数据"
          onLeftBtnClick={this.props.onDrawerMenuToggle}
          isMainPage={true}
          />
        <ScrollableTabView
          initialPage={0}
          tabBarPosition={'top'}
          renderTabBar={() => <FootballTabBar /> }
          onChangeTab={(obj) => this.onChanage(obj.ref.key.replace(".$", "")) }
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineColor="#3e9ce9"
          tabBarActiveTextColor="#FFFFFF"
          tabBarInactiveTextColor="#aaaaaa"
          >

          {lists}
        </ScrollableTabView>

      </View>
    );
  }
  _switchTitleBarTab(selIndex) {
    if (this.props.selectedTabIndex !== selIndex) {
      this.props.dispatch(switchTitleBarTab(selIndex));
    }
  }

  _onViewPageScroll(offset) {
    this.refs.titleBar.onPageScroll(offset);
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
  contentContainer: {
    // flex - direction: row,
    height: 10,
    width: width * 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc'
  }
});

// function select(store) {
//   return {
//     selectedTabIndex: store.dataStore.selectedTabIndex,
//   }
// }
function mapStateToProps(state) {
  const {
    data
  } = state;
  return {
    data,
  }
}

export default connect(mapStateToProps)(data);