import {SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {categories2, recipes} from "../RecipesPage/RecepiesPage";
import {ListCard} from "../../components/display/ListCard";
import React, {useEffect, useState} from "react";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSmall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories, getSingleWeeklyMenu} from "../../RestRequests/generalRequest";
import renderLoading from "../../components/loading/ShowLoader";
import {getIconInfo} from "../../components/HelpFunctions";

export default function DetailsScreen({route, navigation}) {

    const {id} = route.params;

    const [day, changeDay] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    const [menuDetails, setMenuDetails] = useState([]);
    const [categories, setCategories] = useState()

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getSingleWeeklyMenu('GET', value, id).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setMenuDetails(result[1])
                    }

                }).catch((err) => {
                    console.log(err);
                });
                getCategories('GET', value).then(data => {
                    if (data) {
                        const categories = Object.values(data);
                        setCategories(categories)
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
        renderLoading(showLoader,
            <View style={{flex:1}}>
            <ScrollView  style={{}}>
                <View style={{ flex: 1,
                    marginLeft: 20,
                    marginTop: 10,
                    marginRight: 20,
                    marginBottom: 15, }}>

                {menuDetails.map((recipe) => {
                    return (
                        <View>

                            {renderDays(recipe.day)}
                            <RecipesCardSmall title={recipe.title}
                                              category={getIconInfo(recipe.categories)}
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
            </View>
    ));
}
