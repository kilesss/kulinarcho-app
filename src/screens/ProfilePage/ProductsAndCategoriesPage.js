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

    const [products, setProducts] = useState([
        // {key: "1", title: "Carrot", icon: "carrot", amount: "100g", color: "#FF7410"},
    ])

    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [productTypes, setProductTypes] = useState([]);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getProductTypes('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        console.log(getProductTypeIcon(result[0].name).color)
                        setProductTypes(result)
                        setShowLoader(false);
                    }
                }).catch((err) => {
                    console.log(err);
                });
                getProducts('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setProducts(result)
                        setShowLoader(false);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadData();

    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <SwitchSelector
                    initial={0}
                    onPress={value => setToggle(value)}
                    textColor={"#4B4C4C"} //'#7a44cf'
                    selectedColor={"#fff"}
                    buttonColor={"#15A051"}
                    backgroundColor={"#e8e8e8"}
                    height={50}
                    style={{marginBottom: 10, marginTop: 15}}
                    textStyle={{fontSize: 18}}
                    selectedTextStyle={{fontSize: 18}}
                    bold={true}
                    animationDuration={180}
                    options={[
                        {label: language("categories"), value: false,},
                        {label: language("products"), value: true,}
                    ]}
                />

                <ProductsCategoriesToggle condition={toggle} categories={productTypes} products={products}/>
            </View>
        </ScrollView>
    );
}
