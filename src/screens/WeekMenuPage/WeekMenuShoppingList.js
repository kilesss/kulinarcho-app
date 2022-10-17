import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import WeekMenuShoppingListItem from "../../components/shoppingList/WeekMenuShoppingListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getRecipesProduct} from "../../RestRequests/generalRequest";
import {CustomButton} from "../../components/display/CustomButton";
import {stylesProfile} from "../../styles/stylesProfile";
import {Ionicons} from "@expo/vector-icons";

function WeekMenuShoppingList({navigation}) {
    const [recipeTitles, setRecipeTitles] = useState([]);
    const [shoppingListItems, setShoppingListItems] = useState([]);



    useEffect(() => {
        navigation.addListener('focus', async () => {
            let recipeTitles = [];
            let recipeIds = [];
            await AsyncStorage.getItem('weekMenu').then((value) => {
                let recipes = JSON.parse(value);
                Object.keys(recipes).map(key => {
                    recipeIds.push(recipes[key].id)
                    recipeTitles.push(recipes[key].title)
                })
                setRecipeTitles(recipeTitles);
                loadData(multiSelectHandler(recipeIds))
            })

        });

    }, [navigation]);

    function multiSelectHandler(option) {
        let str = '';
        // $url = 'http://www.example.com?aParam[]=value1&aParam[]=value2&aParam[]=value3';

        option.map(id => {
            if (str.length === 0) {
                str = '?id[]='+id;
            }else {
                str = str+'&id[]='+id
            }
        })
        return str;
    };

    function loadData(ids) {

        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                getRecipesProduct(ids, value).then(data => {
                    if (data) {
                        const result = Object.values(data);

                        setShoppingListItems(result)
                    }
                }).then(data => {
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Рецепти</Text>
            <FlatList data={recipeTitles} style={{maxHeight: '10%', width: '100%', minHeight:'20%'}} renderItem={({item}) => (
                <Text style={{...styles.heading, color: "#15A051", marinTop: 0}}>{item}</Text>
            )}/>
            <Text style={styles.heading}>Списък за Пазар</Text>
            <View style={{alignSelf: "stretch"}}>
                <FlatList data={shoppingListItems} style={{maxHeight:'60%', minHeight:'99%'}} renderItem={({item}) => (
                    <WeekMenuShoppingListItem title={item.title} requiredAmount={item.amount}/>
                )}/>

            </View>
            <View style={{flexDirection: 'row'}}>

                <TouchableOpacity
                    style={[styles.customButton, stylesProfile.settingsCardSmall, {paddingVertical: 13, flex: 1}]}
                    onPress={() => navigation.navigate("Week Menu Shopping List")}>
                    <Ionicons name={"receipt"} color={"#15A051"} size={27}/>
                    <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Генерирай</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WeekMenuShoppingList;
