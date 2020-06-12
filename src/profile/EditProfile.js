import firebase from 'firebase/app';
import 'firebase/auth';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import MultiSelect from 'react-native-multiple-select';
import { Button } from 'native-base';
import { TextInput } from 'react-native-paper';

let unsubscribe;

export default class EditProfile extends Component {

    state = {
        initialSelected: [],
        selectedItems: [],
        matric: null,
        currname: null,
        curremail: null,
        currroom: null
    };

    things = [{
        id: 'Basketball',
        name: 'Basketball',
    }, {
        id: 'Badminton',
        name: 'Badminton',
    }, {
        id: 'Handball',
        name: 'Handball',
    }, {
        id: 'Swimming',
        name: 'Swimming',
    }, {
        id: 'Band',
        name: 'Band'
    }, {
        id: 'Ge Yao',
        name: 'Ge Yao',
    }, {
        id: 'SHacapella',
        name: 'SHacapella',
    }, {
        id: 'JCRC',
        name: 'JCRC',
    }, {
        id: 'Sheares Link',
        name: 'Sheares Link',
    }, {
        id: 'Sports Management Board',
        name: 'Sports Management Board'
    }];

    onSelectedItems = selectedCCAs => {
        this.setState({ selectedCCAs });
    }

    getDeets = () => {
        let self = this;
        unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
            console.log('EditProfile chunk')
            if (user) {
                console.log('user is signed in!')
                console.log('user:', user)
                self.setState({ matric: user.displayName })
                firebase.database().ref('users/').child(user.displayName).on('value', function (snapshot) {
                    self.setState({ currname: snapshot.val().name })
                    self.setState({ curremail: snapshot.val().email })
                    self.setState({ currroom: snapshot.val().room })
                    var grps = snapshot.val().cca
                    grps === 'none'
                        ? self.setState({ initialSelected: [] })
                        : self.setState({ initialSelected: snapshot.val().cca })
                    while (self.state.matric == null || self.state.curremail == null || self.state.currname == null || self.state.currroom == null) {
                        setTimeout(function () { }, 3000);
                    }
                })
            } else {
                console.log('user not signed in')
            }
        })
    }

    componentDidMount() {
        this.getDeets();
    }

    componentWillUnmount() {
        unsubscribe()
    }

    render() {
        const { selectedCCAs } = this.state;
        const curr = this.state.initialSelected;

        console.log('thismatric:', this.state)

        const updateRoom = async (text) => {
            this.state.currroom = text,
                await firebase.database().ref('users/' + this.state.matric).child('room').set(this.state.currroom)
        }

        const onSave = async () => {
            typeof selectedCCAs === 'undefined'
                ? await firebase.database().ref('users/' + this.state.matric).child('cca').set('none')
                : await firebase.database().ref('users/' + this.state.matric).child('cca').set(selectedCCAs);
            this.props.navigation.navigate('Profile');
        }

        return (
            <View style={{ flex: 1, padding: 20, flexDirection: 'column' }}>
                <View style={styles.fieldView}>
                    <Text>Name:</Text>
                    <TextInput style={styles.details}
                        multiline={false}
                        placeholder={this.state.currname} />
                </View>
                <View style={styles.fieldView}>
                    <Text>Matriculation Number:</Text>
                    <TextInput style={styles.details}
                        multiline={false}
                        placeholder={this.state.matric} />
                </View>
                <View style={styles.fieldView}>
                    <Text>Room Number:</Text>
                    <TextInput style={styles.details}
                        multiline={false}
                        placeholder={this.state.currroom}
                        onChangeText={updateRoom} />
                </View>
                <View style={{ flexDirection: 'row', margin: 8 }}>
                    <Text style={{ flex: 5 }}>Email:</Text>
                    <Text style={styles.noEditText}>{this.state.curremail}</Text>
                </View>
                <MultiSelect
                    hideTags
                    items={this.things}
                    uniqueKey='id'
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItems}
                    selectedItems={selectedCCAs}
                    selectText="Select Your CCAs"
                    searchInputPlaceholderText="Search CCAs..."
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#ffd4b3"
                    selectedItemIconColor="#ffd4b3"
                    itemTextColor="#000"
                    displayKey='name'
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Selection Complete"
                    styleItemsContainer={{ maxHeight: 150 }}
                />
                <Text>
                    {typeof this.state.initialSelected === 'undefined' ? 'None selected yet.' : 'Current CCAs Logged In: ' + this.state.initialSelected.join(', ')}
                </Text>
                <Text>
                    {typeof selectedCCAs === 'undefined' ? 'New Edit: ' : 'Updated CCAs: ' + selectedCCAs.join(', ')}
                </Text>
                <Button style={styles.savechangesbtn}
                    onPress={onSave}>
                    <Text>Save Changes</Text>
                </Button>
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
    noEditText: {
        backgroundColor: 'white',
        borderLeftWidth: 13,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        color: 'gray',
        fontSize: 16,
        flex: 6
    },
    fieldView: {
        flexDirection: 'row',
        margin: 8,
        justifyContent: 'space-between'
    },
    details: {
        width: 200,
        height: 30,
        backgroundColor: 'white'
    },
    savechangesbtn: {
        backgroundColor: '#ffd4b3',
        marginTop: 20,
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    }
});