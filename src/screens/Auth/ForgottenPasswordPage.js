import React from 'react';

import {Image, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton"
import CustomInput from '../../components/display/CustomInput';
import validateFields from "../../validator/Validator";
import language from '../../language/language';
import loadingIndicator from "../../components/loading/loadingIndicator";
import ErrorMessage from "../../components/display/ErrorMessage";
import {forgotenPassword} from '../../RestRequests/generalRequest';
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";

export default class ForgottenPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "", restError: '', errors: '', showMessage: false};
    }


    cleanErrors() {
        this.setState({errors: {}})
        this.setState({restError: ''})

    }

    getResponseEmail(result) {
        this.cleanErrors();
        this.setState({email: result});
    }

    async _onPressButton(state) {
        this.cleanErrors();
        const err = validateFields(
            {'email': state.email},
            {'email': {required: true, email: true}}
        );
        if (Object.keys(err).length === 0) {
            const forgotenPasswordPayload = {email: this.state.email};
            await forgotenPassword(forgotenPasswordPayload, 'POST')
                .then(response => {
                    console.log("PLIUVNI SYOBrSHTENIE")
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Успех!',
                        textBody: 'Изпратена е заявка за смяна на паролата: ',
                        button: 'Затвори',
                    })


                });
        } else {
            this.setState({errors: err})
        }
        return true;
    }

    showMessageConfirmEmail() {
        if (this.state.showWait === true) {
            return <Text style={{
                marginLeft: 10,
                fontSize: 15,
                width: '80%',
                color: 'blue'
            }}>{language('waitConfirmEmail')}</Text>
        }
    }

    IColors = {
        card: "#fff",
        success: "#15A051"
    };

    render() {
        return (
            <AlertNotificationRoot colors={[this.IColors, this.IColors]}>
            <View style={{...styles.container, alignItems: "center", justifyContent: "center"}}>

                <Text
                    style={{fontSize: 35, fontWeight: "bold", color: "#4B4C4C"}}>{language('forgottenPassword')}</Text>
                <Image
                    style={{height: 260, width: 270}}
                    source={require('../../../public/images/loginImage.png')}
                />
                <ErrorMessage showMessage={this.state.showMessage} message={this.state.restError}/>
                {this.showMessageConfirmEmail()}
                <View style={{justifyContent: "flex-start", alignSelf: "stretch"}}>
                    <Text>{language('email')}</Text>
                    <CustomInput
                        value={this.state.email}
                        errorMessage={this.state.errors.email}
                        isPassword={false}
                        bgColor={"#fff"}
                        callback={this.getResponseEmail.bind(this)}
                    />
                </View>
                <CustomButton
                    title={language('send')}
                    txtColor={"#fff"}
                    bgColor={"#15A051"}
                    onPress={() => this._onPressButton(this.state)}
                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.boldTextButton}>{language('backTo')} {language('enter')}!</Text>
                </TouchableOpacity>


            </View>
            </AlertNotificationRoot>
        );
    }
}
