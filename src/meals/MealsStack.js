import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MealsSubpagesScreen from './MealsSubpagesStack';
import Meals from './Meals';

const MealStack = createStackNavigator();

export default function MealStackScreen() {
    return (
        <MealStack.Navigator>
            <MealStack.Screen 
                name='Meals' 
                component={Meals}
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
            <MealStack.Screen name='Subpages' component={MealsSubpagesScreen} options={{headerShown: false}}/>
        </MealStack.Navigator>
    );
}