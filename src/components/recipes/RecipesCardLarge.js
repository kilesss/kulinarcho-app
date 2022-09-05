import {TouchableOpacity, Text, Image, View} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {stylesRecipes} from "../../styles/stylesRecipes";
import language from "../../language/language";
import CategoriesCard from "../display/CategoriesCard";


export const RecipesCardLarge = ({onPress, title, time, servings, category}) => (
        <TouchableOpacity onPress={onPress}
            style={[stylesRecipes.recipesCard]}
        >

            <Image source={require('../../../public/images/recipe.png')}
                   style={stylesRecipes.recipesCardImage}
            />
            <View style={stylesRecipes.recipesCardCategory}>
                <CategoriesCard
                    color={category.color}
                    imageUrl={category.image}
                    buttonSize={40}
                    iconSize={33}
                    showText={false}
                />
            </View>
            <View style={stylesRecipes.recipesCardInfo}>
                <Text style={stylesRecipes.recipesCardTitle}>{title}</Text>
                <View style={stylesRecipes.cardInfoInsideContainer}>
                    <View style={stylesRecipes.infoIconsWithText}>
                        <MaterialCommunityIcons name={"progress-clock"} color={"#fff"} size={20}/>
                        <Text style={stylesRecipes.infoSmallText}>{time} {language("min")}</Text>
                    </View>
                    <View style={stylesRecipes.infoIconsWithText}>
                        <MaterialCommunityIcons name={"pot-mix-outline"}
                                                color={"#fff"} size={23}
                                                style={{marginTop: -3}}/>
                        <Text style={stylesRecipes.infoSmallText}>{servings} {language("servings")}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
);

