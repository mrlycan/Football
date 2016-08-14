import {
  DATA
} from '../actions/actionTypes';

const initialState = {
  selectedTabIndex: 0,
  loaded: false,
  loading: false,
  competition: [],
  info: {},
  teams: {},
  players: {}

};


export default function data(state = initialState, action) {
  switch (action.type) {
    case DATA.SWITCH_TITLE_BAR_TAB:
      return Object.assign({}, state, {
        selectedTabIndex: action.selTabIndex,
      });
    case DATA.COMPETITION:
      return Object.assign({}, state, {
        competition: action.data,
        loaded: true,
        selectedTabIndex: 1,
        selectedCompetitionID: action.data[0].competition_id
      });
    case DATA.DETAIL.TEAM:
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        selectedCompetitionID: action.competitionId,
        info: action.info,
        teams: action.data
      });
    case DATA.DETAIL.PLAYERS:
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        selectedCompetitionID: action.competitionId,
        players: action.data
      });
    case DATA.LODING:
      return Object.assign({}, state, {
        loading: action.data,
        detail: []
      });
    default:
      return state;
  }
}