import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		// replace instead of navigate
		props.navigation.navigate('ShoppingListsPage');

	}
	render(props) {
		return (
			<View style={{ flex: 3, backgroundColor: 'white' }}>
				<Button onPress={() => this.props.navigation.navigate('ShoppingListsPage')} title={"opa"}/>
				<Text style={{ color: "#006600", fontSize: 40, }}>login!</Text>
				<Ionicons name="md-home" size={80} color="#006600"/>
				<View style={{ flex: 11, backgroundColor:'white'}}></View>
				
			</View>
		);
	};
};

export default LoginPage;
