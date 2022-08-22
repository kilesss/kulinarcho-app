import {TouchableOpacity, Text, Image, StyleSheet, View} from "react-native";
import styles from "../../styles/styles";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {Ionicons} from "@expo/vector-icons";


export const ShoppingListItem = ({ onPress, title, tickColor, circleColor, price, num}) => (

    <TouchableOpacity
        onPress={onPress}
        style={[
            shoppingListStyle.item,
            {
                // backgroundColor: "#fff",
            }]}>
        <View style={[
            shoppingListStyle.checkBox, {backgroundColor: circleColor}]}>
            <Ionicons name={"checkmark-outline"} size={20} color={tickColor}/>
        </View>
        <View>
            <Text style={shoppingListStyle.itemTitle}>{title}</Text>
            <Text style={shoppingListStyle.itemSubHeading}>{price} x {num} = 3лв</Text>
        </View>

    </TouchableOpacity>
);

