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
import {getCategories, getPublicRecipes} from "../../RestRequests/generalRequest";
import {FloatingAction} from "react-native-floating-action";
import {actions} from "../RecipesPage/RecepiesPage";
import FloatingActionButton from "../../components/display/FloatingActionButton";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";

export default function CookingBookPage({navigation}) {


    const [recipes, setRecipes] = useState([])
    const [showLoader, setShowLoader] = useState(true);
    const [showLoader2, setShowLoader2] = useState(false);
    const [DemoToken, setDemoToken] = useState(true);
    const [lastPage, setLastPage] = useState()
    const [page, setPage] = useState(1)
    const [addModalVisible, setAddModalVisible] = useState(false);

    function loadRecipes() {
        setShowLoader2(true)
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getPublicRecipes('GET', value, page, "", 0, 1).then(data => {
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

    const fetchMore = () => {
        if(page !== lastPage){
            setPage(page + 1)
        }
    }


    const [categories, setCategories] = useState()

    useEffect(() => {
        loadData(setCategories, setShowLoader, setDemoToken);
    }, []);

    useEffect(() => {
        loadRecipes()
    }, [page]);

    return (
        renderLoading(showLoader,
            <View style={{flex: 1, justifyContent: "flex-start", alignItems: "flex-start", margin: 0}}>
                <View style={{marginLeft: 20, marginTop: 10, minHeight: 145}}>
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


                <View style={{flex: 1, width: "100%", paddingRight: 20, marginHorizontal: 20}}>
                    <Text style={[styles.heading]}>{language("popularRecipes")}</Text>
                    <FlatList
                        data={recipes}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingRight: 20}}
                        keyExtractor={item => item.id}
                        onEndReached={fetchMore}
                        onEndReachedThreshold={0.4}
                        ListFooterComponent={renderLoading(showLoader2)}
                        renderItem={({item}) => (
                                <RecipesCardSmall title={item.title}
                                                  photo={item.photo}
                                                  time={item.all_time}
                                                  servings={item.portion}
                                                  category={getIconInfo(2)}
                                                  onPress={() => {
                                                      navigation.push("Recipe Details", {recipeId: item.id})
                                                  }}
                                />
                    )
                    }/>
                </View>
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
