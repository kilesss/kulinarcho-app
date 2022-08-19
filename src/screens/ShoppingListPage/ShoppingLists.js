import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'

export default function ShoppingListsPage({ navigation }) {
	return (
		<View style={styles.container}>
			<Ionicons name="cart-outline" size={100} style={styles.bottomNavIcon} />
			<Text>Shopping List Page</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Shopping List Details')}
			/>
		</View>
	);
}