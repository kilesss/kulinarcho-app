import {TouchableOpacity, Text, Image, View} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {stylesRecipes} from "../../styles/stylesRecipes";


export const RecipesCardLarge = ({title, time, servings, category}) => (
        <TouchableOpacity
            style={[stylesRecipes.recipesCard]}
        >
            <Image source={require('../../../public/images/recipe.png')}
                   style={stylesRecipes.recipesCardImage}
            />
            <View style={stylesRecipes.recipesCardInfo}>
                <Text style={stylesRecipes.recipesCardTitle}>{title}</Text>
                <View style={stylesRecipes.cardInfoInsideContainer}>
                    <View style={stylesRecipes.infoIconsWithText}>
                        <MaterialCommunityIcons name={"progress-clock"} color={"#fff"} size={20}/>
                        <Text style={stylesRecipes.infoSmallText}>30 min</Text>
                    </View>
                    <View style={stylesRecipes.infoIconsWithText}>
                        <MaterialCommunityIcons name={"pot-mix-outline"}
                                                color={"#fff"} size={23}
                                                style={{marginTop: -3}}/>
                        <Text style={stylesRecipes.infoSmallText}>5 servings</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
);

