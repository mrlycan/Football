'use strict';
import {
    DATA
} from './actionTypes';
import address from './address';
import {
    AlertIOS
} from 'react-native';
import Storage from '../command/Storage';
//获取所有联赛
export function GetAllCompetition() {
    let reqUrl = address.ZHMatchesAllMatchesHotLeagueURL();
    return (dispatch) => {

        Storage.get('competition')
            .then((competition) => {
                return dispatch({
                    type: DATA.COMPETITION,
                    data: competition
                })
            }).catch((e) => {

            });

        return fetch(reqUrl)
            .then(res => res.json())
            .then(data => {
                var result = {
                    Data: data.map((item) => item)

                };
                Storage.save('competition', result.Data);
                dispatch(GetCompetitionTeamsData(result.Data[0].competition_id))
                dispatch({
                    type: DATA.COMPETITION,
                    data: result.Data
                })

            })
            .catch((e) => {
                dispatch({
                    type: DATA.COMPETITION,
                    data: [{ 'competition_id': 1, 'abbname': '没网了' },
                        { 'competition_id': 2, 'abbname': '没网了1' },
                        { 'competition_id': 51, 'abbname': '没网了2' },
                        { 'competition_id': 4, 'abbname': '没网了3' }]
                })
                AlertIOS.alert(e.message);
            });
    };
}

/**获取球队积分 */
export function GetCompetitionTeamsData(competitionId) {
    if (!competitionId)
        return;
    return (dispatch) => {
        dispatch({
            type: DATA.LODING,
            data: true
        });
        let reqUrl = address.ZHMatchesAllMatchesResultsTable(competitionId);
        let image = address.ZHMatchesAllMatchesLeagueIcon(competitionId);
        dispatch(GetCompetitionPlayersData(competitionId));

        return fetch(reqUrl)
            .then(res => res.json())
            .then(data => {
                let result = {
                    data: data.season.round.resultstable[0],
                }
                
                dispatch({
                    type: DATA.DETAIL.TEAM,
                    competitionId: competitionId,
                    data: result,
                    info: { competitionId: competitionId, image: image, name: data.name, season: data.season.name, }
                })
            })
            .catch((e) => {
                AlertIOS.alert(e.message);
                return;
            });
    };
}

/**获取球员积分数据 */
export function GetCompetitionPlayersData(competitionId) {
    if (!competitionId)
        return;
    // data.season.round.resultstable
    return (dispatch) => {
        dispatch({
            type: DATA.LODING,
            data: true
        });
        let reqUrl = address.ZHMatchesAllMatchesPlayersTable(competitionId);
        let image = address.ZHMatchesAllMatchesLeagueIcon(competitionId);
        return fetch(reqUrl)
            .then(res => res.json())
            .then(data => {

                var result = {
                    dataBlob: {},
                    sectionIDs: [],
                    rowIDs: []
                }

                PlayersDataOperation(data.season.goals, result, "goals");//进球
                PlayersDataOperation(data.season.assists, result, "assists");//助攻
                PlayersDataOperation(data.season.yellow_cards, result, "yellow_cards");//黄牌
                PlayersDataOperation(data.season.red_cards, result, "red_cards");//红牌

                dispatch({
                    type: DATA.DETAIL.PLAYERS,
                    competitionId: competitionId,
                    data: result
                })
            })
            .catch((e) => {
                AlertIOS.alert(e.message);
                return;
            });
    };
}

function PlayersDataOperation(result, resultObj, resTitle) {
    var data = [];
    if (!result || result.person === undefined || result.person.length === 0)
        return;

    if (result.person.length != undefined) {
        Array.from(result.person)
        result.person.forEach((item, index) => {
            if (index >= 10)
                return
            item["ranking"] = index + 1;
            data.push(item);
        });
        
        
         var length = data.length,
        persons,
        personLength,
        person,
        i = 0,
        j;

    if (resultObj.rowIDs && resultObj.rowIDs.length > 0)
        i = resultObj.rowIDs.length;

    resultObj.sectionIDs.push(resTitle);
    resultObj.dataBlob[resTitle] = resTitle;

    persons = data;
    personLength = data.length;

    resultObj.rowIDs[i] = [];

    for (j = 0; j < personLength; j++) {
        person = persons[j];
        resultObj.rowIDs[i].push(person.person_id);

        resultObj.dataBlob[resTitle + ':' + person.person_id] = person;
    }
    }
   
}

