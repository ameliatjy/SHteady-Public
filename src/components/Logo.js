import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Image style={{width: 414, height: 200}}
                    source={require('../images/6.png')}/>
                <Text style={styles.logoText}>Hey there, Shearite!</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoText : {
        marginVertical: 15,
        fontSize: 25,
    }
});