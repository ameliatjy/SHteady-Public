import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
import Icon from'react-native-vector-icons/FontAwesome';
// import moment from 'moment';

import firebase from 'firebase/app';
import 'firebase/auth';

// var user = firebase.auth().currentUser;
// if (user) {
//     var matric = user.displayName
//     var currroom, currname
//     firebase.database().ref('users/'+ matric).on('value', function(snapshot) {
//         currroom = snapshot.val().room;
//         currname = snapshot.val().name;
//         })
// } else {

// }

// var query = firebase.database().ref("dashboard").orderByKey();
// query.once("value")
//     .then(function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//             var childKey = childSnapshot.key;
//             var childName = childSnapshot.val().name;
//             var childRoom = childSnapshot.val().room;
//             var childTask = childSnapshot.val().task;
//             var childIsInProgress = childSnapshot.val().childIsInProgress;
//     });
// });

export default class DashBoard extends Component {

    state = {
        // names: [
        //    {'name': 'Ben', 'id': 1, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Susan', 'id': 2, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Robert', 'id': 3, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Mary', 'id': 4, 'task': 'close my windows', 'isInProgress': false},
        //    {'name': 'Daniel', 'id': 5, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Laura', 'id': 6, 'task': 'close my windows', 'isInProgress': false},
        //    {'name': 'John', 'id': 7, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Debra', 'id': 8, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Aron', 'id': 9, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Ann', 'id': 10, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Steve', 'id': 11, 'task': 'close my windows', 'isInProgress': true},
        //    {'name': 'Olivia', 'id': 12, 'task': 'close my windows', 'isInProgress': true}
        // ],
        dabaoDialogVisible: false,
        groceriesDialogVisible: false,
        othersDialogVisible: false,
        datetimePickerVisibility: false,
    }


    oneTimeTaskConfirmation = (currtask) => {
        var user = firebase.auth().currentUser;
        // if (user) {
            var matric = user.displayName
            var currroom, currname
            firebase.database().ref('users/'+ matric).on('value', function(snapshot) {
                currroom = snapshot.val().room;
                currname = snapshot.val().name;
                })
        // } else {

        // }
        var newRequest = firebase.database().ref('dashboard/').push();
        newRequest.set({
            name: currname,
            room: currroom,
            task: currtask,
            isInProgress: false
        })
        // delete tasks after a period of time
        // setTimeout(() => {
            
        // }, timeout);
    }

    closeMyWindowsButton() {
        Alert.alert(
            'Send Help Please!',
            'Please help me close my windows!!!',
            [
                {text: 'Cancel', onPress: () => console.warn('CANCEL Pressed'), style: 'cancel'},
                {text: 'Confirm', onPress: () => this.oneTimeTaskConfirmation('close my windows'), style: 'default'},
            ]
        );
    }

    dabaoShowDialog = () => {
        this.setState({ dabaoDialogVisible: true });
    }
     
    dabaoHandleConfirm = () => {
        this.setState({ dabaoDialogVisible: false });
    }
     
    dabaoHandleClose = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dabaoDialogVisible: false });
    }

    showDatetimePicker = () => {
        this.setState({datetimePickerVisibility: true});
    }
     
    hideDatetimePicker = () => {
        this.setState({datetimePickerVisibility: false});
    }
     
    wakeupHandleConfirm = (datetime) => {
        this.oneTimeTaskConfirmation('Please wake me up: ' + datetime)
        this.hideDatetimePicker();
    }

    hideAirconButton() {
        Alert.alert(
            'Send Help Please!',
            'Halim coming!!! Help me hide my aircon PLEASE!!!',
            [
                {text: 'Cancel', onPress: () => console.warn('CANCEL Pressed'), style: 'cancel'},
                {text: 'Confirm', onPress: () => this.oneTimeTaskConfirmation('hide my aircon'), style: 'default'},
            ]
        );
    }

    groceriesShowDialog = () => {
        this.setState({ groceriesDialogVisible: true });
    }
     
    groceriesHandleConfirm = () => {
        this.setState({ groceriesDialogVisible: false });
    }
     
    groceriesHandleClose = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ groceriesDialogVisible: false });
    }

    othersShowDialog = () => {
        this.setState({ othersDialogVisible: true });
    }
     
    othersHandleConfirm = () => {
        this.setState({ othersDialogVisible: false });
    }
     
    othersHandleClose = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ othersDialogVisible: false });
    }

    checkTaskProgress = (isInProgress) => {
        if (isInProgress) {
            return {color: '#ff7d1d'}
        } else {
            return {color: '#d10a0a'};
        }
    }

    helpWithTaskButton = (isInProgress) => {
        if (isInProgress) {
            Alert.alert(
                'Help On The Way!',
                'Thank you for offering your help!\n' +
                'Please confirm that the task has been completed!',
                [
                    {text: 'Cancel', onPress: () => console.warn('CANCEL Pressed'), style: 'cancel'},
                    {text: 'Confirm', onPress: () => console.warn('CONFIRM Pressed'), style: 'default'},
                ]
                // onpress(confirm) delete the task
            );
        } else {
            Alert.alert(
                'Help Needed!!!',
                'Task: ' + item.task + '\n' + 'Room Number: ' + item.id,
                [
                    {text: 'Cancel', onPress: () => console.warn('CANCEL Pressed'), style: 'cancel'},
                    {text: 'Confirm', onPress: () => console.warn('CONFIRM Pressed'), style: 'default'},
                ]
                // onpress(confirm) change task taskinprogress:true
            );
        }
    }

    // HOW HOW HOW WHAT THE HECK EVEN I WANT TO CRY
    getDashboard = () => {
        var query = firebase.database().ref("dashboard").orderByKey();
        var childKey, childName, childRoom, childTask, childIsInProgress
        query.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    this.childKey = childSnapshot.key;
                    this.childName = childSnapshot.val().name;
                    this.childRoom = childSnapshot.val().room;
                    this.childTask = childSnapshot.val().task;
                    this.childIsInProgress = childSnapshot.val().childIsInProgress;
                });
            });
        // if (data == 'key') {
        //     return childKey
        // } else if (data == 'name') {
        //     return childName
        // } else if (data == 'room') {
        //     return childRoom
        // } else if (data == 'task') {
        //     return childTask
        // } else if (data == 'isInProgress') {
        //     return childIsInProgress
        // } else {

        // }
    }

    render() {
        return(
            <View style={styles.container}>
                {/* <View style={{flex: 0.5, justifyContent: 'space-between' }}> */}
                <View style={styles.iconCon}>

                    <TouchableOpacity style={styles.individualIcon} onPress={() => this.closeMyWindowsButton()}>
                        <Image style={styles.iconPic}
                            source={require('../images/closemywindows.png')}/>
                        <Text style={styles.iconText}>Close My Windows</Text>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity style={styles.individualIcon} onPress={this.dabaoShowDialog}>
                            <Image style={styles.iconPic}
                                source={require('../images/dabao.png')}/>
                            <Text style={styles.iconText}>Dabao Comm Hall</Text>
                        </TouchableOpacity>
                        <Dialog.Container visible={this.state.dabaoDialogVisible}>
                            <Dialog.Title>Send Help Please!</Dialog.Title>
                            <Dialog.Description>
                                Help me dabao please!!! I don't want to starve :')
                            </Dialog.Description>
                            <Dialog.Input placeholder={'Input dishes to dabao'}/>
                            <Dialog.Button label="Cancel" onPress={this.dabaoHandleClose} style={{fontWeight: '500'}}/>
                            <Dialog.Button label="Confirm" onPress={this.dabaoHandleConfirm}/>
                        </Dialog.Container>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.individualIcon} onPress={this.showDatetimePicker}>
                            {/* onpress open datetimepicker */}
                            <Image style={styles.iconPic}
                                source={require('../images/morningcall.png')}/>
                            <Text style={styles.iconText}>Wake Me Up</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={this.state.datetimePickerVisibility}
                            mode="datetime"
                            headerTextIOS={'Please wake me up at'}
                            onConfirm={this.wakeupHandleConfirm}
                            onCancel={this.hideDatetimePicker}
                            // minimumDate={new Date(moment().utcOffset('+08:00').format('MMMM Do YYYY, h:mm:ss a'))}
                        />
                    </View>

                    <TouchableOpacity style={styles.individualIcon} onPress={() => this.hideAirconButton()}>
                        <Image style={styles.iconPic}
                            source={require('../images/hideaircon.png')}/>
                        <Text style={styles.iconText}>Shift Aircon</Text>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity style={styles.individualIcon} onPress={this.groceriesShowDialog}>
                            <Image style={styles.iconPic}
                                source={require('../images/groceries.png')}/>
                            <Text style={styles.iconText}>Buy Groceries</Text>
                        </TouchableOpacity>
                        <Dialog.Container visible={this.state.groceriesDialogVisible}>
                            <Dialog.Title>Send Help Please!</Dialog.Title>
                            <Dialog.Description>
                                Please help me restore my personal pantry :')
                            </Dialog.Description>
                            <Dialog.Input placeholder={'Input groceries to be bought'}/>
                            <Dialog.Button label="Cancel" onPress={this.groceriesHandleClose} style={{fontWeight: '500'}}/>
                            <Dialog.Button label="Confirm" onPress={this.groceriesHandleConfirm}/>
                        </Dialog.Container>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.individualIcon} onPress={this.othersShowDialog}>
                            <Image style={styles.iconPic}
                                source={require('../images/others.png')}/>
                            <Text style={styles.iconText}>Others</Text>
                        </TouchableOpacity>
                        <Dialog.Container visible={this.state.othersDialogVisible}>
                            <Dialog.Title>Send Help Please!</Dialog.Title>
                            <Dialog.Description>
                                Please help me ...
                            </Dialog.Description>
                            <Dialog.Input placeholder={'Input help needed'}/>
                            <Dialog.Button label="Cancel" onPress={this.othersHandleClose} style={{fontWeight: '500'}}/>
                            <Dialog.Button label="Confirm" onPress={this.othersHandleConfirm}/>
                        </Dialog.Container>
                    </View>

                </View>

                <View style={styles.taskCon}>
                    <Text style={styles.title}>Current Help Needed!!</Text>
                    <ScrollView>
                    {
                        <View key = {this.childKey} style = {styles.item}>
                            <View style={styles.task}>
                                <View>
                                    <Text style={styles.taskHeader}>{this.childName}</Text>
                                    <Text style={styles.taskBody}>{this.childTask}</Text>
                                </View>
                                <TouchableOpacity style={styles.taskProgress} onPress={() => this.helpWithTaskButton(this.childIsInProgress)}>
                                    <Icon name='circle' size={45} style={this.checkTaskProgress(this.childIsInProgress)}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        // this.state.names.map((item, index) => (
                        //     <View key = {item.id} style = {styles.item}>
                        //         <View style={styles.task}>
                        //             <View>
                        //                 <Text style={styles.taskHeader}>{item.name}</Text>
                        //                 <Text style={styles.taskBody}>{item.task}</Text>
                        //             </View>
                        //             <TouchableOpacity style={styles.taskProgress} onPress={() => this.helpWithTaskButton(item)}>
                        //                 <Icon name='circle' size={45} style={this.checkTaskProgress(item.isInProgress)}/>
                        //             </TouchableOpacity>
                        //         </View>
                        //     </View>
                        // ))
                    }
                    </ScrollView>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignContent: 'center',
    },
    iconCon : {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomColor: '#ff7d1d',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    individualIcon : {
        alignItems: 'center',
        paddingVertical: 10,
    },
    iconPic : {
        width: 110, 
        height: 110,
    },
    iconText : {
        fontSize: 14,
        color: '#616161',
        paddingTop: 10,
        fontWeight: '500',
    },
    taskCon : {
        flex: 0.5,
        alignContent: 'flex-end',
    }, 
    title : {
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 10,
        fontWeight: '500',
        color: '#ff7d1d',
    },
    item: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 15,
        paddingHorizontal: 20,
        margin: 2,
        backgroundColor: '#ffd4b3',
        borderRadius: 20,
        width: 380,
        alignSelf: 'center'
    }, 
    task : {
        flexDirection: 'row',
        width: 340,
    },
    taskHeader : {
        fontWeight: '500',
        fontSize: 18,
        paddingBottom: 5,
    },
    taskBody : {
        fontSize: 16
    },
    taskProgress : {
        position: 'absolute',
        right: 0,
    },
});