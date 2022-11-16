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
import ExampleAdd from "../../components/ExampleAdd";


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
                <ExampleAdd height={70}/>
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
