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

export default class Communities extends Component {

    state = {
        groups: []
    }

    goToCommunity = () => {
        Alert.alert('Going to check members of this community');
    }

    getDeets = () => {
        let self = this;
        firebase.auth().onAuthStateChanged(function (user) {
            console.log('Communities chunk')
            if (user) {
                self.setState({ matric: user.displayName })
                firebase.database().ref('users/').child(user.displayName).on('value', function (snapshot) {
                    var grps = snapshot.val().cca
                    typeof grps === 'undefined'
                    ? self.setState({ groups: [] })
                    : self.setState({ groups: snapshot.val().cca })
                    while (self.state.matric == null || self.state.groups == null) {
                        setTimeout(function() {}, 3000);
                    }
                })
            } else {
                console.log('user not signed in')
            }
        })
    }

    componentDidMount() {
        this.getDeets();
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