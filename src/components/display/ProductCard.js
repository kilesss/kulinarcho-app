import React from 'react'
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native'
import {stylesRecipes} from "../../styles/stylesRecipes";
import styles from "../../styles/styles";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Images from "../../../public/images";


export const ProductCard = ({ title, textRight, image, onPress}) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={stylesRecipes.productCard}>
        <View style={stylesRecipes.productCardIconTitle}>
            <Image source={image} style={{height: 30, width: 30}}/>
            <Text style={{fontSize: 16, fontWeight:"bold", color:"#4B4C4C", paddingLeft: 7}}>{title}</Text>
        </View>

        <Text style={{color:"#4B4C4C"}}>{textRight}</Text>
        </View>

    </TouchableWithoutFeedback>

)


