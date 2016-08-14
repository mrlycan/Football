import * as TYPES from './actionTypes';

export function switchTab(tab) {
  RLOG('actions -> navigator -> switchTab ' + tab);
  return {
    type: TYPES.SWITCH_TAB,
    tab: tab,
  }
}

export function switchTab() {
  RLOG('actions -> navigator -> switchTab ' + tab);
  return {
    type: TYPES.SWITCH_TAB,
    tab: tab,
  }
}