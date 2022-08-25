import {Text} from "react-native";
import React, {Component, useState} from 'react';



{/*Maybe it will be good to make component to render errors , some fancy popup messages or something
                like that, but for now i will leave it like this */}
export default class ErrorMessage extends React.Component {

    constructor(props) {
        super(props);
    }



    // TODO: leave styling like this because all module need to be refactored
    render() {
        console.log(this.props.showMessage)
        console.log(this.props.message)
        if (this.props.showMessage === true){
            return <Text style={{marginLeft: 10, color: 'red'}}>{this.props.message}</Text>
        }
    }
}