import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './../styles/styles'


export default class CookingBook extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text style={{ color: "#006600", fontSize: 40 }}>cooking book Screen!</Text>
				<Ionicons name="md-settings-outline" size={80} color="#006600" />
			</View>
		);
	};
}
