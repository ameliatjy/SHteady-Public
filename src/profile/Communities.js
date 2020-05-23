import React, { Component, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Arrow from 'react-native-vector-icons/AntDesign';

export default class Communities extends Component {
    state = {
        groups: [
            {
                id: 0,
                name: 'SH Volleyball',
            },
            {
                id: 1,
                name: 'Block A',
            },
            {
                id: 2,
                name: 'Sports Management Board',
            }
        ]
    }

    goToCommunity = () => {
        Alert.alert('Going to check members of this community');
    }

    render() {
        return(
            <View>
                {
                    this.state.groups.map((item, index) => (
                        <TouchableOpacity
                            key = {item.id}
                            style = {styles.container}
                            onPress = {this.goToCommunity}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.text}>
                                        {item.name}
                                    </Text>
                                    <Arrow name="right" size={20} style={{flex: 1, alignSelf:"flex-end"}}/>
                                </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
      backgroundColor: '#fff',
      alignItems: 'flex-start'
    },
    text: {
        color: '#808080',
        flex: 12
    }
  });