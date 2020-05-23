import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './Dashboard'

const DashboardStack = createStackNavigator();

export default function DashboardStackScreen() {
    return (
        <DashboardStack.Navigator>
            <DashboardStack.Screen 
                name="Dashboard" 
                component={Dashboard}
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
        </DashboardStack.Navigator>
    )
}