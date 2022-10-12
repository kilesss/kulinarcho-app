import React, {useEffect} from 'react';
import {useState} from 'react';

import {Text, TouchableOpacity, View,ScrollView } from "react-native";
import stylesShoppingList from "../../styles/stylesShoppingList";
import styles from "../../styles/styles";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import {getIconInfo} from "../../components/HelpFunctions";
import {stylesProfile} from "../../styles/stylesProfile";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {rotate} from "expo-image-manipulator/build/actions/index.web";

function WeekMenuAddRecipes({route, navigation}) {

    const [dates, setDates] = useState([]);

    useEffect(() => {
        getDatesBetween(new Date(route.params.startDate.split('/')[2] + '-' +
                formatDates(route.params.startDate.split('/')[1]) + '-' +
                formatDates(route.params.startDate.split('/')[0])
            ),
            new Date(route.params.endDate.split('/')[2] + '-' +
                formatDates(route.params.endDate.split('/')[1]) + '-' +
                formatDates(route.params.endDate.split('/')[0])
            )
        )
    }, []);

    const getDatesBetween = (startDate, endDate) => {
        const dates = [];

        // Strip hours minutes seconds etc.
        let currentDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        );
        while (currentDate <= endDate) {
            dates.push(currentDate.getUTCDate() + '/' + (currentDate.getUTCMonth() + 1) + '/' + currentDate.getFullYear());
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



    return (

        <View style={styles.container}>
            <ScrollView>

            {Object.keys(dates).map(key => {
                return (
                    <View>
                    <View style={{flexDirection:'row', width:'55%'}}>
                        <View style={{flex: 5}}>
                            <Text style={{...styles.heading, fontSize: 18}}>{dates[key]}</Text>

                        </View>
                        <View style={{flex:2}}>
                            <CustomButton title={language("add")}
                                          bgColor={"#15A051"}
                                          txtColor={"#fff"}
                                          padding={7}
                                          onPress={() => navigation.navigate("Week Menu Pick Recipe")}
                            />
                        </View>
                    </View>

                    <RecipesCardSmall
                        title={"opa"}
                        time={20}
                        servings={2}
                        publicStatus={2}
                        photo={"/pictures/profilePicture/70/0_1652967840.jpg"}
                        category={getIconInfo(1)}/>
                </View>)
            })}
            </ScrollView>


            <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
            <CustomButton
                title={"Запази меню"}
                txtColor={"#fff"}
                onPress={() => console.log("Запази рецепта функция")}
            />
                </View>
            <TouchableOpacity
                style={[styles.customButton, stylesProfile.settingsCardSmall, {paddingVertical: 13, flex:1}]}
                onPress={() => navigation.navigate("Week Menu Shopping List")}>
                <Ionicons name={"receipt"} color={"#15A051"} size={27}/>
                <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Генерирай</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default WeekMenuAddRecipes;
