import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class Announcements extends Component {
    state = {
        announcements:
        [
            {
                id: 0,
                title: 'Hall Application for AY2021',
                message:
                'Dear Shearites, \n' +
                'The offer for AY2021 is already out on the UHMS portal and please' +
                'remember to pay the acceptance fee by 20 April.\nPlease note that ' +
                'if you do not pay by 20 April, your slot will be forfeited.'
            },
            {
                id: 1,
                title:  'Hall Welfare Pack',
                message:
                'Hi Shearites! \n' +
                'You should have received your hall welfare pack at your room.' +
                'From the SCRC, RLT and HWAC, we wish you all the best for the ' +
                'rest of the semester! \nStay safe and study hard!'
            },
            {
                id: 2,
                title:  'Points Release',
                message:
                'blah \nblah \nblah \nblah'
            },
            {
                id: 3,
                title: 'Crepe Live Station',
                message:
                'blah \nblah \nblah \nblah'
            },
            {
                id: 4,
                title: 'Themed Dinner',
                message: 
                'blah \nblah \nblah \nblah'
            },
            {
                id: 5,
                title: 'Remember to update your temperature records!',
                message:
                'blah \nblah \nblah \nblah'
            }
        ]
    }
  render() {
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    this.state.announcements.map((item, index) => (
                        <View key={item.id} style={styles.item}>
                            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                            <Text>{item.message}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10
  },
  item: {
      backgroundColor: '#ECECEC',
      marginTop: 4,
      padding: 10,
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 15,
  }
});