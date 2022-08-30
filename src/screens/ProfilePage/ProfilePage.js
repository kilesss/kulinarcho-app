import React from "react";
import {Button, Image, ScrollView, Text, View} from "react-native";
import {Ionicons, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import {stylesCooks} from "../../styles/stylesCooks";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import SettingsCardSmall from "../../components/profile/SettingsCardSmall";
import SettingsCardLarge from "../../components/profile/SettingsCardLarge";
import {stylesProfile} from "../../styles/stylesProfile";

export default function RecipesPage({navigation}) {
    return (
        <ScrollView>
            <View style={{...styles.container, alignItems: "flex-start", justifyContent: "flex-start"}}>
                <View style={stylesCooks.profileDetails}>
                    <Image source={require("../../../public/images/bob.jpg")} style={stylesCooks.profileImage}/>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={[styles.heading, {fontSize: 24, marginVertical: 2, marginRight: 5}]}>Боян
                            Йонков</Text>
                        <Octicons name={"pencil"} size={27} color={"#4B4C4C"}/>
                    </View>


                </View>

                <Text style={styles.heading}>Настроики Групи</Text>
                <View style={stylesProfile.largeSettingsSection}>
                    <SettingsCardLarge name={"Моите Групи"} icon={"account-group-outline"}/>
                    <SettingsCardLarge name={"Покани"} icon={"tray-plus"}/>
                </View>

                <Text style={styles.heading}>Други Настроики</Text>
                <SettingsCardSmall name={"Продукти и категории"} icon={"carrot"}
                                   onPress={() => navigation.navigate("Products and Categories")}/>
                <SettingsCardSmall name={"Моите рецепти"} icon={"book-open-page-variant-outline"}/>
                <SettingsCardSmall name={"Промяна на паролата"} icon={"form-textbox-password"}/>

            </View>
        </ScrollView>
    );
}

