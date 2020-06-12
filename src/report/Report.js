import React, { Component } from 'react';
import { Animated, TouchableOpacity, View } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SubmitReport from './SubmitReport'
import History from './History'
import MasterHistory from './MasterHistory'

import firebase from 'firebase/app';
import 'firebase/auth';

const Tab = createMaterialTopTabNavigator()

export default class Report extends Component {

    checkAccess = () => {
        var curruser = firebase.auth().currentUser
        var matric = curruser.displayName
        var curraccess = []
        firebase.database().ref('users/'+ matric).on('value', function(snapshot) {
            curraccess = snapshot.val().cca ? snapshot.val().cca : [];
        })
        return curraccess.includes('JCRC')
    }

    render() {
        return(
            <Tab.Navigator
                tabBarOptions={{

                    labelStyle: { fontSize: 15, lineHeight:0, width: 100, textTransform:'capitalize', fontWeight:'500'},
                    // tabStyle: { width: 140,},
                        //  borderRadius:100, backgroundColor: 'grey',  },
                    // contentContainerStyle: {width: 50},
                    style: {height: 50, justifyContent:'center', alignContent:'center'},
                    // activeTintColor: 'orange'
                    indicatorStyle: {backgroundColor: '#ffae50'},
                    activeTintColor: '#ffae50',
                    inactiveTintColor: 'grey'
                    
        
            }}
            >
                <Tab.Screen name='New Report' component={SubmitReport}/>
                {
                    this.checkAccess() ? 
                    <Tab.Screen name='All Reports' component={MasterHistory}/>
                    :
                    <Tab.Screen name='Past Reports' component={History}/>
                }
            </Tab.Navigator>
        )
    }
}