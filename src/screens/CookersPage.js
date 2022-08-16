import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './../styles/styles'

class Cookers extends React.Component {

	render(props) {

		return (
			<View style={styles.container}>
				<Text style={styles.title}>cookers Screen!</Text>
				<Ionicons name="md-home" size={80} color="#006600" />
			</View>
		);
	};
};

export default Cookers;
