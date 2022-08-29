import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfilePage from "../screens/ProfilePage/ProfilePage";
import CookersPage from "../screens/CookersPage/CookersPage";
import WeekMenuDetails from "../screens/WeekMenuPage/WeekMenuDetails";
import ShoppingList from "../screens/ShoppingListPage/ShoppingLists";
import RecipesPage from "../screens/RecipesPage/RecepiesPage";
import CookingBookPage from "../screens/CookingBookPage/CookingBookPage";
import WeekMenuPage from "../screens/WeekMenuPage/WeekMenuPage";
import RecipeDetails from "../screens/RecipesPage/RecipeDetails";
import CookerDetails from "../screens/CookersPage/CookerDetails";
import ShoppingListDetails from "../screens/ShoppingListPage/ShoppingListDetails";
import ProfileDetailsPage from "../screens/ProfilePage/ProfileDetailsPage"
import {Image, TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

import LoginPage from "../screens/Auth/LoginPage";
import ForgottenPasswordPage from "../screens/Auth/ForgottenPasswordPage";
import SignupPage from "../screens/Auth/SignupPage";


const ProfileNavigation = createNativeStackNavigator();

// Profile Page
function ProfileStack() {
    return (
        <ProfileNavigation.Navigator>
            <ProfileNavigation.Screen name="Settings" component={ProfilePage}/>
            <ProfileNavigation.Screen name="Profile Details" component={ProfileDetailsPage}/>
        </ProfileNavigation.Navigator>
    );
}


const ShoppingListNavigator = createNativeStackNavigator();

// Shopping List Page
function ShoppingListStack() {
    return (
        <ShoppingListNavigator.Navigator>
            <ShoppingListNavigator.Screen name="Shopping List"
                                          component={ShoppingList}/>
            <ShoppingListNavigator.Screen name="Shopping List Details"
                                          component={ShoppingListDetails}
                                          options={({route}) => ({title: route.params.title})}/>
            <ProfileNavigation.Screen name="Settings"
                                      component={ProfileStack}
                                      options={{headerShown: false}}/>
        </ShoppingListNavigator.Navigator>
    );
}


const RecipesNavigator = createNativeStackNavigator();

// Recipes Page
function RecipesStack() {
    return (
        <RecipesNavigator.Navigator>
            <RecipesNavigator.Screen name="Recipes" component={RecipesPage}/>
            <RecipesNavigator.Screen name="Recipe Details" component={RecipeDetails}
                                     options={{headerShown: false, tabBarVisible: false}}

            />
            <ProfileNavigation.Screen name="Settings"
                                      component={ProfileStack}
                                      options={{headerShown: false}}/>
        </RecipesNavigator.Navigator>
    );
}


const CookingBookNavigation = createNativeStackNavigator();

// Cooking Book Page
function CookingBookStack() {
    return (
        <CookingBookNavigation.Navigator>
            <CookingBookNavigation.Screen name="Cooking Book" component={CookingBookPage}/>
            <CookingBookNavigation.Screen name="Recipe Details" component={RecipeDetails}
                                          options={{headerShown: false, tabBarVisible: false}}
            />
            <ProfileNavigation.Screen name="Settings"
                                      component={ProfileStack}
                                      options={{headerShown: false}}/>
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
            <ProfileNavigation.Screen name="Settings"
                                      component={ProfileStack}
                                      options={{headerShown: false}}/>
        </CookersNavigator.Navigator>
    );
}

const WeekMenuNavigation = createNativeStackNavigator();

// Week Menu Page
function WeekMenuStack() {
    return (
        <WeekMenuNavigation.Navigator >
            <WeekMenuNavigation.Screen name="Week Menu" component={WeekMenuPage}
                                       options={({ navigation }) => ({
                                           headerTitle: () => (
                                               <LogoTitle onPress={() => navigation.navigate("Settings")}/>
                                           )
                                       })}
            />
            <WeekMenuNavigation.Screen name="Week Menu Details" component={WeekMenuDetails}/>
            <ProfileNavigation.Screen name="Settings"
                                      component={ProfileStack}
                                      options={{headerShown: false}}/>
        </WeekMenuNavigation.Navigator>
    );
}

function LogoTitle({onPress}) {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: 35,
            paddingLeft: 5,
            alignItems: "center"
        }}>
            <TouchableOpacity>
                <MaterialIcons name={"search"} size={33} color={"#4B4C4C"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{
                        width: 47,
                        height: 47,
                        borderRadius: 50,
                    }}
                    source={require('../../public/images/bob.jpg')}
                />
            </TouchableOpacity>
        </View>
    );
}


const Tab = createBottomTabNavigator();
// Main Navigation
export default function TabNavigator(props) {

    return (
        <Tab.Navigator
            screenOptions={{

                unmountOnBlur: true,
                tabBarStyle: {padding: 10, height: 60},
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

