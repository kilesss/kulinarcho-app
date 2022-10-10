import {FlatList, SafeAreaView, Text, View} from "react-native";
import styles from "../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories, getLatestRecipes, getPublicRecipes} from "../../RestRequests/generalRequest";
import React, {useEffect, useState} from "react";
import {getIconInfo} from "../../components/HelpFunctions";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import renderLoading from "../../components/loading/ShowLoader";
import {useIsFocused} from "@react-navigation/native";

export default function AllRecipes({route, navigation}) {
    const isFocused = useIsFocused()

    const {categoryID, ownRecipe} = route.params;

    const [recipes, setRecipes] = useState([])
    const [showLoader, setShowLoader] = useState(true);
    const [showLoader2, setShowLoader2] = useState(false);
    const [DemoToken, setDemoToken] = useState(true);
    const [lastPage, setLastPage] = useState()
    const [page, setPage] = useState(1)

    function loadData() {
        setShowLoader2(true)

        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                let ownRecipeLocal = ownRecipe;
                let title = '';
                if(route.params.searchString !== undefined){
                    title = route.params.searchString;
                }
                if(route.params.ownRecipe !== undefined){
                    if (route.params.ownRecipe === 1){
                        ownRecipeLocal = 1;
                    }else {
                        ownRecipeLocal = 0;
                    }
                }
                getPublicRecipes('GET', value, page, title, categoryID, ownRecipeLocal).then(data => {
                    if (data) {
                        const result = Object.values(data);

                        setRecipes(result[0])
                    }
                }).catch((err) => {console.log(err)});
            }
        }, []);
    }

    function loadMore() {
        setShowLoader2(true)
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getPublicRecipes('GET', value, page, "", categoryID, ownRecipe).then(data => {
                    if (data) {
                        const result = Object.values(data);

                        setRecipes([...recipes, ...result[0]])
                        setLastPage(result[2])
                        setShowLoader2(false)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadMore();
    }, [page]);

    useEffect(() => {
        setRecipes([])
        setPage(1)
        loadData();
    }, [isFocused]);

    const fetchMore = () => {
        if(page !== lastPage){
            setPage(page + 1)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Всички Рецепти</Text>
            <SafeAreaView style={{ alignSelf: "stretch", paddingBottom: 40}}>

            <FlatList
                data={recipes}
                keyExtractor={(item, index) => item.id}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={renderLoading(showLoader2)}
                renderItem={({item}) => (
                    <RecipesCardSmall title={item.title}
                                      category={getIconInfo(item.categories)}
                                      time={item.all_time}
                                      servings={item.portion}
                                      photo={item.photo}
                                      onPress={() => navigation.navigate("Recipe Details", {recipeId: item.id})}
                    />
                )}/>
            </SafeAreaView>
        </View>
    )
}
