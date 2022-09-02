import {SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {categories, recipes} from "../RecipesPage/RecepiesPage";
import {ListCard} from "../../components/display/ListCard";
import React, {useEffect, useState} from "react";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSingleWeeklyMenu} from "../../RestRequests/generalRequest";

export default function DetailsScreen({route, navigation}) {

    const {id} = route.params;

    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    const [menuDetails, setMenuDetails] = useState([]);

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

    // const menuDetails = [
    //     {date: "26/08/2022", recipes: recipes.slice(0, 1)},
    //     {date: "27/08/2022", recipes: recipes.slice(0, 3)},
    //     {date: "28/08/2022", recipes: recipes.slice(0, 2)},
    //     {date: "29/08/2022", recipes: recipes.slice(0, 1)},
    //     {date: "30/08/2022", recipes: recipes.slice(0, 1)},
    //     {date: "31/08/2022", recipes: recipes.slice(0, 1)},
    // ]
    return (
        <ScrollView>
            <View style={{...styles.container, alignItems: "flex-start", justifyContent: "flex-start"}}>

                {menuDetails.map((recipe) => {
                    return (
                        <View>
                            <Text style={styles.heading}>{recipe.day}</Text>
                            <Text >{recipe.title}</Text>
                            <Text >{recipe.portion}</Text>
                            <Text>{recipe.all_time}</Text>

                        </View>
                    );
                })}

            </View>
        </ScrollView>
    );
}
