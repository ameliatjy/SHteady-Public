import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase/app';

const checkReport = (placeText, problemText) => {
    return placeText != '' && problemText != ''
}

const failedCheckReport = () => {
    Alert.alert(
        'Fault Report Submission',
        'Please ensure that all required fields have been filled in.'
    )
}

const successfulCheckReport = (placeText, problemText, addText) => {
    submitReport(placeText, problemText, addText)
}

const submitReport = (placeText, problemText, addText) => {
    Alert.alert(
        'Fault Report Submission',
        'Please confirm the submission of the fault report.\n' + 
        'Place: ' + placeText + '\n' + 
        'Problem: ' + problemText + '\n' + 
        'Additional Details: ' + addText,
        [
            {text: 'Cancel', onPress: () => console.warn('Cancel Pressed'), style: 'cancel'},
            {text: 'Confirm', onPress: () => confirmedReport(placeText, problemText, addText), style: 'default'},
        ]
    );
}

const confirmedReport = (placeText, problemText, addText) => {
    firebase.database().ref('report/' + placeText).set({
        location: placeText,
        problem: problemText,
        otherDetails: addText})
    
}

export default class Report extends Component {

    state = {
        placeText: '',
        problemText: '',
        addText: '',
        myPlaceText: React.createRef(),
        myProblemText: React.createRef(),
        myAddText: React.createRef(),
    }

    resetAllFields() {
        this.state.myPlaceText.current.clear()
        this.state.myProblemText.current.clear()
        this.state.myAddText.current.clear()
        this.setState({placeText:''})
        this.setState({problemText:''})
        this.setState({addText:''})
    }

    button() {
        Keyboard.dismiss()
        if (checkReport(this.state.placeText, this.state.problemText)) {
            successfulCheckReport(this.state.placeText, this.state.problemText, this.state.addText)
            this.resetAllFields()
        } else {
            failedCheckReport()
            setTimeout(() => {
                this.resetAllFields()
            }, 20000);
        }
    }

    render() {
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Text style={styles.question}>There is something wrong at ... *</Text>
                    <View style={styles.inputConShort}>
                        <TextInput 
                            ref={this.state.myPlaceText}
                            style={styles.inputShort}
                            placeholder='Where? Block? Level?'
                            placeholderTextColor='rgba(0,0,0,0.6)'
                            multiline
                            onChangeText={(inputText) => this.setState({placeText: inputText})}/>
                    </View>
                        
                    <Text style={styles.question}>There is something wrong with ... *</Text>
                    <View style={styles.inputConLong}>
                        <TextInput
                            ref={this.state.myProblemText}
                            style={styles.inputLong}
                            placeholder='What?'
                            placeholderTextColor='rgba(0,0,0,0.6)'
                            multiline
                            onChangeText={(inputText) => this.setState({problemText: inputText})}/>
                    </View>    

                    <Text style={styles.question}>Any other details to add ...</Text>
                    <View style={styles.inputConLong}>
                        <TextInput
                            ref={this.state.myAddText}
                            style={styles.inputLong}
                            placeholder='hhddbosnovjdfpmv'
                            placeholderTextColor='rgba(0,0,0,0.6)'
                            multiline
                            onChangeText={(inputText) => this.setState({addText: inputText})}/>
                    </View>

                    <Text style={styles.requiredField}>Required field *</Text>

                    <TouchableOpacity style={styles.button} onPress={() => this.button()}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback> 
            
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
    inputConLong : {
        height: 110,
        width: 380,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginVertical: 5,
        alignSelf: 'center',
        paddingVertical: 5,
        justifyContent: 'flex-start'
    },
    inputLong : {
        height: 100,
        width: 380,
        borderRadius: 10,
        paddingHorizontal: 16,
        alignSelf: 'center',
        fontSize: 17,
        color: '#000000',
    },
    inputConShort : {
        height: 50,
        width: 380,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginVertical: 5,
        alignSelf: 'center',
        paddingVertical: 5,
        justifyContent: 'flex-start'
    },
    inputShort : {
        height: 40,
        width: 380,
        borderRadius: 10,
        paddingHorizontal: 16,
        alignSelf: 'center',
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
})