import {TouchableOpacity, Text, Image, View} from "react-native";
import styles from "../../styles/styles";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {LinearGradient} from "expo-linear-gradient";


export const ListCard = ({onPress, bgColor, title, numItems, onPressEdit, iconName, period,weekMenu}) => (
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
                <Text style={shoppingListStyle.cardSubHeading}>{numItems ? `${numItems} артикула` : period}</Text>
                <Text style={shoppingListStyle.cardTitle}>{title}</Text>
            </View>

            <View style={shoppingListStyle.editContainer}>
                <Ionicons name={iconName}
                          size={100}
                          color={"rgba(255,255,255,0.4)"}
                          style={shoppingListStyle.receipt}/>
                <TouchableOpacity onPress={onPressEdit}>
                    <Ionicons name="create-outline" size={35} style={shoppingListStyle.editButton}/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </TouchableOpacity>
);

