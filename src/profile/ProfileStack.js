import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import ProfileSubpagesScreen from './ProfileSubpagesStack';

const ProfileStack = createStackNavigator();

export default function ProfileScreen() {
    return (
        <ProfileStack.Navigator> 
            <ProfileStack.Screen 
                name='Profile' 
                component={Profile}
                options={{
                    headerStyle: {
                        backgroundColor: '#ff7d1d',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <ProfileStack.Screen 
                name='Subpages' 
                component={ProfileSubpagesScreen} 
                options={{headerShown: false}}/>
        </ProfileStack.Navigator>

    );
}