import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './../styles/styles'

const CookingBook = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>cooking book Screen!</Text>
			<Ionicons name="md-settings-outline" size={80} color="#006600" />
		</View>
	);
};

export default CookingBook;
