import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from '../../styles/styles'
import CategoriesCard from "../../components/display/CategoriesCard";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import language from "../../language/language";
import {categories, getIconInfo, loadData, showConfirmDialog, showLoader} from "../../components/HelpFunctions";
import renderLoading from "../../components/loading/ShowLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories} from "../../RestRequests/generalRequest";

export default function CookingBookPage({navigation}) {

    const [recipes, setRecipes] = useState([
        {
            key: "1",
            title: "Some Recipe with more text than",
            time: "30",
            servings: "5",
            liked: true
        },
        {key: "2", title: "Some Recipe", time: 20, servings: 4, },
        {key: "3", title: "Some Recipe", time: 40, servings: 5,},
        {key: "4", title: "Some Recipe", time: 50, servings: 6,  },
        {key: "5", title: "Some Recipe", time: 40, servings: 5, },
        {key: "6", title: "Some Recipe", time: 30, servings: 5, },
        {key: "7", title: "Some Recipe", time: 30, servings: 5, },
        {key: "8", title: "Some Recipe", time: 30, servings: 5, },
        {key: "9", title: "Some Recipe", time: 30, servings: 5, }
    ])


    const [categories, setCategories] = useState()
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);


    useEffect(() => {
        loadData(setCategories, setShowLoader, setDemoToken);
    }, []);


    return (
        renderLoading(showLoader, <ScrollView>
            <View style={[styles.container, {alignItems: "flex-start", marginRight: 0}]}>
                <View style={{minHeight: 145}}>
                    <View>
                        <Text style={styles.heading}>{language("categories")}</Text>
                    </View>
                    <FlatList
                        data={categories}
                        horizontal={true}
                        renderItem={({item}) => (
                            <CategoriesCard
                                title={getIconInfo(item.id).title}
                                imageUrl={getIconInfo(item.id).image}
                                color={getIconInfo(item.id).color}
                                size={75}
                                showText={true}
                                onPress={() => {
                                    navigation.navigate("All Recipes", {categoryID: item.id, ownRecipe: 1})
                                }}
                            />
                        )}/>
                </View>


                <View style={{flex: 1, width: "100%", paddingRight: 20}}>
                    <Text style={[styles.heading]}>{language("popularRecipes")}</Text>
                    <SafeAreaView>
                        {recipes.map((recipe) => {
                            return (
                                <GestureHandlerRootView>
                                    <Swipeable
                                        renderRightActions={(progress, dragX) =>
                                            rightSwipeActions(progress, dragX, () => showConfirmDialog(() => console.log("Pressed Yes")), 79)}
                                    >
                                        <RecipesCardSmall title={recipe.title}
                                                          liked={recipe.liked}
                                                          time={recipe.time}
                                                          servings={recipe.servings}
                                                          category={getIconInfo(2)}
                                                          onPress={() => {
                                                              navigation.push("Recipe Details", {recipeId: 913})
                                                          }}
                                        />
                                    </Swipeable>
                                </GestureHandlerRootView>
                            );
                        })}
                    </SafeAreaView>
                </View>
            </View>
        </ScrollView>)
    );
}
