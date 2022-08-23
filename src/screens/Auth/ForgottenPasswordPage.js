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

export default class ForgottenPassword extends React.Component {

	constructor(props) {
		super(props);
		this.state = {email: "",  restError: '',errors:'', showMessage: false};
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
			await fetch('https://kulinarcho.com/api/forgotenPassword', {
				method: 'POST',
				body: JSON.stringify({
					email: this.state.email,
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

				<Text style={{fontSize: 35, fontWeight: "bold", color: "#4B4C4C"}}>{language('forgottenPassword')}</Text>
				<Image
					style={{height: 260, width: 270}}
					source={require('../../../public/images/loginImage.png')}
				/>
				<ErrorMessage showMessage={this.state.showMessage} message = {this.state.restError} />
				{this.showMessageConfirmEmail()}
				<Text style={{marginLeft: 10}}>{language('email')}</Text>
				<CustomInput
					value={this.state.email}
					errorMessage={this.state.errors.email}
					isPassword={false}
					bgColor={"#fff"}
					color={'#15A051'}
					callback={this.getResponseEmail.bind(this)}
				/>
				<CustomButton
					title={language('send')}
					txtColor={"#fff"}
					bgColor={"#15A051"}
					onPress={() => this._onPressButton(this.state)}
				/>
				<TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
					<Text style={styles.boldTextButton}>{language('backTo')} {language('enter')}!</Text>
				</TouchableHighlight>


			</View>
		);
	}
}