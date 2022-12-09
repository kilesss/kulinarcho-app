import React, {useEffect} from 'react';
import {useState} from 'react';

import {Text, TouchableOpacity, View, ScrollView, FlatList} from "react-native";
import stylesShoppingList from "../../styles/stylesShoppingList";
import styles from "../../styles/styles";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSmall";
import {getIconInfo} from "../../components/HelpFunctions";
import {stylesProfile} from "../../styles/stylesProfile";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import renderLoading from "../../components/loading/ShowLoader";
import {submitWeekMenu} from "../../RestRequests/generalRequest";
import {CommonActions} from "@react-navigation/native";

function WeekMenuAddRecipes({route, navigation}) {

    const [dates, setDates] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [title, setTitle] = useState('');
    useEffect(() => {
        navigation.addListener('focus', async () => {

            await AsyncStorage.getItem('weekMenu').then((value) => {
                setRecipes(JSON.parse(value));
            })
            setDateStart(route.params.startDate)
            setDateEnd(route.params.endDate)
            setTitle(route.params.title)

            getDatesBetween(new Date(route.params.startDate.split('/')[2] + '-' +
                    formatDates(route.params.startDate.split('/')[1]) + '-' +
                    formatDates(route.params.startDate.split('/')[0])
                ),
                new Date(route.params.endDate.split('/')[2] + '-' +
                    formatDates(route.params.endDate.split('/')[1]) + '-' +
                    formatDates(route.params.endDate.split('/')[0])
                )
            )
        });

    }, [navigation]);


    const getDatesBetween = (startDate, endDate) => {
        const dates = [];

        // Strip hours minutes seconds etc.
        let currentDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        );
        while (currentDate <= endDate) {
            dates.push(currentDate.getUTCDate()+1 + '/' + (currentDate.getUTCMonth() + 1) + '/' + currentDate.getFullYear());
            currentDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() + 1, // Will increase month if over range
            );
        }
        setDates(dates);
    };

    function formatDates(number) {
        if (number.length === 1) {
            return '0' + number
        }
        return number;
    }

    async function saveWeekMenu() {
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                console.log(JSON.stringify({
                    title: title,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    recipe: recipes
                }))
                submitWeekMenu(JSON.stringify({
                    title: title,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    recipe: recipes
                }), value).then(data => {
                    if (data) {
                        console.log(JSON.stringify({
                            title: title,
                            dateStart: dateStart,
                            dateEnd: dateEnd,
                            recipe: recipes
                        }));
                        console.log(data);
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Week Menu' }],
                            })
                        );
                        navigation.navigate("Week Menu")
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);

    }

    return (

        <View style={{...styles.container, paddingBottom:0}}>
            <FlatList
                style={{width:'100%', maxHeight:'89%',minHeight:'87%'}}
                data={dates}
                keyExtractor={(item, index) => item}
                ListEmptyComponent={<Text style={styles.heading}>{language("noRecipes")}</Text>}
                renderItem={({item}) => (

                    <View style={{...styles.recipesCardSmall, width:'100%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 5}}>
                                <Text style={{...styles.heading, fontSize: 18}}>{item}</Text>
                            </View>
                            <View style={{flex: 2}}>
                                <CustomButton title={language("add")}
                                              bgColor={"#15A051"}
                                              txtColor={"#fff"}
                                              padding={7}
                                              onPress={() => navigation.navigate("Week Menu Pick Recipe", {date: item})}
                                />
                            </View>
                        </View>
                        {recipes !== null? Object.keys(recipes).map(key2 => {
                            if (recipes[key2].date === item)
                                return (<RecipesCardSmall
                                    title={recipes[key2].title}
                                    time={recipes[key2].allTime}
                                    servings={recipes[key2].portions}
                                    publicStatus={recipes[key2].publicRec}
                                    photo={recipes[key2].photo}
                                    category={getIconInfo(recipes[key2].category)}/>)
                        }):<View></View>}
                    </View>
                )}/>



            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <CustomButton
                        title={"Запази меню"}
                        txtColor={"#fff"}
                        onPress={() => saveWeekMenu()}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.customButton, stylesProfile.settingsCardSmall, {marginLeft: 10, flex: 1}]}
                    onPress={() => navigation.navigate("Week Menu Shopping List", {title:title, startDate:dateStart, endDate: dateEnd })}>

                    <Ionicons name={"receipt"} color={"#15A051"} size={27}/>
                    <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Генерирай</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WeekMenuAddRecipes;
