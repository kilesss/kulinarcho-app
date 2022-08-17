import React from "react";
import { Text, View } from "react-native";
import {BottomMenu} from '../components/BottomMenu'


export default class ShoppingList extends React.Component {

	render() {

		return (
			<View style={{ backgroundColor: 'red', flex: 1 }}>
				<BottomMenu></BottomMenu>
			</View>
		);

	}
};


