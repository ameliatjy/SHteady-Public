import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from './EditProfile';
import Status from './Status';
import Communities from './Communities';


const ProfileSubpagesStack = createStackNavigator();

export default function ProfileSubpagesScreen() {
    return (
        <ProfileSubpagesStack.Navigator> 
            <ProfileSubpagesStack.Screen 
                name='EditProfile' 
                component={EditProfile}
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
            <ProfileSubpagesStack.Screen 
                name='Status' 
                component={Status}
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
            <ProfileSubpagesStack.Screen 
                name='Communities' 
                component={Communities}
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
        </ProfileSubpagesStack.Navigator>
    );
}

