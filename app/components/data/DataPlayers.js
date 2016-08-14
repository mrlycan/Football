'use strict'
import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Dimensions,
  Image,
  TouchableHighlight,
  AlertIOS,
} from 'react-native'
let {
  height,
  width
} = Dimensions.get('window');
import address from '../../actions/address';
import CompetitionInfo from './CompetitionInfo';
import login from '../../pages/login';
import Icon from 'react-native-vector-icons/FontAwesome';
class PlayerRow extends Component {

  constructor(props) {
    super(props);

  }



  onPressRow(player) {

    const {navigator} = this.props
    navigator.push(Object.assign({}, {
      name: "CompetitionInfo",
      component: CompetitionInfo,
      player,
    }))
  }

  render() {
    const {player, last, backgroundColor, navigator} = this.props

    return (


      <TouchableHighlight onPress={this.onPressRow.bind(this, player) } underlayColor='transparent' >
        <View style={[!last ? styles.playerBox : [styles.playerBox, styles.playerBoxLast], { backgroundColor: backgroundColor }]}>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{player.ranking}</Text></View></View>
          <View style={{
            width: width / 3, alignItems: 'center',
            flexDirection: 'row'
          }}>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={styles.dataBox}>{player.name}</Text></View></View>

          <View style={{
            width: width / 3, alignItems: 'center',
            flexDirection: 'row'
          }}>

            <View style={{ flexDirection: 'row', flex: 1 }}><Image style={styles.teamImage}
              source={{ uri: address.ZHTeamsIconURL(player.team_id) }}/>
              <Text style={styles.dataBox}>{player.team_name}</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{player.count}</Text></View></View>

        </View>
      </TouchableHighlight>
    )
  }
}

PlayerRow.propTypes = {
  player: PropTypes.object,
  last: PropTypes.bool,
  backgroundColor: PropTypes.string,
  navigator: PropTypes.object,
}

export default class DataPlayers extends Component {

  // 构造
  constructor(props) {
    super(props);
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    }

    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[sectionID + ':' + rowID];
    }
    // 初始状态
    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({
        getSectionData: getSectionData,
        getRowData: getRowData,
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };


  }

  componentDidMount() {
    const {detail} = this.props

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(detail.dataBlob, detail.sectionIDs, detail.rowIDs),
      loaded: true
    });
  }





  renderRow(player, _, i) {
    const index = parseInt(i, 10)
    const {detail, navigator} = this.props

    // if (index === 0)
    //   return this.renderTitle(index);
    if (index > 0) {
      let bColor = index % 2 === 0 ? '#FFFFFF' : '#F8F8FF';

      return (<PlayerRow player={player} key={index} last={false} backgroundColor={bColor} navigator={navigator}/>)
    }
    return null
  }
  _sectionHeader(title, endText) {
    return (
      <View style={styles.titleRow}>
        <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>{title}</Text></View></View>
        <View style={{
          width: width / 3, alignItems: 'center',
          flexDirection: 'row'
        }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}><Text style={styles.title}>球员</Text></View></View>
        <View style={{
          width: width / 3, alignItems: 'center',
          flexDirection: 'row'
        }}>
          <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}><Text style={styles.title}>球队</Text></View></View>

        <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>{endText}</Text></View></View>
      </View>
    );
  }
  renderSectionHeader(sectionData, sectionID) {

    switch (sectionID) {
      case "yellow_cards":
        return this._sectionHeader("黄牌板", "黄牌");
      case "red_cards":
        return this._sectionHeader("红牌板", "红牌");
      case "goals":
        return this._sectionHeader("射手板", "进球");
      case "assists":
        return this._sectionHeader("助攻板", "助攻");
    }
  }
  onViewLayout(e) {
    let listView = e.nativeEvent.layout;
    let height = listView.height;
  }
  render() {
    const {dataSource} = this.state
    const {height} = this.props;

    if (dataSource._dirtyRows.length===0) {
      return (
       <View style={{ marginTop: 10, flex: 1,alignItems:'center', justifyContent:'center'}} >
       
        <Icon name='frown-o' size={80} color={'#CCCCCC'} style={{justifyContent:'center',marginTop:height/2-40}}/>
        </View>
      );

    }

    return (
      <View style={{ marginTop: 10, flex: 1 }} >

        <View onLayout={this.onViewLayout.bind(this) } style={{ flex: 1 }}>
          <ListView
            ref={(listView) => { this._listView = listView; } }
            dataSource={dataSource}
            initialListSize={5}
            renderRow={this.renderRow.bind(this) }
            renderSectionHeader = {this.renderSectionHeader.bind(this) }
            showsVerticalScrollIndicator={true}
            style={[styles.listView, { height: height }]}
            />
        </View>
      </View>
    )
  }
}
DataPlayers.propTypes = {
  detail: PropTypes.object,
  navigator: PropTypes.object,
  height: PropTypes.number,
}

const styles = StyleSheet.create({
  // Container
  container: {
    backgroundColor: 'red'
  },
  // Scroll
  scrollView: {
    width: 400
  },
  // List
  listView: {
    flexDirection: 'column',
    marginRight: 10,
    width: width,
    flex: 1,
  },
  // Player box (tr)
  titleRow: {
    flex: 0,
    alignItems: 'stretch',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  playerBox: {
    alignItems: 'stretch',
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 30
  },
  playerBoxLast: {
    borderBottomWidth: 0
  },
  // Every box (td)
  title: {
    alignSelf: 'center',
    color: '#1E90FF',
    fontSize: 12
  },
  pName: {
    color: '#222',
    fontSize: 12,
    paddingLeft: 5
  },
  dataBox: {
    alignSelf: 'center',
    color: '#222',
    fontSize: 11
  },
  p1: {
    alignItems: 'center',
    //borderRightColor: '#c2c2c2',
    //borderRightWidth: 1,
    flex: 1,
    flexDirection: 'row'
  },
  lastP1: {
    borderRightWidth: 0
  },
  p2: {
    borderRightColor: '#c2c2c2',
    borderRightWidth: 1,
    flex: 2,
    flexDirection: 'row',
  },
  p2Name: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  teamImage: {
    width: 25,
    height: 25,
    alignItems: 'center',
  }
})
