import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';
import { ThemeProvider } from 'react-native-paper';

let unsubscribe;

export default class Status extends Component {

    state = {
        matric: null,
        avail: null
    }

    getDeets = () => {
        let self = this;
        firebase.auth().onAuthStateChanged(function (user) {
            console.log('status chunk')
            if (user) {
                self.setState({ matric: user.displayName })
                firebase.database().ref('users/').child(user.displayName).on('value', function (snapshot) {
                    self.setState({ avail: snapshot.val().status })
                    while (self.state.matric == null || self.state.avail == null) {
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

        console.log("status pg matric", this.state.matric);

        const updateDatabase = (newStatus) => {
            console.log("updatedatabase method called");
            firebase.database().ref('users/' + this.state.matric).child('status').set(newStatus);
        }

        const updatedStatus = () => {
            Alert.alert(
                'Status Update',
                'Your status has been successfully updated!',
                [
                    {
                        text: 'Nice!',
                        onPress: () => {
                            updateDatabase(this.state.avail);
                            this.props.navigation.navigate('Profile');
                        }
                    },
                ],
                {cancelable: false}
            );
            Keyboard.dismiss();
        }

        const optionsOnPress = (newStatus) => {
            console.log("newStatus", newStatus);
            this.state.avail = newStatus;
            updateDatabase(newStatus);
            this.props.navigation.navigate('Profile');
        }

        const options = {
            availability: [
                {
                    id: 0,
                    avail: 'yo hmu i am in',
                },
                {
                    id: 1,
                    avail: 'i am out of hall',
                },
                {
                    id: 2,
                    avail: 'busy... do not find me',
                }
            ]
        }

        return(
            <View>
                {
                    options.availability.map((item, index) => (
                        <TouchableOpacity
                            key = {item.avail}
                            style = {styles.container}
                            onPress = {() => optionsOnPress(item.avail)}>
                                <Text style={styles.text}>
                                    {item.avail}
                                </Text>
                        </TouchableOpacity>
                    ))
                }
                    <TextInput
                        style={{height:58, marginTop: 10, backgroundColor: 'white'}}
                        multiline={true}
                        placeholder="Customise your status here!"
                        onChangeText={newStatus => {this.state.avail = newStatus}}
                        onSubmitEditing={updatedStatus}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    text: {
        color: '#808080'
    }
  });