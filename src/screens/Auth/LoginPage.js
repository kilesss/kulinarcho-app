import React from "react";
import {Button, Image, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/CustomButton"


export default function LoginPage({ navigation }) {
	return (

		<View style={styles.container}>

			<Text style={{fontSize: 40, fontWeight:"bold", color:"#4B4C4C"}}>Влизане</Text>
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
			<Text style={{paddingBottom: 15}}>Забравена Парола</Text>

			<CustomButton
				title={"Вход"}
				txtColor={"#fff"}
				bgColor={"#15A051"}
				onPress={() => navigation.reset({
				index: 0,
				routes: [{name: 'Shopping List'}],
			})}/>
			<Text style={{fontSize:16}}>или</Text>
			<CustomButton
				title={"Facebook"}
				txtColor={"#fff"}
				bgColor={"#006AD9"}
				onPress={() => navigation.navigate('Signup')}/>

			<CustomButton
				title={"Регистрирация"}
				txtColor={"#15A051"}
				bgColor={"#fff"}
				onPress={() => navigation.navigate('Signup')}/>

		</View>
	);
}