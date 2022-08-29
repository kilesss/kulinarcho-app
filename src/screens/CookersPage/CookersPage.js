import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'
import CookCard from "../../components/display/CookCard";

export default function CookersPage({ navigation }) {
	return (
		<View style={[styles.container, {justifyContent: "flex-start", alignItems: "flex-start"}]}>
			<Text style={styles.heading}>Cooks</Text>
			<CookCard name={"Bob Marley"} numRecipes={420}/>
		</View>
	);
}
