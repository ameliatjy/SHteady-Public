import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Announcements from './Announcements'

const AnnouncementsStack = createStackNavigator();

export default function AnnouncementsStackScreen() {
    return (
        <AnnouncementsStack.Navigator>
            <AnnouncementsStack.Screen 
                name="Announcements" 
                component={Announcements}
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
        </AnnouncementsStack.Navigator>
    )
}