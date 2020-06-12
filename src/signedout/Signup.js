import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import Logo from '../components/Logo';

import { signUpUser } from '../components/auth';
import { ErrorMsg } from '../components/errormsg';
import { NavigationActions } from 'react-navigation';
import { Snackbar } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";

import firebase from 'firebase/app';
import 'firebase/auth';

const Signup = ({ navigation }) => {
    const [name, setName] = useState({ value: "", error: "" });
    const [matric, setMatric] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: " " })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const onSignUpPressed = async () => {
        if (loading) return;

        setLoading(true);

        const response = await signUpUser({
            name: name.value,
            matric: matric.value,
            email: matric.value + '@u.nus.edu',
            password: password.value,
            confirmPassword: confirmPassword.value
        });

        if (response.error) {
            setError(response.error);
        } else {
            setSuccess(true);
            setTimeout(() => navigation.navigate('SignedOut', {screen: 'Login'}), 1500)
        }

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.formCon}>
                <View style={styles.inputBox}>
                    <TextInput style={styles.inputBoxText}
                        placeholder='Full Name'
                        onChangeText={text => setName({ value: text, error: '' })}
                        placeholderTextColor='#000000'
                        autoCapitalize="words"
                        error={!!name.error}
                        errorText={name.error}
                        value={name.value} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput style={styles.inputBoxText}
                        placeholder='Matriculation Number'
                        onChangeText={text => setMatric({ value: text, error: '' })}
                        placeholderTextColor='#000000'
                        autoCapitalize="words"
                        error={!!matric.error}
                        errorText={matric.error}
                        value={matric.value} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput style={styles.inputBoxText}
                        placeholder='Password'
                        secureTextEntry
                        placeholderTextColor='#000000'
                        error={!!password.error}
                        errorText={password.error}
                        value={password.value}
                        onChangeText={text => setPassword({ value: text, error: '' })} />
                </View>
                <View style={styles.inputBox}>
                    <TextInput style={styles.inputBoxText}
                        placeholder='Confirm Password'
                        secureTextEntry
                        placeholderTextColor='#000000'
                        error={!!confirmPassword.error}
                        errorText={confirmPassword.error}
                        value={confirmPassword.value}
                        onChangeText={text => setConfirmPassword({ value: text, error: '' })} />
                </View>
                <TouchableOpacity style={styles.button} loading={loading} mode='contained' onPress={
                    onSignUpPressed}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignedOut', {screen: 'Login'})}>
                    <Text style={styles.signupButton}> Sign in</Text>
                </TouchableOpacity>
            </View>

            <ErrorMsg message={error} onDismiss={() => setError("")} />

            <View style={{position: 'absolute', top: 80 + getStatusBarHeight(), width: '100%'}}>
                <Snackbar
                    visible={success}
                    duration={1500}
                    onDismiss={() => setSuccess(false)}
                    style={{ backgroundColor: '#00B386' }}>
                    <Text>Account created! Do login to continue.</Text>
                </Snackbar>
            </View>
        </View>
    )
}


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

export default Signup;