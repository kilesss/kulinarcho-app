import {View, TextInput, Text} from "react-native";
import styles from "../../styles/styles";
import React from 'react';


export default class CustomInout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    sendCallback(name) {
        this.props.callback(name);
    }

    render() {
        return (
            <View style={{alignSelf:"stretch"}}>
                <TextInput
                    style={{
                        ...styles.customButton,
                        alignSelf: "stretch",
                        backgroundColor: this.props.bgColor,
                        color: this.props.color,
                        padding: 10,
                    }}
                    secureTextEntry={this.props.isPassword}
                    onChangeText={(name) => this.sendCallback(name)} value={this.props.value}/>
                <Text>{this.props.errorMessage}</Text>
            </View>
        );
    }
}