import {TouchableOpacity, Text, Image, View} from "react-native";
import styles from "../../styles/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {stylesRecipes} from "../../styles/stylesRecipes";



export default function CategoriesCard({
                                           onPress,
                                           title,
                                           iconName,
                                           color,
                                           buttonSize=75,
                                           iconSize=45,
                                           showText})
{
    function renderElement(){
    if(showText)
        return <Text style={styles.subHeading}>{title}</Text>;
    return null;
}

    return (
        <View style={stylesRecipes.categoriesCard}>
            <TouchableOpacity onPress={onPress}
                style={[
                    stylesRecipes.card,
                    stylesRecipes.categoriesCardIcon,
                    {
                        backgroundColor: `${color}4C`,
                        height: buttonSize,
                        width: buttonSize,
                    }]}>
                <MaterialCommunityIcons name={iconName}
                                        size={iconSize}
                                        color={color}
                />
            </TouchableOpacity>
            {renderElement()}
        </View>
    );
}


