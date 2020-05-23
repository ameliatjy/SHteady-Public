import React, { Component } from 'react';
import { StyleSheet, View, StatusBar} from 'react-native';

import OverallNav from './src/OverallNav';

export default class App extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isSignedIn: false
  //   }
  // }

  render() {

    return (
      <View style={styles.container}>
        <OverallNav/>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container : {
    // backgroundColor:'#fffde7',
    flex: 1,
  }
});
