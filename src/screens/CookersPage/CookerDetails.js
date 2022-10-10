import {FlatList, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {stylesRecipes} from "../../styles/stylesRecipes";
import React, {useEffect, useState} from "react";
import {stylesCooks} from "../../styles/stylesCooks";
import {CustomButton} from "../../components/display/CustomButton";
import {recipes, categories2} from "../RecipesPage/RecepiesPage";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import {RecipesCardLarge} from "../../components/recipes/RecipesCardLarge";
import language from "../../language/language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories, getPublicProfiles, getSingleProfile} from "../../RestRequests/generalRequest";
import {getIconInfo, getProductTypeIcon} from "../../components/HelpFunctions";
import Images from "../../../public/images";


export default function CookerDetails({route, navigation}) {

    const { cookId } = route.params;
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [cook, setCook] = useState([]);
    const [recipes, setRecipes] = useState([]);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getSingleProfile('GET', value, cookId).then(data => {
                    if (data) {
                        console.log(data.user)
                        const result = Object.values(data);
                        setCook(result[0])
                        setRecipes(result[1])
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

    return (
            <View style={styles.container}>
                <View style={{alignSelf: "stretch"}}>

                <FlatList
                    data={recipes}
                    scrollEnabled={true}
                    numColumns={2}
                    ListHeaderComponent={
                    <View style={stylesCooks.profileDetails}>
                        <Image source={ cook.profilePicture ?
                            {uri: 'https://kulinarcho.com' + cook.profilePicture}
                            : Images.defaultProfile} style={stylesCooks.profileImage}/>
                        <Text style={[styles.heading, {fontSize: 22, marginTop: 0, textAlign: "center"}]}>{cook.name}</Text>
                        <Text style={stylesCooks.numRecipesText}>{cook.recipes} {language("recipes")}</Text>
                        <CustomButton title={language("addToGroup")} padding={9} txtColor={"#fff"}/>

                    </View>
                }
                    columnWrapperStyle={{justifyContent: "center", margin: 5}}
                    renderItem={({item}) => (
                        // <View>
                        //     <Image source={getIconInfo(item.cat_id).image}/>
                        // <Text>{item.title} - {item.portion} - {item.all_time} - {item.id} - {item.cat}</Text>
                        // </View>
                            <RecipesCardLarge

                                onPress={() => {
                                    navigation.push("Recipe Details", {recipeId: item.id})
                                }}                                title={item.title}
                                photo={item.photo}
                                margin={5}
                                time={item.all_time}
                                servings={item.servings}
                                category={getIconInfo(item.cat_id)}
                            />
                )}/>
                {/*{recipes.map((recipe,i) => {*/}
                {/*    return (*/}
                {/*        <View style={{margin: 5}}>*/}
                {/*            <RecipesCardLarge title={recipe.title}*/}
                {/*                              liked={recipe.liked}*/}
                {/*                              time={recipe.time}*/}
                {/*                              servings={recipe.servings}*/}
                {/*                              category={recipe.category}*/}
                {/*                              onPress={() => {*/}
                {/*                                  navigation.push("Recipe Details")*/}
                {/*                              }}*/}
                {/*            />*/}
                {/*        </View>*/}
                {/*    );*/}
                {/*})}*/}
            </View>
            </View>
    );
}
