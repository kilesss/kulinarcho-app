import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from "../screens/ProfilePage/ProfilePage";
import CookersPage from "../screens/CookersPage/CookersPage";
import DetailsPage from "../screens/DetailsPage";
import ShoppingList from "../screens/ShoppingListPage/ShoppingLists";
import RecipesPage from "../screens/RecipesPage/RecepiesPage";
import CookingBookPage from "../screens/CookingBookPage/CookingBookPage";
import WeekMenuPage from "../screens/WeekMenuPage/WeekMenuPage";
import RecipeDetails from "../screens/RecipesPage/RecipeDetails";
import CookerDetails from "../screens/CookersPage/CookerDetails";
import ShoppingListDetails from "../screens/ShoppingListPage/ShoppingListDetails";
import {createStackNavigator} from "@react-navigation/stack";
import {Image} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

import LoginPage from "../screens/Auth/LoginPage";
import ForgottenPasswordPage from "../screens/Auth/ForgottenPasswordPage";
import SignupPage from "../screens/Auth/SignupPage";
import Header from "../components/display/header";


const ProfileNavigation = createNativeStackNavigator();

// Profile Page
function ProfileStack() {
    return (
        <ProfileNavigation.Navigator>
            <ProfileNavigation.Screen name="Settings" component={ProfilePage}/>
            <ProfileNavigation.Screen name="Profile Details" component={DetailsPage}/>
        </ProfileNavigation.Navigator>
    );
}


const ShoppingListNavigator = createNativeStackNavigator();

// Shopping List Page
function ShoppingListStack() {
    return (
        <ShoppingListNavigator.Navigator >
            <ShoppingListNavigator.Screen name="Shopping List"
                                          component={ShoppingList}/>
            <ShoppingListNavigator.Screen name="Shopping List Details"
                                          component={ShoppingListDetails}
                                          options={({ route }) => ({ title: route.params.title })}/>
        </ShoppingListNavigator.Navigator>
    );
}


const RecipesNavigator = createNativeStackNavigator();

// Recipes Page
function RecipesStack() {
    return (
        <RecipesNavigator.Navigator>
            <RecipesNavigator.Screen name="Recipes" component={RecipesPage}/>
            <RecipesNavigator.Screen name="Recipes Details" component={RecipeDetails}/>
        </RecipesNavigator.Navigator>
    );
}


const CookingBookNavigation = createNativeStackNavigator();

// Cooking Book Page
function CookingBookStack() {
    return (
        <CookingBookNavigation.Navigator>
            <CookingBookNavigation.Screen name="Cooking Book" component={CookingBookPage}/>
            <CookingBookNavigation.Screen name="Recipe Details" component={RecipeDetails}/>
        </CookingBookNavigation.Navigator>
    );
}


const CookersNavigator = createNativeStackNavigator();

// Cookers Page
function CookersStackScreen() {
    return (
        <CookersNavigator.Navigator>
            <CookersNavigator.Screen name="Cooks" component={CookersPage}/>
            <CookersNavigator.Screen name="Cooks Details" component={CookerDetails}/>
        </CookersNavigator.Navigator>
    );
}

const WeekMenuNavigation = createNativeStackNavigator();

// Week Menu Page
function WeekMenuStack() {
    return (
        <WeekMenuNavigation.Navigator>
            <WeekMenuNavigation.Screen name="Week Menu" component={WeekMenuPage}/>
            <WeekMenuNavigation.Screen name="Week Menu Details" component={DetailsPage}/>
        </WeekMenuNavigation.Navigator>
    );
}


const Tab = createBottomTabNavigator();
// Main Navigation
export default function TabNavigator(props) {

    return (
        <Tab.Navigator screenOptions={{
            unmountOnBlur: true,
            tabBarStyle: {padding:10, height:60},
        }}>
            <Tab.Screen
                name="ShoppingListStack"
                component={ShoppingListStack}
                options={{
                    headerShown: false,
                    tabBarLabel: '',

                    tabBarIcon: ({focused}) => {
                        if (focused) {
                            return <Image source={require('../../public/images/icons/shoppingList-selected.png')}/>
                        } else {
                            return <Image source={require('../../public/images/icons/shoppingList.png')}/>
                        }
                    },

                }}
            />
            <Tab.Screen name="RecipesStack" component={RecipesStack} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {
                    if (focused) {
                        return <MaterialIcons name={"dinner-dining"} color={"#15A051"} size={35}/>
                    } else {
                        return <Image source={require('../../public/images/icons/recipes.png')}/>
                    }
                },
            }}/>
            <Tab.Screen name="CookingBookStack" component={CookingBookStack} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {

                    if (focused) {
                        return <Image source={require('../../public/images/icons/cookingBook-selected.png')}/>
                    } else {
                        return <Image source={require('../../public/images/icons/cookingBook.png')}/>
                    }
                },
            }}/>
            <Tab.Screen name="CookersStack" component={CookersStackScreen} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {

                    if (focused) {
                        return <Image source={require('../../public/images/icons/cooker-selected.png')}/>
                    } else {
                        return <Image source={require('../../public/images/icons/cookers.png')}/>
                    }
                },
            }}/>
            <Tab.Screen name="WeekMenuStack" component={WeekMenuStack} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {

                    if (focused) {
                        return <Image source={require('../../public/images/icons/weekMenu-selected.png')}/>
                    } else {
                        return <Image source={require('../../public/images/icons/weekMenu.png')}/>
                    }
                },
            }}/>
        </Tab.Navigator>
    );
}

