import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1oyaDAneBvtqpJJqYN_o13jWDExpRDq0",
    authDomain: "shteady-b81ed.firebaseapp.com",
    databaseURL: "https://shteady-b81ed.firebaseio.com",
    projectId: "shteady-b81ed",
    storageBucket: "shteady-b81ed.appspot.com",
    messagingSenderId: "749591564782",
    appId: "1:749591564782:web:73f597ecbcf1edd21dfeff",
    measurementId: "G-CBS54V1147"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const AuthLoadingScreen = ({ navigation }) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is logged in
        navigation.navigate('SignedIn', {screen : 'Profile'});
      } else {
        // User is not logged in
        navigation.navigate('SignedOut', { screen: 'Signup'});
      }
    });
  
    return (
      <View>
        <ActivityIndicator size="large" color='#616161' />
      </View>
    );
  };
  
  export default AuthLoadingScreen;