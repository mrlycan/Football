'use strict';
import React, {Navigator} from 'react-native';

import LoginPage from '../App/pages/login';
import MainPage from '../App/pages/HomePage'


const sceneConfig =require('./sceneConfig');

const customFloatFromRight=sceneConfig.customFloatFromRight;

class Router{
    constructor(navigator){
        this.navigator=navigator
    }
    
    push(prop,route)
    {
        
        let routesList = this.navigator.getCurrentRoutes()
        let nextIndex = routesList[routesList.length - 1].index + 1
        route.props = props
        route.index = nextIndex
        this.navigator.push(route)
    }
    
    
    pop() {
        this.navigator.pop()
    }
    
    toLogin(props){
        this.push(props, {
            page: LoginPage,
            name: 'login-page',
            sceneConfig: customFloatFromRight
        })
    }
    
    toMain(props)
    {
        
        this.push(props,{
            page:MainPage,
            name:'main-page',
            sceneConfig:customFloatFromRight
        })
    }
    
    
    replaceWithHome() {
        this.navigator.popToTop()
    }

    resetToLogin(){
        this.navigator.resetTo({
            name: 'login-page',
            page: LoginPage,
            //sceneConfig: customFloatFromRight,
        })
    }

}


module.exports = Router