'use strict'

const d = new Date()
const currentMonth = d.getMonth() + 1
let season
if (currentMonth >= 10) {
  season = d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2, 4)
} else {
  season = (d.getFullYear().toString() - 1) + '-' + d.getFullYear().toString().substring(2, 4)
}

const address = {
  
  
  /**
   * 球队背景图片接口
   */
  ZHTeamsVenueURL:(team_id)=>{
    return `http://bopimage.b0.upaiyun.com/SponiaSWData/Team_Venue/${team_id}.jpg`
  },
  /**
   *35热门球队接口
   */
  ZHTeamsHotTeam:()=>{
    return `http://dataserv.api.zuqiukong.com:8000/teamwebservice/get_hotteam/cn`
  },
  /**
   * 球队图标接口
   */
  ZHTeamsIconURL:(team_id)=>{
    return `http://bopimage.b0.upaiyun.com/SponiaSWData/Team/${team_id}.png`
  },
  /**
   * 赛季接口
   */
  ZHTeamsSeasonAllSeasonURL:(team_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/schedulewebservice/get_seasons_short/${team_id},team,cn`
  },
  
  
  /**
   * 动态第二cell接口
   */
  ZHTeamsSecCellURL:(team_id)=>{
    return `http://zqkplayground.avosapps.com/headline/${team_id}`
  },
  
  /**
   * 得到联赛赛季的一些统计
   */
  ZHTeamsSeasonLeagueResult:(season_id,team_id)=>{
    return `http://dataserv.sp2.api.zuqiukong.com:4000/service/data/soccer/season/${season_id}/team/list/${team_id}/statistics/?lang=cn`
  },
  
  /**
   * 得到锦标数
   */
  ZHTeamsSeasonLeagueTrophiesResult:(team_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/teamwebservice/get_trophies/${team_id},team,cn`
  },
  /**
   * 球员接口
   */
  ZHTeamsAllPlayerURL:(team_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/playerwebservice/get_career_array/${team_id},team,cn?range=league`
  },
  /**
   * 球员转入信息
   */
  ZHTeamsAllPlayerTransferInURL:(team_id)=>{
    return `http://dataserv.sp2.api.zuqiukong.com:4000/service/data/soccer/team/transfer/in/${team_id}/?lang=cn`
  },
  /**
   * 球队的球员转出信息
   */
  ZHTeamsAllPlayerTransferOutURL:(team_id)=>{
    return `http://dataserv.sp2.api.zuqiukong.com:4000/service/data/soccer/team/transfer/out/${team_id}/?lang=cn`
  },
  /**
   * 热门比赛接口
   */
  ZHMatchesHotTeamURL:(before,later)=>{
    return `http://dataserv.sp2.api.zuqiukong.com:4000/service/data/soccer/match/team_list_video/660,661,662,663,676,2016,2017,2020,1242,1240,1241,1244,961,964,968,886,6648,10655,434,429,425,349,132,424,2300,473,2137,1552,774,1318,944,1037,1772,453,1348,1385/?lang=cn&today_forward_day=${before}&today_next_day=${later}`
  },
  /**
   * 所有联赛接口
   */
  ZHMatchesAllLeaguesURL:()=>{
    return `http://dataserv.api.zuqiukong.com:8000/schedulewebservice/get_areas/1/?lang=cn`
  },
  /**
   * 国家联赛接口
   */
  ZHMatchesAllLeaguesCountriesLeaguesURL:(area_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/schedulewebservice/get_competitions/${area_id},cn`
  },
  /**
   * 国家图标接口
   */
  ZHMatchesAllLeaguesCountriesIconURL:(area_id)=>{
    return `http://bopimage.b0.upaiyun.com/SponiaSWData/Area/${area_id}.png`
  },
   /**
   * 比赛接口
   */
  ZHMatchesAllMatchesHotLeagueURL:()=>{
    return `http://dataserv.api.zuqiukong.com:8000/schedulewebservice/get_hotcompetition/cn`
  },
  /**
   * 联赛图片
   */
  ZHMatchesAllMatchesLeagueIcon:(competition_id)=>{
    return `http://bopimage.b0.upaiyun.com/SponiaSWData/Competition/${competition_id}.png`
  },
   /**
   * 联赛season信息
   */
  ZHMatchesAllMatchesGetSeasonID:(competition_id)=>{
    return `http://dataserv.sp2.api.zuqiukong.com:4000/service/data/soccer/competition/info/${competition_id}/?lang=cn`
  },
  /**
   * 
   */
  ZHMatchesAllMatchesLeagueMatchesURL:(season_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/schedulewebservice/get_simple_v_matches/${season_id},season,yes,2016-01-09,2016-02-02,cn`
  },
  /**
   * 积分榜接口
   */
 ZHMatchesAllMatchesResultsTable:(competition_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/schedulewebservice/get_tables/${competition_id},competition,cn`
  },
  /**
   * 球员榜接口
   */
  ZHMatchesAllMatchesPlayersTable:(competition_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/playerwebservice/get_player_statistics/${competition_id},competition,cn`
  },
  /**
   * 转会接口
   */
  ZHMatchesAllMatchesTransferTable:(competition_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/teamwebservice/get_transfers_limited/${competition_id},competition,cn`
  },
  /**
   * 冠军接口
   */
  ZHMatchesAllMatchesTrophiesTable:(competition_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/teamwebservice/get_trophies/${competition_id},competition,cn`
  },
  /**
   * 资讯接口ZHNews
   */
  ZHNewsVideoURL:(team_id)=>{
    return `http://dataserv.api.zuqiukong.com:8000/service/match/recommend_video/year/?last_id=0`
  },
 
  
  ZHNewsURL:()=>{
    return `http://newsserv2.api.zuqiukong.com:8000/server/get/all_message?last_id=0`
  },
 ZHHotURL0:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=0`
  },
  ZHZHUANTI2:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=2`
  },
  ZHLOCAL3:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=3`
  },
  ZHYingChao5:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=5`
  },
  ZHXIJIA6:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=6`
  },
  ZHYIJIA7:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=7`
  },
  ZHDEJIA8:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=8`
  },
  ZHOUGUAN9:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=9`
  },
   ZHOther10:()=>{
    return `http://newsserv2.api.zqkong.com:8000/server/get/all_message_bycategory?last_id=0&type_id=10`
  }
}

export default address
