import React, {useState} from "react";
import {Button, FlatList, SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from '../../styles/styles'
import CategoriesCard from "../../components/display/CategoriesCard";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import {ProductCard} from "../../components/display/ProductCard";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import language from "../../language/language";

export default function CookingBookPage({navigation}) {

    const [categories, setCategories] = useState([
        {key: "1", title: "Риба", icon: "fish", color: "#0088C2"},
        {key: "2", title: "Напитки", icon: "glass-cocktail", color: "#DC00E0"},
        {key: "3", title: "С Месо", icon: "food-drumstick", color: "#842F00"},
        {key: "4", title: "Салати", icon: "leaf", color: "#0fc45b"},
        {key: "5", title: "Супи", icon: "bowl-outline", color: "#FF7410"},
        {key: "6", title: "Десерти", icon: "cake-variant-outline", color: "#d70101"},
    ])

    const [recipes, setRecipes] = useState([
        {
            key: "1",
            title: "Some Recipe with more text than",
            time: "30",
            servings: "5",
            category: categories[1],
            liked: true
        },
        {key: "2", title: "Some Recipe", time: 20, servings: 4, category: categories[2], liked: true},
        {key: "3", title: "Some Recipe", time: 40, servings: 5, category: categories[3], liked: false},
        {key: "4", title: "Some Recipe", time: 50, servings: 6, category: categories[5], liked: true},
        {key: "5", title: "Some Recipe", time: 40, servings: 5, category: categories[1], liked: true},
        {key: "6", title: "Some Recipe", time: 30, servings: 5, category: categories[2], liked: true},
        {key: "7", title: "Some Recipe", time: 30, servings: 5, category: categories[4], liked: true},
        {key: "8", title: "Some Recipe", time: 30, servings: 5, category: categories[2], liked: true},
        {key: "9", title: "Some Recipe", time: 30, servings: 5, category: categories[4], liked: true}
    ])


    return (
        <ScrollView>
            <View style={[styles.container, {alignItems: "flex-start", marginRight: 0}]}>
                <View style={{minHeight: 150}}>
                    <View>
                        <Text style={styles.heading}>{language("categories")}</Text>
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


                <View style={{flex: 1, width: "100%", paddingRight: 20}}>
                    <Text style={[styles.heading]}>{language("popularRecipes")}</Text>
                    <SafeAreaView>
                        {recipes.map((recipe) => {
                            return (
                                <GestureHandlerRootView>
                                    <Swipeable
                                        renderRightActions={(progress, dragX) =>
                                            rightSwipeActions(progress, dragX, () => console.log("Pressed Delete"), 74)}
                                    >
                                        <RecipesCardSmall title={recipe.title}
                                                          liked={recipe.liked}
                                                          time={recipe.time}
                                                          servings={recipe.servings}
                                                          category={recipe.category}
                                                          onPress={() => {
                                                              navigation.push("Recipe Details")
                                                          }}
                                        />
                                    </Swipeable>
                                </GestureHandlerRootView>
                            );
                        })}
                    </SafeAreaView>
                </View>
            </View>
        </ScrollView>
    );
}
