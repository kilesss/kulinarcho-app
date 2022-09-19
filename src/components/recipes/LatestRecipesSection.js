import React from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import language from "../../language/language";
import {RecipesCardLarge} from "./RecipesCardLarge";
import {getIconInfo} from "../HelpFunctions";

function LatestRecipesSection({recipesPopular, recipesNew, recipesRandom, navigation}) {
    return (
        <View>
            <View style={{minHeight: 250}}>
                <Text style={styles.heading}>{language("popularRecipes")}</Text>
                <FlatList data={recipesPopular}
                          horizontal={true}
                          renderItem={({item}) => (
                              <View style={{marginRight: 10}}>
                                  <RecipesCardLarge title={item.title}
                                                    photo={item.photo}
                                                    time={item.all_time}
                                                    servings={item.portion}
                                                    category={getIconInfo(item.categories)}
                                                    onPress={() => {
                                                        navigation.navigate("Recipe Details", {recipeId: item.id})
                                                    }}
                                  />
                              </View>
                          )}/>
            </View>

            <View style={{minHeight: 250}}>
                <Text style={styles.heading}>{language("newRecipes")}</Text>
                <FlatList data={recipesNew}
                          horizontal={true}
                          renderItem={({item}) => (
                              <View style={{marginRight: 10}}>
                                  <RecipesCardLarge title={item.title}
                                                    photo={item.photo}
                                                    time={item.all_time}
                                                    servings={item.portion}
                                                    category={getIconInfo(item.categories)}
                                                    onPress={() => {
                                                        navigation.push("Recipe Details", {recipeId: item.id})
                                                    }}
                                  />
                              </View>
                          )}/>
            </View>

            <View style={{minHeight: 250}}>
                <Text style={styles.heading}>{language("randomRecipes")}</Text>
                <FlatList data={recipesRandom}
                          horizontal={true}
                          renderItem={({item}) => (
                              <View style={{marginRight: 10}}>
                                  <RecipesCardLarge title={item.title}
                                                    photo={item.photo}
                                                    time={item.all_time}
                                                    servings={item.portion}
                                                    category={getIconInfo(item.categories)}
                                                    onPress={() => {
                                                        navigation.push("Recipe Details", {recipeId: item.id})
                                                    }}
                                  />
                              </View>
                          )}/>
            </View>
        </View>
    );
}

export default LatestRecipesSection;
