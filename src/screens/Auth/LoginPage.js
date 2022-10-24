import React from 'react';

import {Image, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';

import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton"
import CustomInput from '../../components/display/CustomInput';
import validateFields from "../../validator/Validator";
import language from '../../language/language';
import renderLoading from "../../components/loading/ShowLoader";
import ErrorMessage from "../../components/display/ErrorMessage";
import { login } from "../../RestRequests/generalRequest";
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "",
            password: "",
            errors: [],
            restError: '',
            showWait: false,
            showMessage: false,
            showLoader:false,
        };
        if (this.props.route.params !== undefined) {
            if (this.props.route.params.waitConfirm !== undefined && this.props.route.params.waitConfirm === true) {
                this.state.showWait = true;
            }
        }
        // to not fill every time
        // this.state = {email: "lmariqnov@gmail.com", password: "qwerty2", errors: '', restError: ''};
    }
      async facebookLogIn() {
        // try {
        await Facebook.initializeAsync({
            appId: '1106295049885077',
        });
        const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
            await response.json().then(async response => {

                const loginPayload =  JSON.stringify({
                    type: 'fb',
                    email: response.email,
                    name: response.name
                });
                await login(loginPayload, 'POST', this.props.navigation).then()
                    .then(response => {
                            if (response.first_login === 0) {
                                this.setState({showLoader: false})
                                AsyncStorage.setItem('access_token', response.access_token);
                            }
                            if (response.access_token) {
                                this.setState({showLoader: false})
                                /** Set JWT  **/
                                AsyncStorage.setItem('access_token', response.access_token);
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{name: 'Shopping List'}],
                                });
                                return;
                            }

                            if (response.errors) {
                                this.setState({showLoader: false})
                                this.setState({showMessage: true})
                                const restErr = JSON.stringify(response.errors);
                                this.setState({restError: restErr.substring(2, restErr.length - 2)})
                            }
                        }
                    ).catch(error => {
                        this.setState({showLoader: false})
                        console.log('ERROR:::::');
                        console.log(error);
                    });

            })
        } else {
            // type === 'cancel'
        }
        // } catch ({ message }) {
        //   alert(`Facebook Login Error: ${message}`);
        // }
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('access_token');
        console.log(token);
        if (token !== null && token.length > 0) {
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Shopping List'}],
            })
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
        this.setState({showLoader:true})
        const err = validateFields(
            {'email': state.email, 'password': state.password},
            {'email': {required: true, email: true}, 'password': {required: true, min: 6}}
        );

        if (Object.keys(err).length === 0) {

            const loginPayload = JSON.stringify({
          email: this.state.email,
          password: this.state.password
        });
        await login(loginPayload, 'POST', this.props.navigation).then()
          .then(response => {
              if(response.first_login === 0){
                  this.setState({showLoader:false})
                  AsyncStorage.setItem('access_token', response.access_token);
              }
              if (response.access_token) {
                  this.setState({showLoader:false})
                  /** Set JWT  **/
                  AsyncStorage.setItem('access_token', response.access_token);
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Shopping List' }],
                  });

                return;
              }

              if (response.errors) {
                  this.setState({showLoader:false})
                this.setState({showMessage:true})
                const restErr = JSON.stringify(response.errors);
                this.setState({ restError: restErr.substring(2, restErr.length - 2) })

                return;
              }
            }
          ).catch(error => {

                this.setState({showLoader:false})
              console.log('ERROR:::::');
              console.log(error);
          });
        } else {
            this.setState({showLoader:false})

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
        return renderLoading(this.state.showLoader,
            <View style={{...styles.container, alignItems: "center", justifyContent: "center"}}>

                <Text style={{fontSize: 30, fontWeight: "bold", color: "#4B4C4C"}}>{language('enter')}</Text>
                <Image
                    style={{height: 200, width: 200}}
                    source={require('../../../public/images/loginImage.png')}
                />
                {/*Maybe it will be good to make component to render errors , some fancy popup messages or something
                like that, but for now i will leave it like this */}
                <ErrorMessage showMessage={this.state.showMessage} message = {this.state.restError} />
                {this.showMessageConfirmEmail()}
                <View style={{justifyContent: "flex-start", alignSelf:"stretch"}}>
                    <Text>{language('name')}</Text>
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
                        callback={this.getResponsePassword.bind(this)}
                    />
                    <TouchableOpacity style={{marginTop:-20}}
                                        onPress={() => this.props.navigation.navigate('Forgotten Password')}>
                        <Text style={styles.boldTextButton}>{language('forgottenPassword')}!</Text>
                    </TouchableOpacity>
                </View>
                <CustomButton
                    title={language('enter')}
                    txtColor={"#fff"}
                    bgColor={"#15A051"}
                    onPress={() => this._onPressButton(this.state)}
                    // onPress={() => this.props.navigation.navigate('First Login')}
                />

                <Text style={{fontSize: 16}}>{language('or')}</Text>
                <CustomButton
                    title={language('facebook')}
                    txtColor={"#fff"}
                    bgColor={"#006AD9"}
                    onPress={() => this.facebookLogIn()}/>

                <CustomButton
                    title={language('signup')}
                    txtColor={"#15A051"}
                    bgColor={"#ffffff"}
                    onPress={() => this.props.navigation.navigate('Signup')}/>

            </View>
        );
    }
}
