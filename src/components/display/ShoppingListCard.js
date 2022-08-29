import {TouchableOpacity, Text, Image, View} from "react-native";
import styles from "../../styles/styles";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {LinearGradient} from "expo-linear-gradient";


export const ShoppingListCard = ({onPress, bgColor, title, numItems, onPressEdit}) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.customButton, {marginBottom: 5}
        ]}>
        <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            colors={[bgColor, bgColor + "99"]}
            style={[shoppingListStyle.card,
                {
                    borderRadius: 8,
                    paddingVertical: 20,
                }]}
        >
            <View style={shoppingListStyle.cardText}>
                <Text style={shoppingListStyle.cardSubHeading}>{numItems} артикула</Text>
                <Text style={shoppingListStyle.cardTitle}>{title}</Text>
            </View>

            <View style={shoppingListStyle.editContainer}>
                <Image source={require('../../../public/images/icons/ion_receipt.png')}
                       style={shoppingListStyle.receipt}/>
                <TouchableOpacity onPress={onPressEdit}>
                    <Ionicons name="create-outline" size={35} style={shoppingListStyle.editButton}/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </TouchableOpacity>
);

