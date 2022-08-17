import React from "react";
import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import BottomMenu from './../components/BottomMenu.js'

class ShoppingList extends React.Component {

	constructor(props) {
		super(props);
		// navigation.navigate('LoginPage')
	}
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text style={{ color: "#006600", fontSize: 40 }}>ShoppingList Screen!</Text>
				<Ionicons name="md-home" size={80} color="#006600" />
				<View style={{flex:11, backgroundColor:'white'}}></View>
				<BottomMenu></BottomMenu>
			</View>
		);
	};
}


