import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import WeekMenuShoppingListItem from "../../components/shoppingList/WeekMenuShoppingListItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getRecipesProduct, submitWeekMenu} from "../../RestRequests/generalRequest";
import {CustomButton} from "../../components/display/CustomButton";
import {stylesProfile} from "../../styles/stylesProfile";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {NavigationActions} from "@react-navigation/native";
import {CommonActions} from "@react-navigation/native";

function WeekMenuShoppingList({route, navigation}) {
    const [recipeIds, setRecipeIds] = useState([]);
    const [recipeTitles, setRecipeTitles] = useState([]);
    const [shoppingListItems, setShoppingListItems] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [title, setTitle] = useState('');


    useEffect(() => {
        navigation.addListener('focus', async () => {
            setDateStart(route.params.endDate)
            setDateEnd(route.params.startDate)
            setTitle(route.params.title)
            let recipeTitles = [];
            let recipeIds = [];
            await AsyncStorage.getItem('weekMenu').then((value) => {
                let recipes = JSON.parse(value);
                Object.keys(recipes).map(key => {
                    recipeIds.push(recipes[key].id)
                    recipeTitles.push(recipes[key].title)
                })
                setRecipeTitles(recipeTitles);
                setRecipeIds(recipes)
                loadData(multiSelectHandler(recipeIds))
            })

        });

    }, [navigation]);

    function multiSelectHandler(option) {
        let str = '';
        // $url = 'http://www.example.com?aParam[]=value1&aParam[]=value2&aParam[]=value3';

        option.map(id => {
            if (str.length === 0) {
                str = '?id[]=' + id;
            } else {
                str = str + '&id[]=' + id
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

    function onChange(text, id) {
        let shoppingList = shoppingListItems;
        console.log(shoppingList);
        Object.keys(shoppingList).forEach(function (key) {
            if (shoppingList[key].id === id) {
                shoppingList[key].value = text
                return false;
            }
        })
        setShoppingListItems(shoppingList)
    }

    function onDelete(id) {
        let shoppingList = shoppingListItems;
        let newShoppingList = [];
        Object.keys(shoppingList).forEach(function (key) {
            if (shoppingList[key].id !== id) {
                newShoppingList.push(shoppingList[key])
            }
        })
        setShoppingListItems(newShoppingList)

    }

    async function generateShoppingList() {
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                submitWeekMenu(JSON.stringify({
                    title: title,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    articles: shoppingListItems,
                    recipe: recipeIds
                }), value).then(data => {
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Shopping List'}],
                    })
                }).then(data => {
                }).catch((err) => {
                    console.log('error')
                });
            }

        }, []);

    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Рецепти</Text>
            <FlatList data={recipeTitles} style={{maxHeight: '10%', width: '100%', minHeight: '20%'}}
                      renderItem={({item}) => (
                          <Text style={{...styles.heading, color: "#15A051", marinTop: 0}}>{item}</Text>
                      )}/>
            <Text style={styles.heading}>Списък за Пазар</Text>
            <View style={{alignSelf: "stretch"}}>
                <FlatList data={shoppingListItems} style={{maxHeight: '60%', minHeight: '99%'}}
                          renderItem={({item}) => (

                              <View>
                                  <View style={{...styles.customButton, ...stylesProfile.requestComponent}}>
                                      <View style={{flex: 1}}>
                                          <Text style={{...styles.heading, marginTop: 0}}>{item.title}</Text>
                                          <Text style={{
                                              ...styles.subHeading,
                                              fontWeight: "regular",
                                              marginTop: 0,
                                              marginBottom: 0
                                          }}>Нужно: <Text style={{color: "#15A051"}}>{item.amount}</Text>
                                          </Text>
                                      </View>
                                      <TextInput style={styles.borderBottomTextInput} placeholder={"0"}
                                                 keyboardType={"numeric"}
                                                 onChangeText={changedText => onChange(changedText, item.id)}/>

                                      <TouchableOpacity
                                          style={{...stylesProfile.requestButton, backgroundColor: "#D40000"}}
                                          onPress={() => onDelete(item.id)}>
                                          <MaterialIcons name={"delete"} size={25} color={"#fff"}/>
                                      </TouchableOpacity>
                                  </View>
                              </View>
                              // <WeekMenuShoppingListItem title={item.title} requiredAmount={item.amount} onChange={onChange()}/>
                          )}/>

            </View>
            <View style={{flexDirection: 'row'}}>

                <TouchableOpacity
                    style={[styles.customButton, stylesProfile.settingsCardSmall, {paddingVertical: 13, flex: 1}]}
                    onPress={() => generateShoppingList()}>
                    <Ionicons name={"receipt"} color={"#15A051"} size={27}/>
                    <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Генерирай</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WeekMenuShoppingList;
