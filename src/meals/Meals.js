import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class Meals extends Component {

    viewMenu = () => {
        this.props.navigation.navigate('Subpages', { screen : 'Menu', params: { currPage: 'Menu'} });
    }

    donateMeal = () => {
        this.props.navigation.navigate('Subpages', { screen : 'Donate', params: { currPage: 'Donate'}});
    }

    redeemMeal = () => {
        this.props.navigation.navigate('Subpages', { screen : 'Redeem', params: { currPage: 'Redeem'}});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.viewMenu}>
                    <Image source={require('../images/menu.png')}
                        style={{width:150, height:150, alignSelf: 'center'}} />
                    <Button title="View Menu" onPress={this.viewMenu} color='#616161' />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.donateMeal}>
                    <Image source={require('../images/donatemeal.png')}
                        style={{width:150, height:150, alignSelf: 'center'}} />
                    <Button title="Donate Your Meal" onPress={this.donateMeal} color='#616161'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.redeemMeal}>
                    <Image source={require('../images/secondserving.png')}
                        style={{width:150, height:150, alignSelf: 'center'}} />
                    <Button title="Second Serving Plz..." onPress={this.redeemMeal} color='#616161'/>
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
});
