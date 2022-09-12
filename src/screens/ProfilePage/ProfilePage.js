import React from "react";
import {Button, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Ionicons, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import {stylesCooks} from "../../styles/stylesCooks";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import SettingsCardSmall from "../../components/profile/SettingsCardSmall";
import SettingsCardLarge from "../../components/profile/SettingsCardLarge";
import {stylesProfile} from "../../styles/stylesProfile";
import Images from "../../../public/images";

export default function RecipesPage({navigation}) {
    return (
        <ScrollView>
            <View style={{...styles.container, alignItems: "flex-start", justifyContent: "flex-start"}}>
                <TouchableOpacity style={stylesCooks.profileDetails}
                                  onPress={() => navigation.navigate("Personal Info")}>
                    <Image source={require("../../../public/images/bob.jpg")} style={stylesCooks.profileImage}/>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={[styles.heading, {fontSize: 24, marginVertical: 2, marginRight: 5}]}>Боян
                            Йонков</Text>
                        <Octicons name={"pencil"} size={27} color={"#4B4C4C"}/>
                    </View>


                </TouchableOpacity>

                <Text style={styles.heading}>Настроики Групи</Text>
                <View style={stylesProfile.largeSettingsSection}>
                    <SettingsCardLarge name={"Моите Групи"} image={Images.icons.groups}/>
                    <SettingsCardLarge name={"Покани"} image={Images.icons.invite}/>
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

            </View>
        </ScrollView>
    );
}

