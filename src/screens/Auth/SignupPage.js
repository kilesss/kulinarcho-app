import React from "react";
import {Button, Image, Text, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/CustomButton";

export default function LoginPage({ navigation }) {
	return (
		<View style={styles.container}>

			<Text style={{fontSize: 40, fontWeight:"bold", color:"#4B4C4C"}}>Регистрация</Text>
			<Image
				style={{height: 260, width: 270}}
				source={require('../../../public/images/loginImage.png')}
			/>

			<CustomButton
				title={"..."}
				txtColor={"#15A051"}
				bgColor={"#fff"}
			/>

			<CustomButton
				title={"..."}
				txtColor={"#15A051"}
				bgColor={"#fff"}
			/>
			<CustomButton
				title={"..."}
				txtColor={"#15A051"}
				bgColor={"#fff"}
			/>


			<CustomButton
				title={"Регистрирация"}
				txtColor={"#fff"}
				bgColor={"#15A051"}
				onPress={() => navigation.reset({
					index: 0,
					routes: [{name: 'Shopping List'}],
				})}/>

			<Text>Вече имаш акаунт? Влез</Text>

		</View>
	);
}