import styles from "../../styles/styles";
import {TouchableOpacity} from "react-native";
import language from "../../language/language";
import Images from "../../../public/images";
import {stylesProfile} from "../../styles/stylesProfile";
import {MaterialIcons} from "@expo/vector-icons";
import {showConfirmDialog} from "../HelpFunctions";

const {stylesRecipes} = require("../../styles/stylesRecipes");
const {Image, View, Text} = require("react-native");
const React = require("react");


export default function CookCard({name, image, numRecipes, onPress, showDelete, handleDelete}) {


    return (
        <TouchableOpacity style={stylesRecipes.cookCard} onPress={onPress}>
            <Image
                style={stylesRecipes.cookCardImage}
                source={
                    image ?
                        {uri: 'https://kulinarcho.com' + image}
                        : Images.defaultProfile
                }
            />
            <View style={{paddingLeft: 7, flex: 1}}>
                <Text style={[styles.heading, {marginTop: 0}]}>{name}</Text>
                <Text style={[styles.smallGreenText, {marginTop: -13,}]}>{numRecipes} {language("recipes")}</Text>
            </View>
            {showDelete ?
                <TouchableOpacity style={{...stylesProfile.requestButton, backgroundColor: "#D40000", marginRight: 8}}
                                  onPress={() => showConfirmDialog(handleDelete, "confirmUserRemove")}>
                    <MaterialIcons name={"delete"} size={25} color={"#fff"}/>
                </TouchableOpacity>
                : ''}

        </TouchableOpacity>
    )
}
