import React from 'react';

import {Image, Text, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "../../styles/styles";
import {CustomButton} from "../../components/CustomButton"
import CustomInput from '../../components/CustomInput';
import validateFields from "../../validator/Validator";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", errors: '', restError: ''};
        // to not fill every time
        //TODO: delete before production : bad practise but simple to use
        // this.state = {email: "lmariqnov@gmail.com", password: "qwerty2", errors: '', restError: ''};
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('access_token');
        //TODO maybe is good to check this if after we add logot function
        if (token.length > 0) {
            this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Shopping List'}],
            })
        }

    }

    getResponseEmail(result) {
        this.setState({errors: {}})
        this.setState({restError: ''})
        this.setState({email: result});
    }

    getResponsePassword(result) {
        this.setState({errors: {}})
        this.setState({restError: ''})
        this.setState({password: result});
    }

    async _onPressButton(state) {
        this.setState({errors: {}})
        this.setState({restError: ''})

        const err = validateFields(
            {'email': state.email, 'password': state.password},
            {'email': {required: true, email: true}, 'password': {required: true, min: 6}}
        );

        if (err.length === 0 || err.length === undefined) {
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
                            AsyncStorage.setItem('access_token', response.access_token);
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{name: 'Shopping List'}],
                            })
                        } else if (response.errors) {
                            const restErr = JSON.stringify(response.errors);
                            this.setState({restError: restErr.substring(2, restErr.length - 2)})
                        }
                    }
                ).catch(error => {
                    console.log('ERROR:::::');
                    console.log(error);
                });
        } else {
            this.setState({errors: err})
        }
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40, fontWeight: "bold", color: "#4B4C4C"}}>Влизане</Text>
                <Image
                    style={{height: 260, width: 270}}
                    source={require('../../../public/images/loginImage.png')}
                />
                {/*Maybe it will be good to make component to render errors , some fancy popup messages or something
                like that, but for now i will leave it like this */}
                <Text style={{marginLeft: 10, color: 'red'}}>{this.state.restError}</Text>
                <Text style={{marginLeft: 10}}>Име</Text>
                <CustomInput
                    setValue={this.state.email}
                    value={this.state.email}
                    errorMessage={this.state.errors.email}
                    bgColor={"#fff"}
                    isPassword={false}
                    color={'#15A051'}
                    callback={this.getResponseEmail.bind(this)}
                />
                <Text>Парола</Text>

                <CustomInput
                    setValue={this.state.password}
                    value={this.state.password}
                    errorMessage={this.state.errors.password}
                    isPassword={true}
                    bgColor={"#fff"}
                    color={'#15A051'}
                    callback={this.getResponsePassword.bind(this)}
                />

                <CustomButton
                    title={"Вход"}
                    txtColor={"#fff"}
                    bgColor={"#15A051"}
                    onPress={() => this._onPressButton(this.state)}
                />
                <Text style={{fontSize: 16}}>или</Text>
                <CustomButton
                    title={"Facebook"}
                    txtColor={"#fff"}
                    bgColor={"#006AD9"}
                    onPress={() => this.props.navigation.navigate('Signup')}/>

                <CustomButton
                    title={"Регистрирация"}
                    txtColor={"#15A051"}
                    bgColor={"#fff"}
                    onPress={() => this.props.navigation.navigate('Signup')}/>

            </View>
        );
    }
}