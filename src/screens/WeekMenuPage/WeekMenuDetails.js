import {SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {recipes} from "../RecipesPage/RecepiesPage";
import {ListCard} from "../../components/display/ListCard";
import React from "react";
import {RecipesCardSmall} from "../../components/display/RecipesCardSamll";

export default function DetailsScreen({navigation}) {
    const menuDetails = [
        {date: "26/08/2022", recipes: recipes.slice(0, 1)},
        {date: "27/08/2022", recipes: recipes.slice(0, 3)},
        {date: "28/08/2022", recipes: recipes.slice(0, 2)},
        {date: "29/08/2022", recipes: recipes.slice(0, 1)},
        {date: "30/08/2022", recipes: recipes.slice(0, 1)},
        {date: "31/08/2022", recipes: recipes.slice(0, 1)},
    ]
    return (
        <ScrollView>
            <View style={{...styles.container, alignItems: "flex-start", justifyContent: "flex-start"}}>

                {menuDetails.map((item) => {
                    return (
                        <View>
                            <Text style={styles.heading}>{item.date}</Text>
                            {item.recipes.map((recipe) => {
                                return (
                                    <RecipesCardSmall title={recipe.title}
                                                      liked={recipe.liked}
                                                      time={recipe.time}
                                                      servings={recipe.servings}
                                                      category={recipe.category}
                                                      onPress={() => {
                                                          navigation.push("Recipe Details")
                                                      }}
                                    />
                                );
                            })}
                        </View>
                    );
                })}

            </View>
        </ScrollView>
    );
}
