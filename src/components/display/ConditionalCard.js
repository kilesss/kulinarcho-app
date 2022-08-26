import React from 'react'
import { View, Text } from 'react-native'
import {stylesRecipes} from "../../styles/stylesRecipes";
import styles from "../../styles/styles";
import {ProductCard} from "./ProductCard";


export const ConditionalCard = ({ condition }) => {
    let content

    if (condition) {
        content = (
            <View style={stylesRecipes.steps}>
                <Text style={[styles.smallGreenText, stylesRecipes.stepsHeading]}>Step Heading</Text>
                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda magni odio quam quis quos!</Text>
                <Text style={[styles.smallGreenText, stylesRecipes.stepsHeading]}>Step Heading</Text>
                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda magni odio quam quis quos!</Text>
                <Text style={[styles.smallGreenText, stylesRecipes.stepsHeading]}>Step Heading</Text>
                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda magni odio quam quis quos!</Text>
                <Text style={[styles.smallGreenText, stylesRecipes.stepsHeading]}>Step Heading</Text>
                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A assumenda magni odio quam quis quos!</Text>
            </View>
        )
    } else {
        content = (
            <View>
                <ProductCard title={"Test"} textRight={"100g"} icon={"carrot"} iconColor={"#FF7410"}/>
                <ProductCard title={"Test"} textRight={"100g"} icon={"carrot"} iconColor={"#FF7410"}/>
                <ProductCard title={"Test"} textRight={"100g"} icon={"carrot"} iconColor={"#FF7410"}/>
                <ProductCard title={"Test"} textRight={"100g"} icon={"carrot"} iconColor={"#FF7410"}/>
                <ProductCard title={"Test"} textRight={"100g"} icon={"carrot"} iconColor={"#FF7410"}/>
                <ProductCard title={"Test"} textRight={"100g"} icon={"carrot"} iconColor={"#FF7410"}/>
            </View>
        )
    }

    return content
}
