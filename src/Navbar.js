//split this file when the time comes :))

import React, { Component } from 'react';

import IconAnt from 'react-native-vector-icons/AntDesign';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

import DashboardStackScreen from './dashboard/DashboardStack'
import MealsStackScreen from './meals/MealsStack'
import AnnouncementsStackScreen from './announcements/AnnouncementsStack'
import ReportStackScreen from './report/ReportStack'
import ProfileStackScreen from './profile/ProfileStack'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';



// const DashboardStack = createStackNavigator();

// function DashboardStackScreen() {
//     return (
//         <DashboardStack.Navigator>
//             <DashboardStack.Screen 
//                 name="Dashboard" 
//                 component={Dashboard}
//                 options={{
//                     headerStyle: {
//                         backgroundColor: '#ff7d1d',
//                     },
//                     headerTintColor: '#fff',
//                     headerTitleStyle: {
//                         fontWeight: 'bold',
//                     },
//                 }}
//             />
//         </DashboardStack.Navigator>
//     )
// }

// const MealsStack = createStackNavigator();

// function MealsStackScreen() {
//     return (
//         <MealsStack.Navigator>
//             <MealsStack.Screen 
//                 name="Meals" 
//                 component={MealStackScreen}
//                 options={{
//                     headerStyle: {
//                         backgroundColor: '#ff7d1d',
//                     },
//                     headerTintColor: '#fff',
//                     headerTitleStyle: {
//                         fontWeight: 'bold',
//                     },
//                 }}
//             />
//         </MealsStack.Navigator>
//     )
// }

// const AnnouncementsStack = createStackNavigator();

// function AnnouncementsStackScreen() {
//     return (
//         <AnnouncementsStack.Navigator>
//             <AnnouncementsStack.Screen 
//                 name="Announcements" 
//                 component={Announcements}
//                 options={{
//                     headerStyle: {
//                         backgroundColor: '#ff7d1d',
//                     },
//                     headerTintColor: '#fff',
//                     headerTitleStyle: {
//                         fontWeight: 'bold',
//                     },
//                 }}
//             />
//         </AnnouncementsStack.Navigator>
//     )
// }

// const ReportStack = createStackNavigator();

// function ReportStackScreen() {
//     return (
//         <ReportStack.Navigator>
//             <ReportStack.Screen 
//                 name="Report" 
//                 component={Report} 
//                 options={{
//                     headerStyle: {
//                         backgroundColor: '#ff7d1d',
//                     },
//                     headerTintColor: '#fff',
//                     headerTitleStyle: {
//                         fontWeight: 'bold',
//                     },
//                 }}
//             />
//         </ReportStack.Navigator>
//     )
// }

// const AccountStack = createStackNavigator();

// function AccountStackScreen() {
//     return (
//         <AccountStack.Navigator>
//             <AccountStack.Screen 
//                 name="Account" 
//                 component={ProfileScreen}
//                 options={{
//                     headerStyle: {
//                         backgroundColor: '#ff7d1d',
//                     },
//                     headerTintColor: '#fff',
//                     headerTitleStyle: {
//                         fontWeight: 'bold',
//                     },
//                 }}
//             />
//         </AccountStack.Navigator>
//     )
// }

const Tab = createBottomTabNavigator();

export default class Navbar extends Component {
    render() {
      return (
            <Tab.Navigator
                initialRouteName='Dashboard'
                tabBarOptions={{
                    activeTintColor: '#ff7d1d',
                    inactiveTintColor: '#9e9e9e',
                }}
            >
                <Tab.Screen 
                    name="Dashboard" 
                    component={DashboardStackScreen} 
                    options={{ 
                        tabBarLabel: 'Dashboard',
                        tabBarIcon: ({ color }) => (
                            <IconAnt name={'profile'} size={27} color={color}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Meals" 
                    component={MealsStackScreen}
                    options={{ 
                        tabBarLabel: 'Meals',
                        tabBarIcon: ({ color }) => (
                            <IconMCI name={'silverware-variant'} color={color} size={32}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Announcements" 
                    component={AnnouncementsStackScreen}
                    options={{ 
                        tabBarLabel: 'Announcements',
                        tabBarIcon: ({ color }) => (
                            <IconAnt name={'notification'} color={color} size={29}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Report" 
                    component={ReportStackScreen}
                    options={{ 
                        tabBarLabel: 'Report',
                        tabBarIcon: ({ color }) => (
                            <IconSLI name={'wrench'} color={color} size={26}/>
                        )
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileStackScreen}
                    options={{ 
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <IconAnt name={'user'} color={color} size={29}/>
                        )
                    }}
                />
            </Tab.Navigator>
      );
    }
  }

