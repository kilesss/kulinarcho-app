import React, {useState} from "react";
import {Button, FlatList, ScrollView, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'
import {stylesRecipes} from '../../styles/stylesRecipes'
import CategoriesCard from "../../components/display/CategoriesCard";
import {RecipesCardLarge} from "../../components/display/RecipesCardLarge";

export default function RecipesPage({ navigation }) {

    const [categories, setCategories] = useState([
        {key: "1", title: "Риба", icon: "fish", color: "#0088C2"},
        {key: "2", title: "Напитки", icon: "glass-cocktail", color: "#DC00E0" },
        {key: "3", title: "С Месо", icon: "food-drumstick", color: "#842F00"},
        {key: "4", title: "Салати", icon: "leaf", color: "#0fc45b"},
        {key: "5", title: "Супи", icon: "bowl-outline", color: "#FF7410"},
        {key: "6", title: "Десерти", icon: "cake-variant-outline", color: "#d70101"},
    ])

    const [recipes, setRecipes] = useState([
        {key: "1", title: "Some Recipe with more text than usual", time: "30", servings: "5", category: categories[1]},
        {key: "2", title: "Some Recipe", time: 20, servings: 4, category: categories[2]},
        {key: "3", title: "Some Recipe", time: 40, servings: 5, category: categories[3]},
        {key: "4", title: "Some Recipe", time: 50, servings: 6, category: categories[5]},
        {key: "5", title: "Some Recipe", time: 40, servings: 5, category: categories[1]},
        {key: "6", title: "Some Recipe", time: 30, servings: 5, category: categories[2]},
        {key: "7", title: "Some Recipe", time: 30, servings: 5, category: categories[4]}
    ])


    return (
        <ScrollView >
        <View style={[styles.container, {alignItems:"flex-start", marginRight: 0}]}>
                <View style={{flex: 1.3, minHeight: 150}}>
                    <View>
                        <Text style={styles.heading}>Categories</Text>
                    </View>
                    <FlatList data={categories}
                              horizontal={true}
                              renderItem={({item}) => (
                        <CategoriesCard title={item.title}
                                        iconName={item.icon}
                                        color={item.color}
                                        size={75}
                                        showText={true}
                        />
                    )}/>

                </View>

                <View style={{flex: 2, minHeight: 250}}>
                    <Text style={styles.heading}>Popular Recipes</Text>
                    <FlatList data={recipes}
                              horizontal={true}
                              renderItem={({item}) => (
                        <RecipesCardLarge title={item.title}
                                          time={item.time}
                                          servings={item.servings}
                                          category={item.category}
                        />
                    )}/>
                </View>

                <View style={{flex: 3, minHeight: 250}}>
                    <Text style={styles.heading}>New Recipes</Text>
                    <FlatList data={recipes}
                              horizontal={true}
                              renderItem={({item}) => (
                                  <RecipesCardLarge title={item.title}
                                                    time={item.time}
                                                    servings={item.servings}
                                                    category={item.category}
                                  />
                              )}/>
                </View>
        </View>
        </ScrollView>
    );
}