import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'

export default function CookersPage({ navigation }) {
	return (
		<View style={styles.container}>
			<Ionicons name="people-outline" size={100} style={styles.bottomNavIcon} />
			<Text>Cooks Page</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Cooks Details')}
			/>
		</View>
	);
}