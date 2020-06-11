import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    TouchableOpacity,
    Image,
    Text,
    Alert,
} from 'react-native';

import firebase from 'firebase/app';
import 'firebase/auth';

export default class Meals extends Component {

    state = {
        matric: null,
        mealcredit: null,
    }

    viewMenu = () => {
        this.props.navigation.navigate('Subpages', { screen: 'Menu', params: { currPage: 'Menu' } });
    }

    confirmdonate = () => {
        var user = firebase.auth().currentUser;

        var matric = user.displayName
        var availcredits, donatedmeals, name
        firebase.database().ref().on('value', function (snapshot) {
            donatedmeals = snapshot.val().donatedmeals;
        })

        firebase.database().ref('users/' + matric).on('value', function (snapshot) {
            availcredits = snapshot.val().mealcredit;
            name = snapshot.val().name;
        })

        var mealsdonatedfrom
        firebase.database().ref('mealsdonatedfrom').on('value', function (snapshot) {
                mealsdonatedfrom = [name]
                snapshot.forEach(function(item) {
                    var itemVal = item.val();
                    mealsdonatedfrom.push(itemVal);
                })
        })

        this.setState({ mealcredit: availcredits - 1 })
        firebase.database().ref('users/' + matric).child('mealcredit').set(availcredits - 1)
        firebase.database().ref('donatedmeals').set(donatedmeals + 1);
        firebase.database().ref('mealsdonatedfrom').set(mealsdonatedfrom);

        Alert.alert(
            "Successful",
            "Meal credit donated!",
            [
                {
                    text: "Ok"
                }
            ]
        )
    }

    donateMeal = () => {
        if (this.state.mealcredit <= 0) {
            Alert.alert(
                "Unavailable",
                "You do not have any available meal credits left to donate.",
                [
                    {
                        text: "Ok"
                    }
                ]
            )
        } else {
            Alert.alert(
                "Donate meal credit",
                "Click confirm to donate your meal.",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Confirm",
                        onPress: this.confirmdonate
                    }
                ]
            )
            //this.props.navigation.navigate('Subpages', { screen: 'Donate', params: { currPage: 'Donate' } });
        }
    }

    confirmsecondmeal = () => {
        var user = firebase.auth().currentUser;

        var matric = user.displayName
        var availcredits, donatedmeals, mealsdonatedfrom
        firebase.database().ref().on('value', function (snapshot) {
            donatedmeals = snapshot.val().donatedmeals;
        })
        firebase.database().ref('users/' + matric).on('value', function (snapshot) {
            availcredits = snapshot.val().mealcredit;
        })

        var mealsdonatedfrom
        firebase.database().ref('mealsdonatedfrom').on('value', function (snapshot) {
            mealsdonatedfrom = []
                snapshot.forEach(function(item) {
                    var itemVal = item.val();
                    mealsdonatedfrom.push(itemVal);
                })
        })

        var newarray, donor;
        if (mealsdonatedfrom.length === 1) {
            newarray = 0
            donor = mealsdonatedfrom.shift();
        } else {
            donor = mealsdonatedfrom.shift();
            newarray = mealsdonatedfrom
        }

        this.setState({ mealcredit: availcredits + 1 })
        firebase.database().ref('users/' + matric).child('mealcredit').set(availcredits + 1)
        firebase.database().ref('donatedmeals').set(donatedmeals - 1);
        firebase.database().ref('mealsdonatedfrom').set(newarray);

        Alert.alert(
            "Successful",
            "You have redeemed a meal from " + donor + " !",
            [
                {
                    text: "Ok"
                }
            ]
        )
    }

    secondMeal = () => {
        var user = firebase.auth().currentUser;

        var matric = user.displayName
        var donatedmeals
        firebase.database().ref('donatedmeals').on('value', function (snapshot) {
            donatedmeals = snapshot.val();
        })

        if (donatedmeals <= 0) {
            Alert.alert(
                "Unsuccessful",
                "There are no meals up for redemption.",
                [
                    {
                        text: "Ok"
                    }
                ]
            )
        } else {
            Alert.alert(
                "Extra meal credit",
                "There are " + donatedmeals + " donated meals. Are you sure you'd like to have a second serving?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "YES",
                        onPress: this.confirmsecondmeal
                    }
                ]
            )
        }
        //this.props.navigation.navigate('Subpages', { screen: 'Redeem', params: { currPage: 'Redeem' } });
    }

    updatecredit = () => {
        var user = firebase.auth().currentUser;

        var matric = user.displayName
        var availcredits
        firebase.database().ref('users/' + matric).on('value', function (snapshot) {
            availcredits = snapshot.val().mealcredit;
        })

        this.setState({ mealcredit: availcredits - 1 })
        firebase.database().ref('users/' + matric).child('mealcredit').set(availcredits - 1)
    }

    redeemcredit = () => {
        if (this.state.mealcredit <= 0) {
            Alert.alert(
                "Unavailable",
                "You do not have any available meal credits left.",
                [
                    {
                        text: "Ok"
                    }
                ]
            )
        } else {
            Alert.alert(
                "Use meal credit",
                "Click confirm to redeem your meal.",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Confirm",
                        onPress: this.updatecredit
                    }
                ]
            )
        }
    }

    getDeets = () => {
        let self = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                self.setState({ matric: user.displayName })
                firebase.database().ref('users/').child(user.displayName).on('value', function (snapshot) {
                    self.setState({ mealcredit: snapshot.val().mealcredit })
                    while (self.state.matric == null || self.state.mealcredit == null) {
                        setTimeout(function () { }, 3000);
                        console.log("getting data, setting timeout");
                    }
                })
            }
        })
    }

    componentDidMount() {
        this.getDeets();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mealcreditdisplay}>
                    <Text style={styles.mealcreditword}>Meal Credit:   {this.state.mealcredit}</Text>
                    <TouchableOpacity onPress={this.redeemcredit}>
                        <Text style={styles.redeembtn}>Redeem</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 5 }} >
                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={this.viewMenu}>
                            <Image source={require('../images/menu.png')}
                                style={styles.circlebtns} />
                            <Button title="View Menu" onPress={this.viewMenu} color='#616161' />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={this.donateMeal}>
                    <Image source={require('../images/donatemeal.png')}
                        style={styles.circlebtns} />
                    <Button title="Donate Your Meal" onPress={this.donateMeal} color='#616161' />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.secondMeal}>
                    <Image source={require('../images/secondserving.png')}
                        style={styles.circlebtns} />
                    <Button title="Second Serving Plz..." onPress={this.secondMeal} color='#616161' />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    mealcreditdisplay: {
        backgroundColor: '#ffd4b3',
        flexDirection: 'row',
        paddingVertical: 19
    },
    mealcreditword: {
        paddingRight: 100,
        paddingLeft: 35,
        fontSize: 17
    },
    redeembtn: {
        paddingLeft: 100,
        paddingRight: 35,
        fontSize: 17,
        color: '#616161'
    },
    circlebtns: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    }
});
