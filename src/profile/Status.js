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
import Circle from 'react-native-vector-icons/FontAwesome'

let unsubscribe;

export default class Status extends Component {

    state = {
        matric: null,
        avail: null
    }

    getDeets = () => {
        let self = this;
        unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            console.log('status chunk')
            if (user) {
                self.setState({ matric: user.displayName })
                firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/').child(user.displayName).on('value', function (snapshot) {
                    self.setState({ avail: snapshot.val().status })
                    while (self.state.matric == null || self.state.avail == null) {
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
    
    componentWillUnmount() {
        unsubscribe()
    }

    render() {

        console.log("status pg matric", this.state.matric);

        const updateDatabase = (newStatus) => {
            console.log("updatedatabase method called");
            firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + this.state.matric).child('status').set(newStatus);
        }

        // const updatedStatus = () => {
        //     Alert.alert(
        //         'Status Update',
        //         'Your status has been successfully updated!',
        //         [
        //             {
        //                 text: 'Nice!',
        //                 onPress: () => {
        //                     updateDatabase(this.state.avail);
        //                     this.props.navigation.navigate('Profile');
        //                 }
        //             },
        //         ],
        //         {cancelable: false}
        //     );
        //     Keyboard.dismiss();
        // }

        const optionsOnPress = (newStatus) => {
            console.log("newStatus", newStatus);
            this.state.avail = newStatus;
            updateDatabase(newStatus);
            this.props.navigation.navigate('Profile');
        }

        return (
            <View>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => optionsOnPress('yo hmu i am in')}>
                    <View style={styles.optionsrow} >
                        <Text style={styles.text}>
                            yo hmu i am in
                        </Text>
                        <Circle name="circle" size={40} style={styles.availablecircle} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => optionsOnPress('i am out of hall')}>
                    <View style={styles.optionsrow} >
                        <Text style={styles.text}>
                            i am out of hall
                        </Text>
                        <Circle name="circle" size={40} style={styles.outcircle} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => optionsOnPress('busy... do not find me')}>
                    <View style={styles.optionsrow} >
                        <Text style={styles.text}>
                            busy... do not find me
                        </Text>
                        <Circle name="circle" size={40} style={styles.busycircle} />
                    </View>
                </TouchableOpacity>

                {/* customise status */}
                {/* <TextInput
                        style={{height:58, marginTop: 10, backgroundColor: 'white'}}
                        multiline={true}
                        placeholder="Customise your status here!"
                        onChangeText={newStatus => {this.state.avail = newStatus}}
                        onSubmitEditing={updatedStatus}/> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        color: '#808080',
        justifyContent: 'flex-start',
        flex: 5,
        fontSize: 15,
        padding: 10
    },
    optionsrow: {
        flexDirection: 'row',
        marginLeft: 15
    },
    availablecircle: {
        color: '#39ff14',
        justifyContent: 'flex-end',
        flex: 1
    },
    outcircle: {
        color: '#ff0000',
        justifyContent: 'flex-end',
        flex: 1
    },
    busycircle: {
        color: '#fed000',
        justifyContent: 'flex-end',
        flex: 1
    }
});