import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		props.navigation.navigate('ShoppingListsPage');

	}
	render(props) {
		return (
			<View style={{ flex: 3, backgroundColor: 'white' }}>
				<Text style={{ color: "#006600", fontSize: 40, }}>login!</Text>
				<Ionicons name="md-home" size={80} color="#006600" />
				<View style={{ flex: 11, backgroundColor:'white'}}></View>
				
			</View>
		);
	};
};

export default LoginPage;
