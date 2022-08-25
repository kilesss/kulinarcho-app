import {TouchableOpacity, Text, Image, View} from "react-native";
import styles from "../../styles/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {stylesRecipes} from "../../styles/stylesRecipes";


export const CategoriesCard = ({title, iconName, color}) => (
    <View style={stylesRecipes.categoriesCard}>
        <TouchableOpacity
            style={[
                stylesRecipes.card,
                stylesRecipes.categoriesCardIcon,
                {
                    backgroundColor: `${color}35`,
                }]}>
            <MaterialCommunityIcons name={iconName}
                                    size={42}
                                    color={color}
            />
        </TouchableOpacity>
        <Text>{title}</Text>
    </View>
);

