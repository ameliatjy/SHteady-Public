import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default class Account extends Component {
    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignedOut')}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    button : {
        width: 300,
        height: 40,
        backgroundColor: '#ff7d1d',
        borderRadius: 25,
        marginVertical: 10,
        justifyContent: 'center',
        alignSelf:'center',
    },
    buttonText : {
        fontSize: 20,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
    },
});