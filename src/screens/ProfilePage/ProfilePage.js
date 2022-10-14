import React from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Octicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import {stylesCooks} from "../../styles/stylesCooks";
import SettingsCardSmall from "../../components/profile/SettingsCardSmall";
import SettingsCardLarge from "../../components/profile/SettingsCardLarge";
import {stylesProfile} from "../../styles/stylesProfile";
import Images from "../../../public/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipesPage({navigation, route}) {

    async function removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch(exception) {
            return false;
        }
    }


    const { name, photo } = route.params;

    return (
        <ScrollView>
            <View style={{...styles.container, alignItems: "flex-start", justifyContent: "flex-start"}}>
                <TouchableOpacity style={stylesCooks.profileDetails}
                                  onPress={() => navigation.navigate("Personal Info")}>
                    <Image source={photo ? {uri: 'https://kulinarcho.com' + photo} : Images.defaultProfile} style={stylesCooks.profileImage}/>
                    <View style={{flexDirection: "row", alignItems: "center", alignSelf:"center"}}>
                        <Text style={[styles.heading, {fontSize: 24, marginVertical: 2, marginRight: 5}]}>{name}</Text>
                        <Octicons name={"pencil"} size={27} color={"#4B4C4C"}/>
                    </View>


                </TouchableOpacity>

                <Text style={styles.heading}>Настроики Групи</Text>
                <View style={stylesProfile.largeSettingsSection}>
                    <SettingsCardLarge name={"Моите Групи"} image={Images.icons.groups} onPress={() => navigation.navigate('My Group')}/>
                    <SettingsCardLarge name={"Покани"} image={Images.icons.invite} onPress={() => navigation.navigate('Group Requests')}/>
                </View>

                <Text style={styles.heading}>Други Настроики</Text>
                <SettingsCardSmall name={"Промяна на лична информация"} icon={"account-outline"}
                                   onPress={() => navigation.navigate("Personal Info")}
                />
                <SettingsCardSmall name={"Продукти и категории"} icon={"carrot"}
                                   onPress={() => navigation.navigate("Products and Categories")}/>
                <SettingsCardSmall name={"Моите рецепти"} icon={"book-open-page-variant-outline"}
                                   onPress={() => navigation.navigate("Cooking Book")}
                />
                <SettingsCardSmall name={"Изход"} icon={"door-open"} color={"#D40000"}
                                   onPress={() => {
                                       // TODO: When you clear the access token it tries to log you in automatically again.
                                       // removeItemValue("access_token").then(r => console.log(r))
                                       navigation.navigate("Login")
                                   }}
                />

            </View>
        </ScrollView>
    );
}

