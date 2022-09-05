import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {stylesRecipes} from "../../styles/stylesRecipes";
import React, {useState} from "react";
import {stylesCooks} from "../../styles/stylesCooks";
import {CustomButton} from "../../components/display/CustomButton";
import {recipes, categories2} from "../RecipesPage/RecepiesPage";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import {RecipesCardLarge} from "../../components/recipes/RecipesCardLarge";
import language from "../../language/language";


export default function CookerDetails({route, navigation}) {

    const { cook } = route.params;

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={stylesCooks.profileDetails}>
                <Image source={require("../../../public/images/bob.jpg")} style={stylesCooks.profileImage}/>
                <Text style={[styles.heading, {fontSize: 24, marginTop: 0, textAlign: "center"}]}>{cook.name}</Text>
                <Text style={stylesCooks.numRecipesText}>{cook.recipes} {language("recipes")}</Text>
                <CustomButton title={language("addToGroup")} padding={9} txtColor={"#fff"}/>

            </View>

            <SafeAreaView style={stylesCooks.profileRecipes}>
                {recipes.map((recipe,i) => {
                    return (
                        <View style={{margin: 5}}>
                            <RecipesCardLarge title={recipe.title}
                                              liked={recipe.liked}
                                              time={recipe.time}
                                              servings={recipe.servings}
                                              category={recipe.category}
                                              onPress={() => {
                                                  navigation.push("Recipe Details")
                                              }}
                            />
                        </View>
                    );
                })}
            </SafeAreaView>
        </View>
    </ScrollView>);
}
