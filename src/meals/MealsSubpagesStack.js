import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ViewMenu from './ViewMenu';
import DonateMeal from './DonateMeal';
import SecondServing from './SecondServing';

const MealsSubpagesStack = createStackNavigator();

export default function MealsSubpagesScreen() {
    return (
        <MealsSubpagesStack.Navigator> 
            <MealsSubpagesStack.Screen 
                name='Menu' 
                component={ViewMenu}
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
            <MealsSubpagesStack.Screen 
                name='Donate' 
                component={DonateMeal}
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
            <MealsSubpagesStack.Screen 
                name='Redeem' 
                component={SecondServing}
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
        </MealsSubpagesStack.Navigator>

    );
}
