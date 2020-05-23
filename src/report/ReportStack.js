import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Report from './Report'

const ReportStack = createStackNavigator();

export default function ReportStackScreen() {
    return (
        <ReportStack.Navigator>
            <ReportStack.Screen 
                name="Report" 
                component={Report} 
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
        </ReportStack.Navigator>
    )
}