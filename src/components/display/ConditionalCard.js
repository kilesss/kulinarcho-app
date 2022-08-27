import React from 'react'
import {View, Text, FlatList, SafeAreaView} from 'react-native'
import {stylesRecipes} from "../../styles/stylesRecipes";
import styles from "../../styles/styles";
import {ProductCard} from "./ProductCard";


export const ConditionalCard = ({ condition, steps, products }) => {
    let content

    if (condition) {
        content = (
            <SafeAreaView>
                {steps.map((step) => {
                    return (
                        <View style={[stylesRecipes.productCard, {flexDirection: "column", alignItems: "flex-start", marginVertical: 4, paddingVertical: 10}]}>
                            <Text style={[styles.smallGreenText, {fontSize: 18}]}>{step.title}</Text>
                            <Text style={[styles.subHeading, {fontWeight: "regular"}]}>
                                {step.description}
                            </Text>
                        </View>
                    );
                })}
            </SafeAreaView >
        )
    } else {
        content = (
            <SafeAreaView>
                {products.map((product) => {
                    return (
                        <ProductCard title={product.title} textRight={product.amount} icon={product.icon} iconColor={product.color}/>
                    );
                })}
            </SafeAreaView >
        )
    }

    return content
}
