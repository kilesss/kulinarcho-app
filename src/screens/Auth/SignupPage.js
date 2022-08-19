import React from "react";
import {Button, Text, View} from "react-native";
import styles from "../../styles/styles";

export default function LoginPage({ navigation }) {
	return (
		<View style={styles.container}>

			<Text style={{fontSize: 30}}>SIGN UP PAGE</Text>
			<Button title={"Sign Up"}></Button>
			<Button title={"Back to Log In"}></Button>
		</View>
	);
}