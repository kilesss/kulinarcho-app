import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {stylesRecipes} from "../../styles/stylesRecipes";
import styles from "../../styles/styles";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";


export const ProductCard = ({ title, textRight, icon, iconColor}) => (
    <TouchableOpacity style={stylesRecipes.productCard}>
        <View style={stylesRecipes.productCardIconTitle}>
            <MaterialCommunityIcons name={icon} size={30} color={iconColor}/>
            <Text style={{fontSize: 18, fontWeight:"bold", color:"#4B4C4C"}}>{title}</Text>
        </View>

        <Text style={{fontWeight:"bold", color:"#4B4C4C"}}>{textRight}</Text>


    </TouchableOpacity>

)


