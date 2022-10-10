import React, {useEffect, useState} from "react";
import {Button, FlatList, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import {stylesRecipes} from '../../styles/stylesRecipes'
import CategoriesCard from "../../components/display/CategoriesCard";
import {RecipesCardLarge} from "../../components/recipes/RecipesCardLarge";
import language from "../../language/language";
import Images from '../../../public/images/index';
import {getIconInfo} from "../../components/HelpFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories, getLatestRecipes, getSingleRecipe} from "../../RestRequests/generalRequest";
import renderLoading from "../../components/loading/ShowLoader";
import { FloatingAction } from "react-native-floating-action";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";
import FloatingActionButton from "../../components/display/FloatingActionButton";

export const actions = [
    {
        text: "Добави Списък за Пазар",
        icon: Images.navIcons.shoppingLists,
        name: "addList",
        position: 2,
        color: "#15a051",
        buttonSize: 43,
    },
    {
        text: "Добави Рецепта",
        icon: Images.navIcons.recipes,
        name: "bt_accessibility",
        position: 1,
        color: "#15a051",
        buttonSize: 43,
    },
];

export const categories2 = [
    {key: "1", title: "Риба", icon: "fish", color: "#0088C2"},
    {key: "2", title: "Напитки", icon: "glass-cocktail", color: "#DC00E0"},
    {key: "3", title: "С Месо", icon: "food-drumstick", color: "#842F00"},
    {key: "4", title: "Салати", icon: "leaf", color: "#0fc45b"},
    {key: "5", title: "Супи", icon: "bowl-outline", color: "#FF7410"},
    {key: "6", title: "Десерти", icon: "cake-variant-outline", color: "#d70101"},
]

export const recipes = [
    {key: "1", title: "Some Recipe with more text than usual", time: "30", servings: "5", category: categories2[1]},
    {key: "2", title: "Some Recipe", time: 20, servings: 4, category: categories2[2]},
    {key: "3", title: "Some Recipe", time: 40, servings: 5, category: categories2[3]},
    {key: "4", title: "Some Recipe", time: 50, servings: 6, category: categories2[5]},
    {key: "5", title: "Some Recipe", time: 40, servings: 5, category: categories2[1]},
    {key: "6", title: "Some Recipe", time: 30, servings: 5, category: categories2[2]},
    {key: "7", title: "Some Recipe", time: 30, servings: 5, category: categories2[4]}
]


export default function RecipesPage( {route,navigation}) {

    const [categories, setCategories] = useState()
    const [recipesNew, setRecipesNew] = useState()
    const [recipesRandom, setRecipesRandom] = useState()
    const [recipesPopular, setRecipesPopular] = useState()
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

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
            }
        }, []);
    }

    useEffect(() => {

        loadData();

    }, []);

    const [addModalVisible, setAddModalVisible] = useState(false);

    return (
        renderLoading(showLoader, <View><ScrollView>
            <View style={[styles.container, {alignItems: "flex-start", marginRight: 0}]}>
                <View style={{flex: 1.3, minHeight: 145}}>
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

                <View style={{flex: 2, minHeight: 250}}>
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

                <View style={{flex: 3, minHeight: 250}}>
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

                <View style={{flex: 3, minHeight: 250}}>
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
        </ScrollView>
            <FloatingActionButton navigation={navigation} addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible}/>
            <AddShoppingListModal modalVisible={addModalVisible}
                                  setModalVisible={setAddModalVisible}
                                  token = {DemoToken}
                                  modalTitle={language("newShoppingList")}
                                  buttonTitle={language("add")}
                                  showDeleteOption={false}
                                  goBack={() => navigation.navigate("Shopping List")}
            />
        </View>)
    );
}
