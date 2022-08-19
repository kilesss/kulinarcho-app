import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'

export default function CookingBookPage({ navigation }) {
	return (
		<View style={styles.container}>
			<Ionicons name="book-outline" size={100} style={styles.bottomNavIcon} />
			<Text>Cooking Book Page</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Recipe Details')}
			/>
		</View>
	);
}