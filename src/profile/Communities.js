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

import Accordion from 'react-native-collapsible/Accordion';

export default class Communities extends Component {

    state = {
        groups: [],
        activeSections: []
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
                        setTimeout(function () { }, 3000);
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

    _renderSectionTitle = section => {
        return (
            <View style={styles.container}>
                <Text>{section}</Text>
            </View>
        );
    };

    _renderHeader = () => {
        return (
            <View style={styles.viewmembersBtn}>
                <Text style={styles.viewmembersWord}>Click to view members</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.membersDisplay}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <Accordion
                sections={this.state.groups}
                activeSections={this.state.activeSections}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}

// <Arrow name="right" size={20} style={{flex: 1, alignSelf:"flex-end"}}/>


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'flex-start'
    },
    text: {
        color: '#808080',
        flex: 12
    },
    viewmembersBtn: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 20,
        paddingTop: 10
    },
    viewmembersWord: {
        color: '#bdbdbd'
    },
    membersDisplay: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingBottom: 20,
    }
});