import * as TYPES from './actionTypes';

export function switchTitleBarTab(selTabIndex) {
  //RLOG('actions -> titleBarTab -> switchTitleBarTab ' + selTabIndex);
  return {
    type: TYPES.SWITCH_TITLE_BAR_TAB,
    selTabIndex: selTabIndex,
  }
}
