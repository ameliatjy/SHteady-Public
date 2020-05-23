import React, { Component } from 'react';

import Signup from './Signup';
import Login from './Login';

import { createStackNavigator } from '@react-navigation/stack';

const SignedOutStack = createStackNavigator();

export default function SignedOutStackScreen() {
    return (
        <SignedOutStack.Navigator
            screenOptions={{
                headerShown:false,
            }}
        >
            <SignedOutStack.Screen name='Login' component={Login}/>
            <SignedOutStack.Screen name='Signup' component={Signup}/>
        </SignedOutStack.Navigator>
    )
}
