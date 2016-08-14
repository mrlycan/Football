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
class TeamRow extends Component {

  constructor(props) {
    super(props);
    //this.onPressRow=this.onPressRow.bind(this);
  }
  onPressRow(Team) {

    const {navigator} = this.props
    //  navigator.push({
    //   name: "CompetitionInfo",
    //   component: CompetitionInfo,
    // });

    navigator.push(Object.assign({}, {
      name: "CompetitionInfo",
      component: CompetitionInfo,
      Team,
    }))
  }

  render() {
    const {Team, last, backgroundColor, navigator} = this.props

    return (
      <TouchableHighlight onPress={this.onPressRow.bind(this, Team) } underlayColor='transparent' >
        <View style={[!last ? styles.TeamBox : [styles.TeamBox, styles.TeamBoxLast], { backgroundColor: backgroundColor }]}>
          <View style={{
            width: width / 3, alignItems: 'center',
            flexDirection: 'row'
          }}><View style={{ flexDirection: 'row', flex: 1 }}><Image style={styles.teamImage}
            source={{ uri: address.ZHTeamsIconURL(Team.team_id) }}/><Text style={styles.dataBox}>{Team.club_name}</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{Team.matches_total}</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{Team.matches_won}</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{Team.matches_draw}</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{Team.matches_lost}</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{Team.goals_pro + '/' + Team.goals_against}</Text></View></View>
          <View style={[styles.p1, styles.lastP1]}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.dataBox}>{Team.points}</Text></View></View>
        </View>
      </TouchableHighlight>
    )
  }
}

TeamRow.propTypes = {
  Team: PropTypes.object,
  last: PropTypes.bool,
  backgroundColor: PropTypes.string,
  navigator: PropTypes.object,
}

export default class DataTeams extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      listViewHeight:0,
    }
  }

  componentDidMount() {
    const {detail} = this.props
    this.updateDataSource(detail)
  }

  componentWillReceiveProps(props) {
    // const {detail} = props
    // this.updateDataSource(detail)
  }

  updateDataSource(detail) {
    const {dataSource} = this.state
    let rows = Object.assign([], detail.data.ranking)
    rows.unshift({}) // unshift an empty object, use it as title row

    this.setState({
      dataSource: dataSource.cloneWithRows(rows)
    })
    
  }

  renderTitle(index) {
    return (
      <View style={[styles.TeamBox, styles.titleRow]} key={index}>
        <View style={{
          width: width / 3, alignItems: 'center',
          flexDirection: 'row'
        }}><View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}><Text style={styles.title}>球队</Text></View></View>
        <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>赛</Text></View></View>
        <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>胜</Text></View></View>
        <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>平</Text></View></View>
        <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>负</Text></View></View>
        <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>得/失</Text></View></View>
        <View style={[styles.p1, styles.lastP1]}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>分</Text></View></View>
      </View>
    )
  }

  renderRow(Team, _, i) {
    const index = parseInt(i, 10)
    const {detail, navigator} = this.props

    // if (index === 0)
    //   return this.renderTitle(index);
    if (index > 0) {
      let bColor = index % 2 === 0 ? '#FFFFFF' : '#F8F8FF';

      return (<TeamRow Team={Team} key={index} last={index === detail.data.ranking.length} backgroundColor={bColor} navigator={navigator}/>)
    }
    return null
  }
  
   renderSectionHeader(sectionData, sectionID) {

   return( 
     <View style={styles.titleRow}>
          <View style={{
            width: width / 3, alignItems: 'center',
            flexDirection: 'row'
          }}><View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}><Text style={styles.title}>球队</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>赛</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>胜</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>平</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>负</Text></View></View>
          <View style={styles.p1}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>得/失</Text></View></View>
          <View style={[styles.p1, styles.lastP1]}><View style={{ flexDirection: 'column', flex: 1 }}><Text style={styles.title}>分</Text></View></View>
        </View>
        );
  }
   onViewLayout(e){
    let listView = e.nativeEvent.layout;
    let height = listView.height;
  }
  render() {
    const {dataSource} = this.state
     const {height} = this.props
    return (
      <View style={{ marginTop: 10,flex:1}} >
       
        <View onLayout={this.onViewLayout.bind(this)} style={{flex:1}}>
        <ListView 
           ref={(listView) => { this._listView = listView; } }
          dataSource={dataSource}
          initialListSize={5}
          renderRow={this.renderRow.bind(this) }
          renderSectionHeader = {this.renderSectionHeader.bind(this) }
          showsVerticalScrollIndicator={true}
          style={[styles.listView,{height:height}]} 
           />
        </View>
      </View>
    )
  }
}
DataTeams.propTypes = {
  detail: PropTypes.object,
  navigator: PropTypes.object,
  height:PropTypes.number,
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
    flex:1,
  },
  // Team box (tr)
  titleRow: {
    flex:0,
    alignItems: 'stretch',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 25,
     backgroundColor: 'rgba(255, 255, 255, 0.75)'
    //backgroundColor:'#FFFFFF',
  },
  TeamBox: {
    alignItems: 'stretch',
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 30
  },
  TeamBoxLast: {
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
