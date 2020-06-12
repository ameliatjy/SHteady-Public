import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList
} from "react-native";
import Constants from "expo-constants";
import firebase from 'firebase/app';
import 'firebase/auth';

const DATA = [
    {
        title: "Main dishes",
        data: ["Pizza", "Burger", "Risotto"]
    },
    {
        title: "Sides",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
        title: "Drinks",
        data: ["Water", "Coke", "Beer"]
    },
    {
        title: "Desserts",
        data: ["Cheese Cake", "Ice Cream"]
    }
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

class viewMenu extends Component {
    state = {
        menudate: null
    }

    componentDidMount() {
        var self = this;
        var date = new Date().getDate().toString();
        if (date.length <= 1) {
            date = "0" + date
        }
        var month = (new Date().getMonth() + 1).toString();
        if (month.length <= 1) {
            month = "0" + month
        }
        var year = new Date().getFullYear().toString();

        self.setState({ menudate: date + month + year })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            </SafeAreaView>
        );
    }
}

export default viewMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#bdbdbd",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 18,
    },
    title: {
        fontSize: 12
    }
});