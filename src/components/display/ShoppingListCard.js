import {TouchableOpacity, Text, Image, StyleSheet, View} from "react-native";
import styles from "../../styles/styles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";

export const ShoppingListCard = ({ onPress, bgColor, title, numItems, onPressEdit }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.customButton,
            shoppingListStyle.card,
            {
                backgroundColor: bgColor,
            }]}>
        <View style={shoppingListStyle.cardText}>
            <Text style={shoppingListStyle.cardSubHeading}>{numItems} артикула</Text>
            <Text style={shoppingListStyle.cardTitle}>{title}</Text>
        </View>
        <View style={shoppingListStyle.editContainer}>
            <TouchableOpacity onPress={onPressEdit}>
                <Ionicons name="create-outline" size={35} style={shoppingListStyle.editButton}/>
            </TouchableOpacity>
            <Image source={require('../../../public/images/icons/ion_receipt.png')} style={shoppingListStyle.receipt}/>
        </View>

    </TouchableOpacity>
);

