import React from 'react'
import {View, Text, FlatList, SafeAreaView} from 'react-native'
import {stylesRecipes} from "../../styles/stylesRecipes";
import styles from "../../styles/styles";
import {ProductCard} from "../display/ProductCard";
import language from "../../language/language";


export const ConditionalCard = ({condition, steps, products}) => {
    let content = []


    if (condition) {
        for (let i = 0; i < steps.length; i++) {
            content.push(
                <SafeAreaView>
                    <View style={[stylesRecipes.productCard, {flexDirection: "column", alignItems: "flex-start"}]}>
                        <Text style={[styles.smallGreenText, {fontSize: 16, }]}>{language("step")} {steps[i].stepId}</Text>
                        <Text style={[styles.subHeading, {fontWeight: "regular"}]}>
                            {steps[i].step}
                        </Text>
                    </View>

                </SafeAreaView>
            )
        }
    } else {
        content = (
            <SafeAreaView>
                {products.map((product) => {
                    return (
                        <ProductCard title={product.productName}
                                     textRight={`${product.volume}${product.unitsName}`}
                                     icon={"carrot"}
                                     iconColor={"blue"}/>
                    );
                })}
            </SafeAreaView>
        )
    }

    return content
}
