import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
import Icon from'react-native-vector-icons/FontAwesome';


export default class DashBoard extends Component {

    state = {
        names: [
           {'name': 'Ben', 'id': 1, 'task': 'close my windows'},
           {'name': 'Susan', 'id': 2, 'task': 'close my windows'},
           {'name': 'Robert', 'id': 3, 'task': 'close my windows'},
           {'name': 'Mary', 'id': 4, 'task': 'close my windows'},
           {'name': 'Daniel', 'id': 5, 'task': 'close my windows'},
           {'name': 'Laura', 'id': 6, 'task': 'close my windows'},
           {'name': 'John', 'id': 7, 'task': 'close my windows'},
           {'name': 'Debra', 'id': 8, 'task': 'close my windows'},
           {'name': 'Aron', 'id': 9, 'task': 'close my windows'},
           {'name': 'Ann', 'id': 10, 'task': 'close my windows'},
           {'name': 'Steve', 'id': 11, 'task': 'close my windows'},
           {'name': 'Olivia', 'id': 12, 'task': 'close my windows'}
        ],
        dabaoDialogVisible: false,
        groceriesDialogVisible: false,
        othersDialogVisible: false,
        datetimePickerVisibility: false,
    }


    closeMyWindowsButton() {
        Alert.alert(
            'Send Help Please!',
            'Please help me close my windows!!!',
            [
                {text: 'CONFIRM', onPress: () => console.warn('CONFIRM Pressed'), style: 'destructive'},
                {text: 'CANCEL', onPress: () => console.warn('CANCEL Pressed'), style: 'destructive'},
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
        console.warn("A date has been picked: ", datetime);
        this.hideDatetimePicker();
    }

    hideAirconButton() {
        Alert.alert(
            'Send Help Please!',
            'Halim coming!!! Help me hide my aircon PLEASE!!!',
            [
                {text: 'CONFIRM', onPress: () => console.warn('CONFIRM Pressed'), style: 'destructive'},
                {text: 'CANCEL', onPress: () => console.warn('CANCEL Pressed'), style: 'destructive'},
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

    checkTaskProgress = () => {

    }

    render() {
        return(
            <View style={styles.container}>
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
                            <Dialog.Input placeholder={'INPUT DISHES TO DABAO'}/>
                            <Dialog.Button label="CONFIRM" onPress={this.dabaoHandleConfirm}/>
                            <Dialog.Button label="CLOSE" onPress={this.dabaoHandleClose} style={{color:'red'}}/>
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
                            onConfirm={this.wakeupHandleConfirm}
                            onCancel={this.hideDatetimePicker}
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
                            <Dialog.Input placeholder={'INPUT GROCERIES TO BE BOUGHT'}/>
                            <Dialog.Button label="CONFIRM" onPress={this.groceriesHandleConfirm}/>
                            <Dialog.Button label="CLOSE" onPress={this.groceriesHandleClose} style={{color:'red'}}/>
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
                            <Dialog.Input placeholder={'INPUT HELP NEEDED'}/>
                            <Dialog.Button label="CONFIRM" onPress={this.othersHandleConfirm}/>
                            <Dialog.Button label="CLOSE" onPress={this.othersHandleClose} style={{color:'red'}}/>
                        </Dialog.Container>
                    </View>

                </View>

                <View
                    style={{
                        borderBottomColor: '#ff7d1d',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />

                <View style={styles.taskCon}>
                    <Text style={styles.title}>Current Help Needed!!</Text>
                    <ScrollView>
                    {
                        this.state.names.map((item, index) => (
                            <View key = {item.id} style = {styles.item}>
                                <View style={styles.task}>
                                    <View>
                                        <Text style={styles.taskHeader}>{item.name}</Text>
                                        <Text style={styles.taskBody}>{item.task}</Text>
                                    </View>
                                    <Icon name='circle' size={45} style={styles.taskProgress}/>
                                </View>
                            </View>
                        ))
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
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    individualIcon : {
        alignItems: 'center',
    },
    iconPic : {
        width: 110, 
        height: 110,
        marginTop: 20,
    },
    iconText : {
        fontSize: 14,
        color: '#616161',
        paddingVertical: 10,
        fontWeight: '500',
    },
    taskCon : {
        flex: 0.55,
        alignContent: 'flex-end',
        paddingBottom: 5,
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
        paddingLeft: 190,
        color: 'red'
    }
});