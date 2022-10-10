import {TouchableOpacity, Text, Image, View} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {stylesRecipes} from "../../styles/stylesRecipes";
import language from "../../language/language";
import CategoriesCard from "../display/CategoriesCard";
import Images from "../../../public/images";


export const RecipesCardLarge = ({onPress, title, time, servings, category, photo, margin = 0}) => (
        <TouchableOpacity onPress={onPress}
            style={{...stylesRecipes.recipesCard, marginHorizontal: margin}}
        >

            <Image source={
                photo ? {uri: 'https://kulinarcho.com' + photo} : Images.defaultProfile
            }
                   style={stylesRecipes.recipesCardImage}
            />
            <View style={stylesRecipes.recipesCardCategory}>
                <Image source={category ? category.image : Images.icons.groups} style={stylesRecipes.categoryIcon}/>
            </View>
            <View style={stylesRecipes.recipesCardInfo}>
                <Text style={stylesRecipes.recipesCardTitle}>{title}</Text>
                <View style={stylesRecipes.cardInfoInsideContainer}>
                    <View style={stylesRecipes.infoIconsWithText}>
                        <MaterialCommunityIcons name={"progress-clock"} color={"#fff"} size={20}/>
                        <Text style={stylesRecipes.infoSmallText}>{time ? time : '∅'} {language("min")} </Text>
                    </View>
                    <View style={stylesRecipes.infoIconsWithText}>

                        <MaterialCommunityIcons name={"pot-mix-outline"}
                                                color={"#fff"} size={21}
                                                style={{marginTop: -3}}/>
                        <Text style={stylesRecipes.infoSmallText}>{servings ? servings : '∅'} {language("servings")}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
);

