import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

import Circle from 'react-native-vector-icons/FontAwesome'

export const StatusButton = ({ type }) => (
    <View style={styles.container}>
        <Circle name="circle" size={38}
            style={{
                opacity:0.8,
                color: type === 'yo hmu i am in' ? '#39ff14'
                    : type === 'i am out of hall' ? '#ff0000'
                        : '#fed000'
            }} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})