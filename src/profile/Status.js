import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard
} from 'react-native';

export default class Status extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avail: ''};
    }

    updatedStatus = () => {
        Alert.alert(
            'Status Update',
            'Your status has been successfully updated!',
            [
                {
                    text: 'Nice!',
                    onPress: () => {
                        this.props.navigation.navigate('Profile', {currStatus: this.state.avail});}
                },
            ],
            {cancelable: false}
        );
        Keyboard.dismiss();
    }

    render() {

        const options = {
            availability: [
                {
                    id: 0,
                    avail: 'yo hmu i am in',
                },
                {
                    id: 1,
                    avail: 'i am out of hall',
                },
                {
                    id: 2,
                    avail: 'busy... do not find me',
                }
            ]
        }

        return(
            <View>
                {
                    options.availability.map((item, index) => (
                        <TouchableOpacity
                            key = {item.id}
                            style = {styles.container}
                            onPress = {item => this.setState(item.avail)}
                            onPress = {() => this.props.navigation.navigate('Profile', { currStatus: item.avail })}>
                                <Text style={styles.text}>
                                    {item.avail}
                                </Text>
                        </TouchableOpacity>
                    ))
                }
                    <TextInput
                        style={{height:58, marginTop: 10, backgroundColor: 'white'}}
                        multiline={true}
                        placeholder="Customise your status here!"
                        onChangeText={newStatus => {this.state.avail = newStatus}}
                        onSubmitEditing={this.updatedStatus}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    text: {
        color: '#808080'
    }
  });