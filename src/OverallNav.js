import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignedOutStackScreen from './signedout/SignedOutStack'
import Navbar from './Navbar';

const FinalStack = createStackNavigator();

export default class OverallNav extends Component {

    render() {
        return (
            <NavigationContainer>
                <FinalStack.Navigator
                    screenOptions={{
                        headerShown:false,
                        gestureEnabled: false,
                    }}>
                    <FinalStack.Screen name='SignedOut' component={SignedOutStackScreen}/>
                    <FinalStack.Screen name='SignedIn' component={Navbar}/>
                    
                </FinalStack.Navigator>
            </NavigationContainer>
        )
    
    }
}