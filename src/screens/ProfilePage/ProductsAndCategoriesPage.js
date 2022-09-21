import React, {useEffect, useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import SwitchSelector from "react-native-switch-selector";
import language from "../../language/language";
import {ConditionalCard} from "../../components/recipes/ConditionalCard";
import {ProductsCategoriesToggle} from "../../components/profile/ProductsCategoriesToggle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getProducts, getProductTypes, getWeeklyMenus} from "../../RestRequests/generalRequest";
import {getProductTypeIcon} from "../../components/HelpFunctions";

export default function ProductsAndCategoriesPage({navigation}) {

    const [toggle, setToggle] = useState(false)


    return (
            <View style={styles.container}>
                <SwitchSelector
                    initial={0}
                    onPress={value => setToggle(value)}
                    textColor={"#4B4C4C"} //'#7a44cf'
                    selectedColor={"#fff"}
                    buttonColor={"#15A051"}
                    backgroundColor={"#e8e8e8"}
                    height={50}
                    style={{marginBottom: 7, marginTop: 10}}
                    textStyle={{fontSize: 18}}
                    selectedTextStyle={{fontSize: 18}}
                    bold={true}
                    animationDuration={180}
                    options={[
                        {label: language("categories"), value: false,},
                        {label: language("products"), value: true,}
                    ]}
                />

                <ProductsCategoriesToggle
                    condition={toggle}
                />
            </View>
    );
}
