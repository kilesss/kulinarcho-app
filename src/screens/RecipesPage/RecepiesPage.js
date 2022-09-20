import React, {useEffect, useState} from "react";
import {Button, FlatList, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import {stylesRecipes} from '../../styles/stylesRecipes'
import CategoriesCard from "../../components/display/CategoriesCard";
import {RecipesCardLarge} from "../../components/recipes/RecipesCardLarge";
import language from "../../language/language";
import Images from '../../../public/images/index';
import {getIconInfo} from "../../components/HelpFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories, getLatestRecipes, getPublicRecipes, getSingleRecipe} from "../../RestRequests/generalRequest";
import renderLoading from "../../components/loading/ShowLoader";
import LatestRecipesSection from "../../components/recipes/LatestRecipesSection";
import RecipesCardSmall from "../../components/recipes/RecipesCardSamll";
import {useFocusEffect} from "@react-navigation/native";
import RecipesSearchResult from "../../components/recipes/RecipesSearchResult";

export default function RecipesPage({route, navigation}) {

    let {search} = route.params;
    const [categories, setCategories] = useState()
    const [recipesNew, setRecipesNew] = useState()
    const [recipesRandom, setRecipesRandom] = useState()
    const [recipesPopular, setRecipesPopular] = useState()
    const [showLoader, setShowLoader] = useState(true);
    const [showLoader2, setShowLoader2] = useState(false);
    let [recipesResult, setRecipesResult] = useState([]);
    const [DemoToken, setDemoToken] = useState(true);

    const [lastPage, setLastPage] = useState()
    let [page, setPage] = useState(1)
    function fetchMore(){
        if (page < lastPage) {
            setPage(page + 1)
        }
    }

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getCategories('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setCategories(result)
                    }
                }).catch((err) => {
                    console.log(err);
                });

                getLatestRecipes('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setRecipesNew(result[0])
                        setRecipesRandom(result[1])
                        setRecipesPopular(result[2])
                        setShowLoader(false);
                    }
                }).catch((err) => {
                    console.log(err);
                });
                if (search) {
                    getPublicRecipes('GET', value, page, search).then(data => {
                        if (data) {
                            const result = Object.values(data);
                            setRecipesResult([...recipesResult, ...result[0]])
                            setLastPage(result[2])
                            setShowLoader2(false)
                        }

                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        }, []);
    }

    // useFocusEffect(()=> {
    //     setShowLoader(true)
    //     setRecipesResult([])
    //     console.log(recipesResult)
    //     loadData();
    //     console.log(recipesResult)
    // });


    useEffect(() => {
        setShowLoader2(true)
        console.log("current: " + page)
        loadData();
    }, [page]);


    useEffect(() => {
        setPage(1)
        setShowLoader(true)
        recipesResult = []
        loadData();
        return () => search =""
    }, [route]);



    return (
        renderLoading(showLoader,
            <View style={[styles.container, {alignItems: "flex-start", marginRight: 0}]}>
                <View style={{minHeight: 145}}>
                    <View>
                        <Text style={styles.heading}>{language("categories")}</Text>
                    </View>
                    <FlatList data={categories}
                              horizontal={true}
                              renderItem={({item}) => (
                                  <CategoriesCard title={getIconInfo(item.id).title}
                                                  imageUrl={getIconInfo(item.id).image}
                                                  color={getIconInfo(item.id).color}
                                                  showText={true}
                                                  onPress={() => {
                                                      navigation.navigate("All Recipes", {categoryID: item.id})
                                                  }}
                                  />
                              )}/>

                </View>

                {search ?
                    <RecipesSearchResult
                        navigation={navigation}
                        recipesResult={recipesResult}
                        fetchMore={() => fetchMore()}
                        showLoader2={showLoader2}
                    />
                    :
                    <LatestRecipesSection
                        navigation={navigation}
                        recipesPopular={recipesPopular}
                        recipesNew={recipesNew}
                        recipesRandom={recipesRandom}
                    />}

            </View>)
    );
}
