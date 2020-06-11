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

export default class SecondServing extends Component {

    confirmredeem = () => {
        var user = firebase.auth().currentUser;

        var matric = user.displayName
        var availcredits
        firebase.database().ref('users/'+ matric).on('value', function(snapshot) {
            availcredits = snapshot.val().mealcredit;
        })

        firebase.database().ref('users/' + matric).child('mealcredit').set(availcredits+1)

        Alert.alert(
            "Successful",
            "You have redeemed a meal from ...!",
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
                <Text>The number of available meals for redemption today are: ...</Text>
                <Text>Are you sure you'd like to redeem a second meal?</Text>
                <TouchableOpacity onPress={this.confirmredeem}>
                    <Text>yes</Text>
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