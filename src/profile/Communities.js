import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Arrow from 'react-native-vector-icons/AntDesign';

import firebase from 'firebase/app';
import 'firebase/auth';

let unsubscribe;

export default class Communities extends Component {

    state = {
        groups: []
    }

    goToCommunity = () => {
        Alert.alert('Going to check members of this community');
    }

    componentDidMount() {
        let self = this;
        unsubscribe = firebase.auth().onAuthStateChanged(async function (user) {
            console.log('Communities chunk')
            if (user) {
                await self.setState({ matric: user.displayName })
                await firebase.database().ref('users/').child(user.displayName).on('value', async function (snapshot) {
                    var grps = await snapshot.val().cca
                    typeof grps === 'undefined'
                    ? await self.setState({ groups: [] })
                    : await self.setState({ groups: snapshot.val().cca })
                })
            } else {
                console.log('user not signed in')
            }
        })
    }

    componentWillUnmount() {
        unsubscribe()
    }

    render() {
        return(
            <View>
                {
                    this.state.groups.map((item, index) => (
                        <TouchableOpacity
                            key = {index}
                            style = {styles.container}
                            onPress = {this.goToCommunity}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.text}>
                                        {item}
                                    </Text>
                                    <Arrow name="right" size={20} style={{flex: 1, alignSelf:"flex-end"}}/>
                                </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
      backgroundColor: '#fff',
      alignItems: 'flex-start'
    },
    text: {
        color: '#808080',
        flex: 12
    }
  });