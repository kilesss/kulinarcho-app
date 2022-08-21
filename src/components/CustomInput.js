import {View, TextInput, Text} from "react-native";
import styles from "../styles/styles";
import React, {Component, useState} from 'react';


export default class CustomButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    sendCallback(name) {
        this.props.callback(name);
    }

    render() {
        return (
            <View style={{width: '80%', marginLeft: -10, paddingLeft: 0}}>
                <TextInput
                    style={{
                        ...styles.customButton,
                        width: '100%',
                        backgroundColor: this.props.bgColor,
                        color: this.props.color
                    }}
                    secureTextEntry={this.props.isPassword}
                    onChangeText={(name) => this.sendCallback(name)} value={this.props.value}/>
                <Text>{this.props.errorMessage}</Text>
            </View>
        );
    }
}