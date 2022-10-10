import {TouchableOpacity, Text, Image, View} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import {stylesRecipes} from "../../styles/stylesRecipes";
import language from "../../language/language";
import CategoriesCard from "../display/CategoriesCard";
import styles from "../../styles/styles";
import Images from "../../../public/images";
import {getPublicIcon} from "../HelpFunctions";


export const RecipesCardSmall = ({onPress, title, time, servings, category, photo, publicStatus}) => (
    <View style={[stylesRecipes.recipesCardSmall]}>

        <Image source={
            photo ? {uri: 'https://kulinarcho.com' + photo} : Images.defaultRecipe}
               style={stylesRecipes.recipesCardImageSmall}
        />

        <TouchableOpacity style={[stylesRecipes.recipesCardInfoSmall, {flex: 1}]}
                          onPress={onPress}
        >
            <View style={{flex: 1, flexDirection: "row"}}>
            <Text style={[styles.heading, {marginBottom: 5, fontSize: 15, lineHeight: 17, textTransform: "capitalize", flex: 1}]}>{title}</Text>
            <Image source={getPublicIcon(publicStatus)} style={{height: 25, width: 25, marginRight: 5, marginTop: 5}}/>
            </View>
            <View style={stylesRecipes.recipesCardInfoSmallInner}>
                <View style={stylesRecipes.infoIconsWithTextSmall}>
                    <MaterialCommunityIcons name={"progress-clock"} color={"#999"} size={25}/>
                    <Text style={stylesRecipes.recipesCardSmallText}>{time ? time : '∅'} {language("min")}</Text>
                </View>
                <View style={stylesRecipes.infoIconsWithTextSmall}>
                    <MaterialCommunityIcons name={"pot-mix-outline"}
                                            color={"#999"} size={27}
                                            style={{marginTop: -3}}/>
                    <Text style={stylesRecipes.recipesCardSmallText}>{servings ? servings : '∅'} {language("servings")}</Text>
                </View>
                <View style={stylesRecipes.infoIconsWithTextSmall}>
                    <Image source={category ? category.image : Images.icons.groups} style={{height: 27, width: 27}}/>
                    <Text style={stylesRecipes.recipesCardSmallText}>{category ? category.title : ""}</Text>
                </View>

            </View>

        </TouchableOpacity>

    </View>
);

