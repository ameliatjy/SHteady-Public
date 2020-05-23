import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import Logo from '../components/Logo';


export default class Login extends Component {

    render() {
        return(
            <View style={styles.container}>
                <Logo/>
                <View style={styles.formCon}>
                    <View style={styles.inputBox}>
                        <TextInput style={styles.inputBoxText} 
                            placeholder='Matric Number'
                            placeholderTextColor='#000000'/>
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput style={styles.inputBoxText} 
                            placeholder='Password'
                            secureTextEntry
                            placeholderTextColor='#000000'/>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignedIn')}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.signupButton}> Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#fffde7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupTextCont : {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 50,
        flexDirection: 'row',
    },
    signupText : {
        color: 'rgba(0,0,0,0.8)',
        fontSize: 18,
    },
    signupButton : {
        color: '#000000',
        fontSize: 18,
        fontWeight: '500',
    },
    formCon : {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputBox : {
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 300,
        height: 40,
        borderRadius: 25,
        marginVertical: 5,
    },
    inputBoxText : {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 20,
        color: '#000000',
    },
    button : {
        width: 300,
        height: 40,
        backgroundColor: '#ff7d1d',
        borderRadius: 25,
        marginVertical: 10,
        justifyContent: 'center',
    },
    buttonText : {
        fontSize: 20,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
    },


  });