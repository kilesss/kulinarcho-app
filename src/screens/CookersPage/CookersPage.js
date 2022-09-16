import React, {useEffect, useState} from "react";
import {Button, FlatList, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import CookCard from "../../components/display/CookCard";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import language from "../../language/language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getProducts, getProductTypes, getPublicProfiles} from "../../RestRequests/generalRequest";
import {getProductTypeIcon} from "../../components/HelpFunctions";
import {stylesCooks} from "../../styles/stylesCooks";

export default function CookersPage({navigation}) {
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [cooks, setCooks] = useState([]);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getPublicProfiles('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setCooks(result)
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
            <View style={styles.container}>
                <Text style={styles.heading}>{language("cooks")}</Text>

                {/*{cooks.map((cook) => {*/}
                {/*    return (*/}
                {/*        <CookCard name={cook.name} numRecipes={cook.recipes} onPress={() => navigation.navigate("Cooks Details", {cook: cook})}></CookCard>*/}
                {/*    );*/}
                {/*})}*/}

                <FlatList
                    data={cooks}
                    style={{alignSelf: "stretch"}}
                    renderItem={({item}) => (
                        <CookCard
                            name={item.name}
                            image={item.profilePicture}
                            numRecipes={item.recipes}
                            onPress={() => navigation.navigate("Cooks Details", {cookId: item.id})}/>
                )}/>
            </View>
    );
}
