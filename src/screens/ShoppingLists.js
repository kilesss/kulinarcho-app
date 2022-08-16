import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './../styles/styles'
const ShoppingList = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ShoppingList Screen!</Text>
			<Ionicons name="md-home" size={80} color="#006600" />
		</View>
	);
};

export default ShoppingList;
