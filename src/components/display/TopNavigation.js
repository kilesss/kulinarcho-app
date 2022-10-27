import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Alert} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {TOPNAVI_H, BANNER_H} from '../constants';
import {stylesRecipes} from "../../styles/stylesRecipes";
import {Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {MenuProvider} from 'react-native-popup-menu';
import styles from "../../styles/styles";
import language from "../../language/language";
import {showConfirmDialog} from "../HelpFunctions";
import ShareButton from "./ShareButton";
import {
    deleteProductTypes,
    deleteRecipe,
    getSingleRecipe,
    setPublicRecipe,
    transferRecipe
} from "../../RestRequests/generalRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TopNavigation({recipeDetails, products, steps, scrollA, onPressBack, navigation, token}) {

    const safeArea = useSafeArea();

    const isFloating = !!scrollA;
    const [isTransparent, setTransparent] = useState(isFloating);
    const [liked, setLiked] = useState(false);


    useEffect(() => {
        if (!scrollA) {
            return;
        }
        const listenerId = scrollA.addListener(a => {
            const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
            isTransparent !== a.value < topNaviOffset &&
            setTransparent(!isTransparent);
        });
        return () => scrollA.removeListener(listenerId);
    });

    async function deleteARecipe(id){
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                deleteRecipe(JSON.stringify({id: id}), value).then().catch((err) => {
                    console.log(err);
                });
                navigation.goBack()
            }
        }, []);
    }

    async function makeRecipePublic(id){
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                setPublicRecipe(JSON.stringify({recipe_id: id}), value).then().catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    async function saveRecipe(id){
        console.log(JSON.stringify({recipe_id: id}))
        setLiked(true)
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                transferRecipe(JSON.stringify({recipe_id: id}), value).then().catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    return (
        <>
            <View style={stylesRecipes.container(safeArea, isFloating, isTransparent)}>

                <TouchableOpacity onPress={onPressBack}
                                  style={{
                                      backgroundColor: isTransparent ? "rgba(0,0,0,0.1)" : "transparent",
                                      borderRadius: 45,
                                      height: 28
                                  }}>
                    <MaterialIcons name={"arrow-back"} size={28} color={"#fff"}/>
                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    {recipeDetails.ownRecipe === 1 ?
                        <MaterialCommunityIcons name={"heart"} size={32} color={"red"} style={{marginHorizontal: 10}}/>
                    :
                        <TouchableOpacity onPress={() => saveRecipe(recipeDetails.id)}>
                            <MaterialCommunityIcons name={liked ? "heart" : "heart-outline"} size={32} color={liked ? "red":"#fff"} style={{marginHorizontal: 10}}/>
                        </TouchableOpacity>
                    }
                    <ShareButton id={recipeDetails.id}/>

                    {recipeDetails.ownRecipe === 1 ?
                        <Menu style={{marginTop: 35}}>
                            <MenuTrigger style={{marginTop: -35, marginLeft: 10}}>
                                <MaterialCommunityIcons name={"dots-vertical"} size={32} color={"#fff"}/>
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => navigation.navigate("Add Edit Recipe", {
                                    recipeDetails: recipeDetails,
                                    productList: products,
                                    stepList: steps,
                                    edit: true
                                })}
                                            style={stylesRecipes.popupMenu}>
                                    <MaterialCommunityIcons name={"pen"} size={25} color={"#4B4C4C"}/>
                                    <Text style={{...styles.subHeading, marginLeft: 5}}>Edit</Text>
                                </MenuOption>

                                {recipeDetails.public === 0 ?
                                    <MenuOption onSelect={() => makeRecipePublic(recipeDetails.id)}
                                                style={stylesRecipes.popupMenu}>
                                        <Octicons name={"people"} size={25} color={"#15A051"}/>
                                        <Text style={{
                                            ...styles.subHeading,
                                            marginLeft: 5
                                        }}>{language("makePublic")}</Text>
                                    </MenuOption> : ''
                                }

                                <MenuOption onSelect={() => showConfirmDialog(() => {
                                    deleteARecipe(recipeDetails.id)
                                })}
                                            style={stylesRecipes.popupMenu}>
                                    <MaterialCommunityIcons name={"delete"} size={25} color={"red"}/>
                                    <Text style={{
                                        ...styles.subHeading,
                                        color: "#4B4C4C",
                                        marginLeft: 5
                                    }}>{language("delete")}</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                        :
                        ""
                    }

                </View>
            </View>
        </>
    );
};


