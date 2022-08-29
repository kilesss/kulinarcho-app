import styles from "../../styles/styles";
import {TouchableOpacity} from "react-native";
const {stylesRecipes} = require("../../styles/stylesRecipes");
const {Image, View, Text} = require("react-native");
const React = require("react");


export default function CookCard({name, numRecipes, onPress}){


    return (
        <TouchableOpacity style={stylesRecipes.cookCard} onPress={onPress}>
            <Image source={require("../../../public/images/bob.jpg")} style={stylesRecipes.cookCardImage}/>
            <View style={{paddingLeft: 7}}>
                <Text style={[styles.heading, {marginTop: 0}]}>{name}</Text>
                <Text style={[styles.smallGreenText, {marginTop: -13,}]}>{numRecipes} recipes</Text>
            </View>
        </TouchableOpacity>
    )
}
