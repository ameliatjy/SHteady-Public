import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import MultiSelect from 'react-native-multiple-select';

export default class EditProfile extends Component {
    // state = {
    //     selectedItems: [],
    // }

    // items = [{
    //     id: 'Sports1',
    //     name: 'Basketball',
    // }, {
    //     id: 'Sports2',
    //     name: 'Badminton',
    // }, {
    //     id: 'Sports3',
    //     name: 'Handball',
    // }, {
    //     id: 'Sports4',
    //     name: 'Swimming',
    // }, {
    //     id: 'Arts1',
    //     name: 'Band'
    // }, {
    //     id: 'Arts2',
    //     name: 'Ge Yao',
    // }, {
    //     id: 'Arts3',
    //     name: 'SHacapella',
    // } , {
    //     id: 'Committees1',
    //     name: 'JCRC',
    // }, {
    //     id: 'Committees2',
    //     name: 'Sheares Link',
    // }, {
    //     id: 'Committees3',
    //     name: 'Sports Management Board'
    // }];

    // onSelectedItems = selectedCCAs => {
    //     this.setState({ selectedCCAs });
    // }

    render() {
        //const { selectedCCAs } = this.state;
        return(
            <View style={styles.container}>
                <Text>Edit Profile page</Text>
                {/* <MultiSelect
                    hideTags
                    items={items}
                    uniqueKey='id'
                    ref={(component) => {this.multiSelect = component}}
                    onSelectedItemsChange = {this.onSelectedItems}
                    selectedItems={selectedItems}
                    selectText="Select Your CCAs"
                    searchInputPlaceholderText="Search CCAs..."
                    onChangeInput={(text) => console.log(text)}
                    displayKey='name'
                    submitButtonText="Submit"
                />
                <View>
                    {this.multiSelect.getSelectedItemsExt(selectedCCAs)}
                </View> */}
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