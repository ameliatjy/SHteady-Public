import firebase from 'firebase/app';
import 'firebase/auth';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';

import MultiSelect from 'react-native-multiple-select';
import { Button } from 'native-base';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
  

export default class EditProfile extends Component {
    state = {
        initialSelected: this.props.route.params?.currCCAs ?? [],
        selectedItems: [],
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
    };
    
    render() {
        const curr = this.props.route.params?.currCCAs ?? []
        const { selectedCCAs } = this.state;

        const matric = this.props.route.params?.matric ?? 'no matric'
        const email = this.props.route.params?.email ?? 'no email'
        var room = this.props.route.params?.room?? 'Enter room number'
        var name = 'name'
        firebase.database().ref('users/' + matric).on('value', function(snapshot) {
            name = snapshot.val().name;
        })

        const updateRoom = (text) => {
            room = text,
            firebase.database().ref('users/' + matric).child('room').set(room)
        }
        
        return (
            <View style={{ flex: 1, padding: 20, flexDirection: 'column' }}>
                    <View style={{flexDirection: 'row', margin: 8, justifyContent: 'space-between'}}>
                        <Text>Name:</Text>
                        <TextInput style={{width: 200, height: 30, backgroundColor: 'white'}}
                        multiline={false}
                        placeholder={name} />
                    </View>
                    <View style={{flexDirection: 'row', margin: 8, justifyContent: 'space-between'}}>
                        <Text>Matriculation Number:</Text>
                        <TextInput style={{width: 200, height: 30, backgroundColor: 'white'}}
                        multiline={false}
                        placeholder={matric} />
                    </View>
                    <View style={{flexDirection: 'row', margin: 8, justifyContent: 'space-between'}}>
                        <Text>Room Number:</Text>
                        <TextInput style={{width: 200, height: 30, backgroundColor: 'white'}}
                        multiline={false}
                        placeholder={room}
                        onChangeText={updateRoom}/>
                    </View>
                    <View style={{flexDirection: 'row', margin: 8}}>
                        <Text style={{flex:5}}>Email:</Text>
                        <Text style={styles.noEditText}>{email}</Text>
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
                        styleItemsContainer={{maxHeight: 150}}
                    />
                    <Text>
                        {typeof curr === 'undefined' ? 'None selected yet.' : 'Current CCAs Logged In: ' + curr.join(', ')}
                    </Text>
                    <Text>
                        {typeof selectedCCAs === 'undefined' ? 'New Edit: ' : 'Updated CCAs: ' + selectedCCAs.join(', ')}
                    </Text>
                    <Button style={{backgroundColor: '#ffd4b3',marginTop: 20, width: 300, height: 50, justifyContent: 'center', alignSelf: 'center'}}
                        onPress={() => this.props.navigation.navigate('Profile', { currCCAs: selectedCCAs, name: name, email: email, matric: matric, room: room })}>
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
        borderLeftWidth:13,
        borderTopWidth:4,
        borderBottomWidth:4,
        color: 'gray',
        fontSize:16,
        flex: 6
    }
});