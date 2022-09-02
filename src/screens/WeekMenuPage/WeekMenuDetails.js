import {SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {categories, recipes} from "../RecipesPage/RecepiesPage";
import {ListCard} from "../../components/display/ListCard";
import React, {useEffect, useState} from "react";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSingleWeeklyMenu} from "../../RestRequests/generalRequest";
import renderLoading from "../../components/loading/ShowLoader";

export default function DetailsScreen({route, navigation}) {

    const {id} = route.params;

    const [day, changeDay] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    const [menuDetails, setMenuDetails] = useState([]);
    const category = {key: "3", title: "С Месо", icon: "food-drumstick", color: "#842F00"}

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getSingleWeeklyMenu('GET', value, id).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setMenuDetails(result[1])
                        setShowLoader(false);
                    }

                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadData();

    }, []);

    let date = 0;

    function renderDays(recipeDay) {

        if (date !== recipeDay) {
            date = recipeDay
            return <Text style={styles.heading}>Ден {recipeDay}</Text>
        }

    }

    return (
        renderLoading(showLoader, <ScrollView>
            <View style={{...styles.container, alignItems: "flex-start", justifyContent: "flex-start"}}>

                {menuDetails.map((recipe) => { console.log(recipe.title + recipe.RecipeId)
                    return (
                        <View>

                            {renderDays(recipe.day)}
                            <RecipesCardSmall title={recipe.title}
                                              category={category}
                                              time={recipe.all_time}
                                              servings={recipe.portion}
                                              photo={recipe.photo}
                                              onPress={() => navigation.navigate("Recipe Details", {recipeId: recipe.RecipeId})}
                            />

                        </View>
                    );
                })}

            </View>
        </ScrollView>
    ));
}
