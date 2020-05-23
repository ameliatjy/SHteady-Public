import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';


export default class Meals extends Component {

    viewMenu = () => {
        this.props.navigation.navigate('Subpages', { screen : 'Menu' });
    }

    donateMeal = () => {
        this.props.navigation.navigate('Subpages', { screen : 'Donate'});
    }

    redeemMeal = () => {
        this.props.navigation.navigate('Subpages', { screen : 'Redeem'});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Icon1 style={{alignSelf:'center'}} name="food" size={120} onPress={this.viewMenu} color='orange'/>
                    <Button title="View Menu" onPress={this.viewMenu} color='black'/>
                    <Icon2 style={{alignSelf:'center', paddingTop: 30}} name="hand-holding-heart" size={120} onPress={this.donateMeal} color='orange'/>
                    <Button title="Donate Your Meal" onPress={this.donateMeal} color='black'/>
                    <Icon2 style={{alignSelf:'center', paddingTop:30}} name="pray" size={120} onPress={this.redeemMeal} color='orange'/>
                    <Button title="Second Serving Plz..." onPress={this.redeemMeal} color='black'/>
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
    justifyContent: 'center',
  },
});
