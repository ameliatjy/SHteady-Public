import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
import Icon from'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import firebase from 'firebase/app';
import 'firebase/auth';
// import { diff } from 'react-native-reanimated';

export default class DashBoard extends Component {

    state = {
        dabaoDialogVisible: false,
        groceriesDialogVisible: false,
        othersDialogVisible: false,
        datetimePickerVisibility: false,
        dabaoText: '',
        groceriesText: '',
        othersText: '',
        dashboard: {},
        // presentdb???
    }

    componentDidMount() {
        firebase.database().ref('/dashboard').orderByPriority().on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            // console.log(Object.keys(querySnapShot.val()))
            let dashboardItems = {...data};
            // console.log(dashboardItems)
            this.setState({
                dashboard: dashboardItems,
            });
        });
    }

    componentWillUnmount() {
        return firebase.database().ref('/dashboard').off()
    }

    oneTimeTaskConfirmation = (currtask, moreInfo, priority, autoDelete) => {
        var user = firebase.auth().currentUser;

        var matric = user.displayName
        var currroom, currname, currprofilepic, block
        firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric).on('value', function(snapshot) {
            currroom = snapshot.val().room;
            currname = snapshot.val().name;
            currprofilepic = snapshot.val().profilePicUrl;
            block = currroom.substring(0, 1);
        })

        var newRequest = firebase.database().ref('dashboard/').push();
        newRequest.setWithPriority({
            name: currname,
            room: currroom,
            profilePicUrl: currprofilepic === 'default' ? 'https://firebasestorage.googleapis.com/v0/b/shteady-b81ed.appspot.com/o/defaultsheares.png?alt=media&token=95e0cee4-a5c0-4000-8e9b-2c258f87fe2d' : currprofilepic,
            task: currtask,
            addionalInfo: moreInfo,
            isInProgress: false,
            block: block,
        }, priority)

        var key = newRequest.getKey()

        // delete tasks after a period of time
        setTimeout(() => {
            firebase.database().ref('dashboard/').child(key).remove()
        }, autoDelete);
    }

    closeMyWindowsButton() {
        Alert.alert(
            'Send Help Please!',
            'Please help me close my windows!!!',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Confirm', onPress: () => this.oneTimeTaskConfirmation('Please close my windows!', '', 1, 3600000), style: 'default'},
            ]
        );
    }

    dabaoShowDialog = () => {
        this.setState({ dabaoDialogVisible: true });
    }
     
    dabaoHandleConfirm = () => {
        this.oneTimeTaskConfirmation('Please help me dabao commhall!', 'Food to daobao:\n' + this.state.dabaoText, 3, 43200000)
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
        var difference = moment(datetime).diff(moment(firebase.database.ServerValue.TIMESTAMP))
        //console.warn(difference)
        this.oneTimeTaskConfirmation('Please wake me up!', moment(datetime).format('llll'), 4, difference)
        this.hideDatetimePicker();
    }

    hideAirconButton() {
        Alert.alert(
            'Send Help Please!',
            'Halim coming!!! Help me hide my aircon PLEASE!!!',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Confirm', onPress: () => this.oneTimeTaskConfirmation('Please hide my aircon!', '', 2, 1800000), style: 'default'},
            ]
        );
    }

    groceriesShowDialog = () => {
        this.setState({ groceriesDialogVisible: true });
    }
     
    groceriesHandleConfirm = () => {
        this.oneTimeTaskConfirmation('Please help me get groceries!', this.state.groceriesText, 5, 172800000)
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
        this.oneTimeTaskConfirmation('Please help me with something!', this.state.othersText, 6, 172800000)
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

    helpTask = (key) => {
        firebase.database().ref('dashboard/' + key).update({
            isInProgress: true
        })
    }

    completeTask = (key) => {
        firebase.database().ref('dashboard/' + key).remove()
    }

    helpWithTaskButton = (key) => {
        const item = this.state.dashboard[key]
        if (item.isInProgress) {
            Alert.alert(
                'Help On The Way!',
                'Thank you for offering your help!\n' +
                'Please confirm that the task has been completed!',
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Confirm', onPress: () => this.completeTask(key), style: 'default'},
                ]
                // onpress(confirm) delete the task
            );
        } else {
            Alert.alert(
                // think of possible ways to change this
                item.task,
                item.addionalInfo + '\n' + 'Room Number: ' + item.room,
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Confirm', onPress: () => this.helpTask(key), style: 'default'},
                ]
                // onpress(confirm) change task taskinprogress:true
            );
        }
    }

    render() {

        let dashboardKeys = Object.keys(this.state.dashboard);

        return(
            <View style={styles.container}>
            <ScrollView>
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
                            <Dialog.Input 
                                placeholder={'Input dishes to dabao'}
                                onChangeText={(inputText) => this.setState({dabaoText: inputText})}/>
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
                            date={new Date()}
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
                            <Dialog.Input 
                                placeholder={'Input groceries to be bought'}
                                onChangeText={(inputText) => this.setState({groceriesText: inputText})}/>
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
                            <Dialog.Input 
                                placeholder={'Input help needed'}
                                onChangeText={(inputText) => this.setState({othersText: inputText})}/>
                            <Dialog.Button label="Cancel" onPress={this.othersHandleClose} style={{fontWeight: '500'}}/>
                            <Dialog.Button label="Confirm" onPress={this.othersHandleConfirm}/>
                        </Dialog.Container>
                    </View>

                </View>

                <View style={styles.taskCon}>
                    <Text style={styles.title}>Current Help Needed!!</Text>
                    {dashboardKeys.length > 0 ? (
                        <View>
                        {/* <ScrollView> */}
                        {
                            dashboardKeys.map((key) => (
                                <View key = {key}  style = {styles.item}>
                                    <TouchableOpacity style={styles.task} onPress={() => this.helpWithTaskButton(key)}>
                                        <View>
                                            <Image style={styles.profilepic} source={{ uri: this.state.dashboard[key].profilePicUrl }} />
                                        </View>
                                        <View>
                                            <Text style={styles.taskHeader}>{this.state.dashboard[key].name}</Text>
                                            <Text style={styles.taskBody}>{this.state.dashboard[key].task}</Text>
                                        </View>
                                        <View style={styles.taskProgress}>
                                            <Icon name='circle' size={45} style={this.checkTaskProgress(this.state.dashboard[key].isInProgress)}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                        {/* </ScrollView> */}
                        </View>
                    ) : (
                        <View style={styles.empty}>
                            <Text style={{fontSize: 18}}>No one needs your help for now!</Text>
                            <Text style={{fontSize: 18}}>Thank you! :)</Text>
                        </View>
                    )}
                </View>
            </ScrollView> 
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
        width: 105, 
        height: 105,
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
    empty : {
        alignItems: 'center', 
        paddingTop: 100
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
    profilepic: {
        width:40,
        height:40,
        borderRadius:20,
        marginRight:10
    }
});