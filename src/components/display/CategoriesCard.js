import {TouchableOpacity, Text, Image, View} from "react-native";
import styles from "../../styles/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {stylesRecipes} from "../../styles/stylesRecipes";



export default function CategoriesCard({
                                           onPress,
                                           title,
                                           imageUrl,
                                           color,
                                           buttonSize=65,
                                           iconSize=40,
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
                        backgroundColor: `${color}4c`,
                        height: buttonSize,
                        width: buttonSize,
                    }]}>
                <Image
                    source={imageUrl}
                    style={{height: iconSize, width: iconSize}} />
            </TouchableOpacity>
            {renderElement()}
        </View>
    );
}


