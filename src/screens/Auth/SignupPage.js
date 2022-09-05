import React from "react";
import {Button, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import CustomInput from "../../components/display/CustomInput";
import validateFields from "../../validator/Validator";
import loadingIndicator from "../../components/loading/loadingIndicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import language from "../../language/language";
import ErrorMessage from "../../components/display/ErrorMessage";
import {signup} from "../../RestRequests/generalRequest";

export default class LoginPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            confirmPassword: "",
            password: "",
            errors: '',
            restError: '',
            showMessage: false
        };
        this.state = {
            email: "lmariqnov@gmail.com",
            name: "kurcho",
            confirmPassword: "qwerty2",
            password: "qwerty2",
            errors: '',
            restError: '',
            showMessage: false

        };
        // to not fill every time
        //TODO: delete before production : bad practise but simple to use
        //  this.state = {email: "lmariqnov@gmail.com", password: "qwerty2", errors: '', restError: '', showMessage: false};
    }

    cleanErrors() {
        this.setState({errors: {}})
        this.setState({restError: ''})

    }

    getResponseName(result) {
        this.cleanErrors();
        this.setState({name: result});
    }

    getResponseEmail(result) {
        this.cleanErrors();
        this.setState({email: result});
    }

    getResponsePassword(result) {
        this.cleanErrors();
        this.setState({password: result});
    }

    getResponseConfirmPassword(result) {
        this.cleanErrors();
        this.setState({confirmPassword: result});
    }

    async _onPressButton(state) {
        this.setState({errors: {}})
        this.setState({restError: ''})

        const err = validateFields(
            {
                'email': state.email,
                'name': state.name,
                'password': state.password,
                confirmPassword: state.confirmPassword
            },
            {
                'email': {required: true, email: true},
                'name': {required: true},
                'password': {required: true, min: 6, same: 'confirmPassword'}
            }
        );
        if (Object.keys(err).length === 0) {
            const signupPayload = JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            });

            await signup(signupPayload, 'POST').then(response => response.json())
                .then(response => {
                    if (response.access_token) {
                        loadingIndicator(false);
                        AsyncStorage.setItem('access_token', response.access_token);
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{name: 'Shopping List'}],
                        })
                        //For now email confirmation is disabled. but we will keep this logic for future when we start
                        //it again
                        // this.props.navigation.reset({
                        //     index: 0,
                        //     routes: [{name: 'Login', params: {'waitConfirm': true}}]
                        // });
                    } else if (response.errors) {
                        loadingIndicator(false);
                        this.setState({showMessage: true})

                        const restErr = JSON.stringify(response.errors);
                        this.setState({restError: restErr.toString().substring(2, restErr.length - 2)})
                    }
                });

        } else {
            this.setState({errors: err})
        }
        return true;
    }

    render() {
        return (
            <View style={{...styles.container, alignItems: "center", justifyContent: "center"}}>

                <Text style={{fontSize: 30, fontWeight: "bold", color: "#4B4C4C"}}>{language('signup')}</Text>
                <Image
                    style={{height: 160, width: 160}}
                    source={require('../../../public/images/loginImage.png')}
                />
                <ErrorMessage showMessage={this.state.showMessage} message={this.state.restError}/>
                <View style={{justifyContent: "flex-start", alignSelf: "stretch"}}>
                    <Text>{language('name')}</Text>
                    <CustomInput
                        value={this.state.name}
                        errorMessage={this.state.errors.name}
                        bgColor={"#fff"}
                        isPassword={false}

                        callback={this.getResponseName.bind(this)}
                    />
                    <Text>{language('email')}</Text>

                    <CustomInput
                        value={this.state.email}
                        errorMessage={this.state.errors.email}
                        bgColor={"#fff"}
                        isPassword={false}

                        callback={this.getResponseEmail.bind(this)}
                    />
                    <Text >{language('password')}</Text>

                    <CustomInput
                        value={this.state.password}
                        errorMessage={this.state.errors.password}
                        bgColor={"#fff"}
                        isPassword={true}
                        callback={this.getResponsePassword.bind(this)}
                    />
                    <Text>{language('confirmPassword')}</Text>

                    <CustomInput
                        value={this.state.confirmPassword}
                        errorMessage={this.state.errors.confirmPassword}
                        bgColor={"#fff"}
                        isPassword={true}
                        callback={this.getResponseConfirmPassword.bind(this)}
                    />
                </View>
                <CustomButton
                    title={language('signup')}
                    txtColor={"#fff"}
                    bgColor={"#15A051"}
                    onPress={() => this._onPressButton(this.state)}
                />
                <View style={{flexDirection: "row"}}>
                    <Text>{language('youHaveAccount')} </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.boldTextButton}>{language('cameIn')}!</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
            ;
    }


}
