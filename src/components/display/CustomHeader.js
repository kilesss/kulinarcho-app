import Images from "../../../public/images";
const {View, TouchableOpacity, Image, TextInput} = require("react-native");
const {MaterialIcons} = require("@expo/vector-icons");
const React = require("react");
import {useNavigationState} from '@react-navigation/native';
import styles from "../../styles/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getGroupInfo} from "../../RestRequests/generalRequest";
import {useEffect, useState} from "react";
import {Text} from "react-native";

const asdasd = 'asdasd';
export function LogoTitle({navigation, photo, name}) {
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);


    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            flex: 1,
            paddingBottom: 3,
            alignItems: "center",
            width: "100%",

        }}>
            <TouchableOpacity onPress={() => navigation.push("Settings", {photo: photo, name: name})}>
                <Image
                    style={{
                        width: 47,
                        height: 47,
                        borderRadius: 50,
                    }}
                    source={photo ? {uri: 'https://kulinarcho.com' + photo} : Images.defaultProfile}
                />
            </TouchableOpacity>
        </View>
    )
};

function showSearch(route, navigation) {
    if (route === 'Recipes' || route === 'Cooking Book') {
        return (<TouchableOpacity style={{flex: 1, flexDirection: 'row'}}>
                <MaterialIcons name={"search"} size={33} color={"#4B4C4C"} style={{flex: 1}}/>
                <TextInput style={{
                    flex: 6,
                    ...styles.customButton,
                    alignSelf: "stretch",
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                    paddingLeft: 6,
                    color: "#4B4C4C",
                    padding: 0,
                }}
                 placeholder={'Търси рецепта'}
                 onSubmitEditing={(text) => {
                     if (route === 'Recipes') {
                         navigation.navigate('All Recipes', {searchString: text.nativeEvent.text})
                     } else if (route === 'Cooking Book') {
                         navigation.navigate('All Recipes', {searchString: text.nativeEvent.text, ownRecipe: 1})
                     }
                 }}
                />
            </TouchableOpacity>
        );
    }
    return '';
}

