import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

export default class SecondServing extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>The number of available meals for redemption today are: ...</Text>
                <Text>Are you sure you'd like to redeem a second meal?</Text>
                <Button title="yes redeem"/>
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