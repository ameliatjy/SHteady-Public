import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import ViewMenu from './ViewMenu';
import DonateMeal from './DonateMeal';
import SecondServing from './SecondServing';
import { Button, Image } from 'native-base';
import { Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import Nav from '../OverallNav';

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
