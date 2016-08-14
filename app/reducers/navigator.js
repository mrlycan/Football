import * as TYPES from '../actions/actionTypes';

const initialState = {
  tab: TYPES.HOME_TABS.Data,
};

export default function navigator(state=initialState, action) {
  switch (action.type) {
    case TYPES.SWITCH_TAB:
    return Object.assign({}, state, {
        tab: action.tab
			});
     
    default:
      return state;
  }
}
