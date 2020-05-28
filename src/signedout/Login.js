import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import Logo from '../components/Logo';

import { loginUser } from '../components/auth';
import { ErrorMsg } from '../components/errormsg';

import firebase from 'firebase/app';
import 'firebase/auth';

const Login = ({ navigation }) => {
    const [matric, setMatric] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onLoginPressed = async () => {
        if (loading) return;

        setLoading(true);

        const response = await loginUser({
            matric: matric.value,
            email: email.value,
            password: password.value
        });

        if (response.error) {
            setError(response.error);
        } else {
            var room = 'room'
            var name = 'name'
            firebase.database().ref('users/' + matric.value).on('value', function (snapshot) {
                room = snapshot.val().room;
                name = snapshot.val().name;
            });
            // navigation.navigate('SignedIn', {
            //     screen: 'Profile',
            //     params: { name: name, matric: matric.value, email: email.value, room: room },
            // })
            // Promise.all([navigation.navigate('SignedIn', {screen : 'Profile'})])
            //     .then(() => navigation.navigate('Profile', {
            //         params: { name: name, matric: matric.value, email: email.value, room: room }
            //     }))
            Promise.all([navigation.navigate('SignedIn', {screen : 'Profile'})])
                .then(() => navigation.navigate('Subpages', {
                    screen: 'EditProfile',
                    params: { name: name, matric: matric.value, email: email.value, room: room }
                }));
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.formCon}>
                <View style={styles.inputBox}>
                    <TextInput style={styles.inputBoxText}
                        placeholder='Matric Number'
                        placeholderTextColor='#000000'
                        onChangeText={text => setMatric({ value: text, error: '' })} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput style={styles.inputBoxText}
                        placeholder='Email Address'
                        placeholderTextColor='#000000'
                        keyboardType='email-address'
                        onChangeText={text => setEmail({ value: text, error: '' })} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput style={styles.inputBoxText}
                        placeholder='Password'
                        secureTextEntry
                        placeholderTextColor='#000000'
                        onChangeText={text => setPassword({ value: text, error: '' })} />
                </View>
                <TouchableOpacity style={styles.button} onPress={onLoginPressed}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Don't have an account yet?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupButton}> Signup</Text>
                </TouchableOpacity>
            </View>
            <ErrorMsg message={error} onDismiss={() => setError("")} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffde7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupTextCont: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 50,
        flexDirection: 'row',
    },
    signupText: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: 18,
    },
    signupButton: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '500',
    },
    formCon: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputBox: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 300,
        height: 40,
        borderRadius: 25,
        marginVertical: 5,
    },
    inputBoxText: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 20,
        color: '#000000',
    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: '#ff7d1d',
        borderRadius: 25,
        marginVertical: 10,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
    },


});