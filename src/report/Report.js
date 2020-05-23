import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';



export default class Report extends Component {

    button() {
        Alert.alert(
            'Fault Report Submission',
            'Please confirm the submission of the fault report.',
            [
                {text: 'CONFIRM', onPress: () => console.warn('CONFIRM Pressed'), style: 'destructive'},
                {text: 'CANCEL', onPress: () => console.warn('CANCEL Pressed'), style: 'destructive'},
            ]
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.question}>There is something wrong at ... *</Text>
                    <View style={styles.inputShort}>
                        <TextInput 
                            style={styles.inputFont}
                            placeholder='Where? Block? Level?'
                            placeholderTextColor='rgba(0,0,0,0.6)'/>
                    </View>
                    <Text style={styles.question}>There is something wrong with ... *</Text>
                    <View style={styles.inputLong}>  
                        <TextInput
                            style={styles.inputFont}
                            placeholder='What?'
                            placeholderTextColor='rgba(0,0,0,0.6)'/>
                    </View>
                    <Text style={styles.question}>Any other details to add ...</Text>
                    <View style={styles.inputLong}>    
                        <TextInput
                            style={styles.inputFont}
                            placeholder='hhddbosnovjdfpmv'
                            placeholderTextColor='rgba(0,0,0,0.6)'/>
                    </View>
                    <Text style={styles.requiredField}>Required field *</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.button()}>
                        {/* can add in a confirmation alert if want */}
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    question : {
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 18,
    },
    requiredField : {
        paddingTop: 15,
        paddingLeft: 20,
        color: '#ab000d',
        fontSize: 16,
    },
    inputLong : {
        height: 100,
        width: 380,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginVertical: 5,
        alignSelf: 'center',
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    inputShort : {
        height: 40,
        width: 380,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginVertical: 5,
        alignSelf: 'center',
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    inputFont : {
        fontSize: 17,
        color: '#000000',
    },
    button : {
        width: 300,
        height: 40,
        backgroundColor: '#ff7d1d',
        borderRadius: 25,
        marginVertical: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText : {
        fontSize: 20,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center',
    },
    navBarCon : {
        flex: 1,
        flexDirection: 'column-reverse',
    }
})