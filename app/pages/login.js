/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//import getData from './Service/app-feedback.js';
//import HomePage from './jsCore/HomePage'
import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  AlertIOS,
  ScrollView,
  ActivityIndicatorIOS
} from 'react-native';
import {
  connect
} from 'react-redux';


import HomePage from './HomePage';
import FootballLoadView from '../components/FootballLoadView'
import {
  fetchLogin,
  changeLoginAuth
} from '../actions/Login'

import commonStyle from '../styles/common';
import loginStyle from '../styles/login';

import Spinner from 'react-native-spinkit';
class Login extends Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      login
    } = nextProps;


    // if (login.logining === true) {
    //   nextProps.navigator.push({
    //     name: "CommandLoadView",
    //     component: CommandLoadView,
    //   });
    // }
    if (login.logined) {
      if (login.rawData) {
      
        nextProps.navigator.push({
          name: "HomePage",
          component: HomePage,
        });
      }
      //this.onRadChange = this.onRadChange.bind(this);
    }
  }


  render() {

    const {
      dispatch,
      login
    } = this.props;

    return (
      <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
            <Image source={require('../imgs/icons/bg.png')} style={{resizeMode: 'stretch'}}>
                <View style={loginStyle.loginMain}>
                    <View style={loginStyle.loginMainCon}>
                        <View style={loginStyle.comCulture}>
                            <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>Welcome</Text>
                            <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>You are the best.</Text>
                        </View>
                        <View style={loginStyle.formStyle}>
                            <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
                                <Image source={require('../imgs/icons/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput 
                                    value={login.username}
                                    placeholder='username' 
                                    style={loginStyle.loginInput} 
                                    onChangeText={(username)=>dispatch(changeLoginAuth({username:username}))} />
                            </View>
                            <View style={loginStyle.formInput}>
                                <Image source={require('../imgs/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
                                <TextInput 
                                    ref="login_psw"  
                                    value={login.password}
                                    style={loginStyle.loginInput} 
                                    secureTextEntry={true}
                                    placeholder='password' 
                                     onChangeText={(password)=>dispatch(changeLoginAuth({password:password}))}  />
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <View style={loginStyle.forget}>
                                <View>
                                    <Image source={require('../imgs/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
                                </View>
                                <View >
                                    <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
                                </View>
                                </View>
                            </View>
                        </View>
                        <View style={loginStyle.btn}>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn1} onPress={this.onLogin}>Log in</Text>
                            </View>
                            <View style={loginStyle.btnWrap}>
                                <Text style={loginStyle.loginBtn2} onPress={this.handleRegister}>Skip</Text>
                            </View>
                        </View>
                    </View>
                    
                    
                </View>
            </Image>
          
    <View>
          <FootballLoadView visible={login.logining} text={'登录中,请稍后...'} />
        </View>
          </View>

    );
  }

  onLogin() {
    const {
      dispatch,
      login
    } = this.props;
    if (login.username === '' || login.password === '') {

      AlertIOS.alert('警告', '请输入正确的信息！')
      return
    }
    dispatch(fetchLogin(login.username, login.password));
  }

  handleRegister() {

  }
}

function mapStateToProps(state) {
  const {
    login
  } = state;
  return {
    login,
  }
}
export default connect(mapStateToProps)(Login);
const styles = StyleSheet.create({
  style_image: {
    borderRadius: 35,
    height: 70,
    width: 70,
    marginTop: 40,
    alignSelf: 'center',
  },
  style_user_input: {
    backgroundColor: '#fff',
    marginTop: 10,
    height: 35,
  },
  style_pwd_input: {
    backgroundColor: '#fff',
    height: 35,
  },
  style_view_commit: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#63B8FF',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  style_view_unlogin: {
    fontSize: 12,
    color: '#63B8FF',
    marginLeft: 10,
  },
  style_view_register: {
    fontSize: 12,
    color: '#63B8FF',
    marginRight: 10,
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
  }

});