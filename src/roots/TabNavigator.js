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
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

import LoginPage from "../screens/Auth/LoginPage";
import ForgottenPasswordPage from "../screens/Auth/ForgottenPasswordPage";
import SignupPage from "../screens/Auth/SignupPage";
import {LogoTitle} from "../components/display/CustomHeader";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import ProductsAndCategoriesPage from "../screens/ProfilePage/ProductsAndCategoriesPage";


const ProfileNavigation = createNativeStackNavigator();
// Profile Page
function ProfileStack() {
    return (
        <ProfileNavigation.Navigator>
            <ProfileNavigation.Screen name="Settings" component={ProfilePage}/>
            <ProfileNavigation.Screen name="Profile Details" component={ProfileDetailsPage}/>
            <ProfileNavigation.Screen name="Products and Categories" component={ProductsAndCategoriesPage}/>
        </ProfileNavigation.Navigator>
    );
}


const ShoppingListNavigator = createNativeStackNavigator();
// Shopping List Page
function ShoppingListStack() {
    return (
        <ShoppingListNavigator.Navigator>
            <ShoppingListNavigator.Screen name="Shopping List"
                                          component={ShoppingList}
                                          options={({ navigation }) => ({
                                              headerTitle: () => (
                                                  <LogoTitle onPress={() => navigation.navigate("Settings")}/>
                                              )
                                          })}/>
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
            <RecipesNavigator.Screen name="Recipes" component={RecipesPage}
                                     options={({ navigation }) => ({
                                         headerTitle: () => (
                                             <LogoTitle onPress={() => navigation.navigate("Settings")}/>
                                         )
                                     })}/>
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
            <CookingBookNavigation.Screen name="Cooking Book" component={CookingBookPage}
                                          options={({ navigation }) => ({
                                              headerTitle: () => (
                                                  <LogoTitle onPress={() => navigation.navigate("Settings")}/>
                                              )
                                          })}/>
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
            <CookersNavigator.Screen name="Cooks" component={CookersPage}
                                     options={({ navigation }) => ({
                                         headerTitle: () => (
                                             <LogoTitle onPress={() => navigation.navigate("Settings")}/>
                                         )
                                     })}
            />
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
                    tabBarIcon: ({focused}) => {return <MaterialCommunityIcons name={"cart-outline"} size={35} color={focused ? "#15A051" : "#C0C0C0"}/>},
                }}
            />
            <Tab.Screen name="RecipesStack" component={RecipesStack} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {return <MaterialIcons name={"dinner-dining"} color={focused ? "#15A051" : "#c0c0c0"} size={36}/>},
            }}/>
            <Tab.Screen name="CookingBookStack" component={CookingBookStack} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {return <MaterialCommunityIcons name={"book-open-page-variant-outline"} color={focused ? "#15A051" : "#C0C0C0"} size={34}/>},
            }}/>
            <Tab.Screen name="CookersStack" component={CookersStackScreen} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {return <Ionicons name={"people-outline"} color={focused ? "#15A051" : "#C0C0C0"} size={35}/>},
            }}/>
            <Tab.Screen name="WeekMenuStack" component={WeekMenuStack} options={{
                headerShown: false,
                tabBarLabel: '',
                tabBarIcon: ({focused}) => {return <Ionicons name={"calendar-outline"} color={focused ? "#15A051" : "#C0C0C0"} size={34}/>},
            }}/>
        </Tab.Navigator>
    );
}

