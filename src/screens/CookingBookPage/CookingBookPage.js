import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import styles from '../../styles/styles'
import CategoriesCard from "../../components/display/CategoriesCard";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSmall";
import language from "../../language/language";
import {getIconInfo, loadData} from "../../components/HelpFunctions";
import renderLoading from "../../components/loading/ShowLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getPublicRecipes} from "../../RestRequests/generalRequest";
import FloatingActionButton from "../../components/display/FloatingActionButton";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";
import {useIsFocused} from "@react-navigation/native";
import ExampleAdd from "../../components/ExampleAdd";

export default function CookingBookPage({navigation}) {

    const isFocused = useIsFocused()
    const [recipes, setRecipes] = useState([])
    const [showLoader, setShowLoader] = useState(true);
    const [showLoader2, setShowLoader2] = useState(false);
    const [DemoToken, setDemoToken] = useState(true);
    const [lastPage, setLastPage] = useState()
    const [page, setPage] = useState(1)
    const [addModalVisible, setAddModalVisible] = useState(false);

    function loadRecipes() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getPublicRecipes('GET', value, 1, "", 0, 1).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setRecipes(result[0])
                        setLastPage(result[2])
                        setShowLoader2(false)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    function loadMore() {
        setShowLoader2(true)
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getPublicRecipes('GET', value, page, "", 0, 1).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setRecipes([...recipes, ...result[0]])
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
        loadMore()
    }, [page]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRecipes([])
            setPage(1)
            loadRecipes()
        });
        return unsubscribe;
    }, [navigation]);



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
                    <Text style={[styles.heading]}>{language("myRecipes")}</Text>
                    <FlatList
                        data={recipes}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingRight: 20}}
                        keyExtractor={item => item.id}
                        onEndReached={fetchMore}
                        onEndReachedThreshold={0.4}
                        ListFooterComponent={renderLoading(showLoader2)}
                        renderItem={({item, index}) => (
                            <View>
                                {index !== 0 && index % 4 === 0 ?
                                    <View style={{marginVertical: 5}}>
                                        <ExampleAdd height={70}/>
                                    </View>: ''}
                                <RecipesCardSmall title={item.title}
                                                  photo={item.photo}
                                                  time={item.all_time}
                                                  servings={item.portion}
                                                  category={getIconInfo(item.categories)}
                                                  publicStatus={item.public}
                                                  onPress={() => {
                                                      navigation.push("Recipe Details", {recipeId: item.id})
                                                  }}
                                />
                            </View>
                    )
                    }/>
                    {recipes ? recipes.length < 4 ? <View style={{paddingRight: 20}}><ExampleAdd height={70}/></View> : '' : '' }
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
