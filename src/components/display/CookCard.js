import styles from "../../styles/styles";
import {TouchableOpacity} from "react-native";
import language from "../../language/language";
import Images from "../../../public/images";
const {stylesRecipes} = require("../../styles/stylesRecipes");
const {Image, View, Text} = require("react-native");
const React = require("react");


export default function CookCard({name, image, numRecipes, onPress, hideNumRecipes}){


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
            <View style={{paddingLeft: 7}}>
                <Text style={[styles.heading, {marginTop: hideNumRecipes ? 4 : 0}]}>{name}</Text>
                {hideNumRecipes ?
                    '' : <Text style={[styles.smallGreenText, {marginTop: -10,}]}>{numRecipes} {language("recipes")}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}
