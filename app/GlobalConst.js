export const DEBUG = false; // 调试模式
export const RDEBUG = false; // Redux调试模式

export const APP_MAIN_COLOR = '#00AA88'; // APP主颜色
export const COMMON_SELECT_COLOR = 'rgba(255, 80, 0, 0.1)'; // 统一按下颜色
export const TITLE_BAR_HEIGHT = 40; // 自定义标题栏高度
export const COMMON_BACKGROUND_COLOR = '#FFFFFF'; // 统一背景颜色

export const APP_VERSION = 'v1.3'; // 统一背景颜色

import {
	Dimensions
} from 'react-native';

let window = {
	width: Dimensions.get('window').width,
	height: Dimensions.get('window').height,
}

let colors = {
	themeColor: '#00AA88',
}

let storeKeys = {
	SEARCH_HISTORY_KEY: 'SEARCH_HISTORY_KEY',
}


export default {
	window: window,
	colors: colors,
	storeKeys: storeKeys,
}