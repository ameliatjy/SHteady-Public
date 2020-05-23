import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

export default class DonateMeal extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Are you sure you'd like to donate your meal?</Text>
                <Button title="yes"/>
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