import React from 'react';

import {Image, Text, TouchableHighlight, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton"
import CustomInput from '../../components/display/CustomInput';
import validateFields from "../../validator/Validator";
import language from '../../language/language';
import loadingIndicator from "../../components/loading/loadingIndicator";
import ErrorMessage from "../../components/display/ErrorMessage";
export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: "", password: "", errors: '', restError: '', showWait: false, showMessage: false};
        if (this.props.route.params !== undefined) {
            if (this.props.route.params.waitConfirm !== undefined && this.props.route.params.waitConfirm === true) {
                this.state.showWait = true;
            }
        }
        // to not fill every time
        //TODO: delete before production : bad practise but simple to use
        this.state = {email: "lmariqnov@gmail.com", password: "qwerty2", errors: '', restError: ''};
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('access_token');
        //TODO: its need to make api call and to check is it actual this token or its expired. If expired need to
        //TODO: login again
        //TODO: maybe is good to check this if after we add logout function
        if (token === null || token.length > 0) {
            // this.props.navigation.reset({
            //     index: 0,
            //     routes: [{name: 'Shopping List'}],
            // })
        }
    }

    cleanErrors() {
        this.setState({errors: {}})
        this.setState({restError: ''})

    }

    getResponseEmail(result) {
        this.cleanErrors();
        this.setState({email: result});
    }

    getResponsePassword(result) {
        this.cleanErrors();
        this.setState({password: result});
    }

    async _onPressButton(state) {
        this.cleanErrors();
        const err = validateFields(
            {'email': state.email, 'password': state.password},
            {'email': {required: true, email: true}, 'password': {required: true, min: 6}}
        );
        if (Object.keys(err).length === 0) {
            await fetch('https://kulinarcho.com/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }), headers: {
                    //Header Defination
                    'Content-Type': 'application/json',
                },
            }).then(response => response.json())
                .then(response => {
                        if (response.access_token) {
                            loadingIndicator(false);
                            AsyncStorage.setItem('access_token', response.access_token);
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Shopping List'}],
                            })
                        } else if (response.errors) {
                            loadingIndicator(false);
                            this.setState({showMessage:true})
                            const restErr = JSON.stringify(response.errors);
                            this.setState({restError: restErr.substring(2, restErr.length - 2)})
                        }
                    }
                ).catch(error => {
                    loadingIndicator(false);
                    console.log('ERROR:::::');
                    console.log(error);
                });
        } else {
            this.setState({errors: err})
        }
        return true;
    }

    showMessageConfirmEmail() {
        if (this.state.showWait === true){
            return <Text style={{marginLeft: 10,fontSize:15,width:'80%', color: 'blue'}}>{language('waitConfirmEmail')}</Text>
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={{fontSize: 30, fontWeight: "bold", color: "#4B4C4C"}}>{language('enter')}</Text>
                <Image
                    style={{height: 200, width: 200}}
                    source={require('../../../public/images/loginImage.png')}
                />
                {/*Maybe it will be good to make component to render errors , some fancy popup messages or something
                like that, but for now i will leave it like this */}
                <ErrorMessage showMessage={this.state.showMessage} message = {this.state.restError} />
                {this.showMessageConfirmEmail()}
                <Text style={{marginLeft: 10}}>{language('name')}</Text>
                <CustomInput
                    value={this.state.email}
                    errorMessage={this.state.errors.email}
                    bgColor={"#fff"}
                    isPassword={false}

                    callback={this.getResponseEmail.bind(this)}
                />
                <Text>{language('password')}</Text>

                <CustomInput
                    value={this.state.password}
                    errorMessage={this.state.errors.password}
                    isPassword={true}
                    bgColor={"#fff"}
                    color={'#15A051'}
                    callback={this.getResponsePassword.bind(this)}
                />
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Forgotten Password')}>
                <Text style={styles.boldTextButton}>{language('forgottenPassword')}!</Text>
                </TouchableHighlight>
                <CustomButton
                    title={language('enter')}
                    txtColor={"#fff"}
                    bgColor={"#15A051"}
                    onPress={() => this._onPressButton(this.state)}
                />

                <Text style={{fontSize: 16}}>{language('or')}</Text>
                <CustomButton
                    title={language('facebook')}
                    txtColor={"#fff"}
                    bgColor={"#006AD9"}
                    onPress={() => this.props.navigation.navigate('Signup')}/>

                <CustomButton
                    title={language('signup')}
                    txtColor={"#15A051"}
                    bgColor={"#fff"}
                    onPress={() => this.props.navigation.navigate('Signup')}/>

            </View>
        );
    }
}