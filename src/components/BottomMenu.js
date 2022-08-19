
import React from "react";
import { styles, bottomNav } from "../styles/styles"
import ShoppingListsPage from "../screens/ShoppingLists";
import ProductsAndCategoriesPage from "../screens/ProductsAndCategoriesPage";
import CookingBookPage from "../screens/CookingBookPage";
import CookersPage from "../screens/CookersPage";
import WeekMenuPage from "../screens/WeekMenuPage";

import {View, TouchableHighlight, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

//Icons
// import { Icon } from '@iconify/react';

const Tab = createBottomTabNavigator()


//Screen names
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";

export default function BottomMenu(){
    // return (
    //     <NavigationContainer independent={true}>
    //         <Tab.Navigator
    //             initialRouteName={homeName}
    //             screenOptions={({ route }) => ({
    //                 tabBarIcon: ({ focused, color, size }) => {
    //                     let iconName;
    //                     let rn = route.name;
    //
    //                     if (rn === homeName) {
    //                         iconName = focused ? 'home' : 'home-outline';
    //
    //                     } else if (rn === detailsName) {
    //                         iconName = focused ? 'list' : 'list-outline';
    //
    //                     } else if (rn === settingsName) {
    //                         iconName = focused ? 'settings' : 'settings-outline';
    //                     }
    //
    //                     // You can return any component that you like here!
    //                     return <Ionicons name={iconName} size={size} color={color} />;
    //                 },
    //             })}
    //             tabBarOptions={{
    //                 activeTintColor: 'tomato',
    //                 inactiveTintColor: 'grey',
    //                 labelStyle: { paddingBottom: 10, fontSize: 10 },
    //                 style: { padding: 10, height: 70}
    //             }}>
    //
    //         <Tab.Screen name={homeName} component={ShoppingListsPage}/>
    //         <Tab.Screen name={detailsName} component={ProductsAndCategoriesPage}/>
    //         <Tab.Screen name={settingsName} component={CookingBookPage}/>
    //
    //         </Tab.Navigator>
    //     </NavigationContainer>
    // )
    //

      return  <View style={styles.bottomNav} >
                    <TouchableHighlight style={styles.bottomNavItem} >
                            <Ionicons name="cart-outline" size={33} style={styles.bottomNavIcon} />
                    </TouchableHighlight >
                    <TouchableHighlight style={styles.bottomNavItem} >
                            <Ionicons name="fast-food-outline" size={33} style={styles.bottomNavIcon} />
                    </TouchableHighlight >
                    <TouchableHighlight style={styles.bottomNavItem} >
                            <Ionicons name="book-outline" size={33} style={styles.bottomNavIcon} />
                    </TouchableHighlight >
                    <TouchableHighlight style={styles.bottomNavItem} >
                            <Ionicons name="people-outline" size={33} style={styles.bottomNavIcon} />
                    </TouchableHighlight >
                    <TouchableHighlight style={styles.bottomNavItem} >
                            <Ionicons name="calendar-outline" size={33} style={styles.bottomNavIcon} />
                    </TouchableHighlight >
                </View>

    }
