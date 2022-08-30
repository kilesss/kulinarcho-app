import React from "react";
import {Button, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import CookCard from "../../components/display/CookCard";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import language from "../../language/language";

export default function CookersPage({navigation}) {
    const cooks = [
        {key: 1, name: "Bob Marley", recipes: 420},
        {key: 2, name: "Bob Marley", recipes: 420},
        {key: 3, name: "Bob Marley", recipes: 420},
        {key: 4, name: "Bob Marley", recipes: 420},
        {key: 5, name: "Bob Marley", recipes: 420},
        {key: 6, name: "Bob Marley", recipes: 420},
        {key: 7, name: "Bob Marley", recipes: 420},
        {key: 8, name: "Bob Marley", recipes: 420},
        {key: 9, name: "Bob Marley", recipes: 420},
        {key: 10, name: "Bob Marley", recipes: 420},
        {key: 11, name: "Bob Marley", recipes: 420},
        {key: 12, name: "Bob Marley", recipes: 420},
        {key: 13, name: "Bob Marley", recipes: 420},
    ]
    return (
        <ScrollView>
            <View style={[styles.container, {justifyContent: "flex-start", alignItems: "flex-start", paddingBottom: 20}]}>
                <Text style={styles.heading}>{language("cooks")}</Text>

                {cooks.map((cook) => {
                    return (
                        <CookCard name={cook.name} numRecipes={cook.recipes} onPress={() => navigation.navigate("Cooks Details", {cook: cook})}></CookCard>
                    );
                })}
            </View>
        </ScrollView>
    );
}
