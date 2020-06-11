import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

export default class DonateMeal extends Component {

    confirmdonate = () => {
        var user = firebase.auth().currentUser;

        var matric = user.displayName
        var availcredits
        firebase.database().ref('users/'+ matric).on('value', function(snapshot) {
            availcredits = snapshot.val().mealcredit;
        })

        firebase.database().ref('users/' + matric).child('mealcredit').set(availcredits-1)

        Alert.alert(
            "Successful",
            "Meal credit donated!",
            [
                {
                    text: "Ok"
                }
            ]
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Are you sure you'd like to donate your meal?</Text>
                <TouchableOpacity onPress={this.confirmdonate}>
                    <Text>Yes</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });