import {TouchableOpacity, Text, Image, View} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {stylesRecipes} from "../../styles/stylesRecipes";
import language from "../../language/language";
import CategoriesCard from "../display/CategoriesCard";
import styles from "../../styles/styles";


export const RecipesCardSmall = ({onPress, title, time, servings, category, liked}) => (
    <View style={[stylesRecipes.recipesCardSmall]}>

        <Image source={require('../../../public/images/recipe.png')}
               style={stylesRecipes.recipesCardImageSmall}
        />

        <TouchableOpacity style={[stylesRecipes.recipesCardInfoSmall, {flex: 1}]}
                          onPress={onPress}
        >
            <Text style={[styles.heading, {marginBottom: 5, fontSize: 15, lineHeight: 17}]}>{title}</Text>
            <View style={stylesRecipes.recipesCardInfoSmallInner}>
                <View style={stylesRecipes.infoIconsWithText}>
                    <MaterialCommunityIcons name={"progress-clock"} color={"#999"} size={25}/>
                    <Text style={stylesRecipes.recipesCardSmallText}>{time} {language("min")}</Text>
                </View>
                <View style={stylesRecipes.infoIconsWithText}>
                    <MaterialCommunityIcons name={"pot-mix-outline"}
                                            color={"#999"} size={27}
                                            style={{marginTop: -3}}/>
                    <Text style={stylesRecipes.recipesCardSmallText}>{servings} {language("servings")}</Text>
                </View>
                <View style={stylesRecipes.infoIconsWithText}>
                    <MaterialCommunityIcons name={category.icon}
                                            color={category.color} size={27}
                                            style={{marginTop: -3}}/>
                    <Text style={stylesRecipes.recipesCardSmallText}>{category.title}</Text>
                </View>

            </View>

        </TouchableOpacity>

    </View>
);

