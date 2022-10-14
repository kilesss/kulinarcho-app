import * as React from 'react';

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
import ProfilePersonalInfo from "../screens/ProfilePage/ProfilePersonalInfo"
import {Image, View} from 'react-native';

import {LogoTitle} from "../components/display/CustomHeader";
import ProductsAndCategoriesPage from "../screens/ProfilePage/ProductsAndCategoriesPage";
import {createStackNavigator} from "@react-navigation/stack";
import AddEditRecipe from "../screens/RecipesPage/AddEditRecipe";
import TabNavBottomLine from "../components/display/TabNavBottomLine";
import Images from "../../public/images/index";
import AllRecipes from "../screens/RecipesPage/AllRecipes";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import language from "../language/language";
import MyGroup from "../screens/ProfilePage/MyGroup";
import GroupRequests from "../screens/ProfilePage/GroupRequests";
import SentRequests from "../screens/ProfilePage/SentRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getGroupInfo} from "../RestRequests/generalRequest";
import {useEffect, useState} from "react";
import WeekMenuCreate from "../screens/WeekMenuPage/WeekMenuCreate";
import WeekMenuAddRecipes from "../screens/WeekMenuPage/WeekMenuAddRecipes";
import WeekMenuShoppingList from "../screens/WeekMenuPage/WeekMenuShoppingList";
import WeekMenuPickARecipe from "../screens/WeekMenuPage/WeekMenuPickARecipe";



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {

    const [demoToken, setDemoToken] = useState('');
    const [personalInfo, setPersonalInfo] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getGroupInfo('GET', value).then(data => {
                    if (data) {
                        setPersonalInfo(data)
                        setShowLoader(false)
                    }
                })
            }
        }, []);
    }

    useEffect(() => {
        loadData()
    }, []);


    return (
        <Tab.Navigator screenOptions={({navigation}) => ({
            tabBarStyle: {paddingVertical: 10, height: 60},
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 5,
                shadowColor: "#999",
            },
            headerTitle: () => (
                <LogoTitle navigation={navigation} photo={personalInfo.photo} name={personalInfo.name}  />
            )

        })}>
            <Tab.Screen name={"Shopping List"}
                        component={ShoppingList}
                        initialParams={{ openModal: false }}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{alignItems: "center"}}>
                                        <Image
                                            source={focused ? Images.navIcons.shoppingListsActive : Images.navIcons.shoppingLists}
                                            style={{height: 30, width: 30}}
                                        />
                                        {focused ? <TabNavBottomLine/> : ""}
                                    </View>
                                )
                            },
                        }}/>
            <Tab.Screen name={"Recipes"} component={RecipesPage}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{alignItems: "center"}}>
                                        <Image
                                            source={focused ? Images.navIcons.recipesActive : Images.navIcons.recipes}
                                            style={{height: 30, width: 30}}
                                        />
                                        {focused ? <TabNavBottomLine/> : ""}
                                    </View>
                                )
                            },
                        }}/>
            <Tab.Screen name={"Cooking Book"} component={CookingBookPage}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{alignItems: "center"}}>
                                        <Image
                                            source={focused ? Images.navIcons.cookBookActive : Images.navIcons.cookBook}
                                            style={{height: 30, width: 30}}
                                        />
                                        {focused ? <TabNavBottomLine/> : ""}
                                    </View>
                                )
                            },
                        }}/>
            <Tab.Screen name={"Cooks"} component={CookersPage}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{alignItems: "center"}}>
                                        <Image
                                            source={focused ? Images.navIcons.cookActive : Images.navIcons.cook}
                                            style={{height: 30, width: 25}}
                                        />
                                        {focused ? <TabNavBottomLine/> : ""}
                                    </View>
                                )
                            },
                        }}/>
            <Tab.Screen name={"Week Menu"} component={WeekMenuPage}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{alignItems: "center"}}>
                                        <Image
                                            source={focused ? Images.navIcons.calendarActive : Images.navIcons.calendar}
                                            style={{height: 30, width: 30}}
                                        />
                                        {focused ? <TabNavBottomLine/> : ""}
                                    </View>
                                )
                            },
                        }}/>
        </Tab.Navigator>
    )
}


export default function TabNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Main Screens"} component={MainTabs} options={{headerShown: false}}/>

            <Stack.Screen name="Shopping List Details" component={ShoppingListDetails}/>


            <Stack.Screen name="Settings" component={ProfilePage} options={{ title: language('settings')}} initialParams={{ photo: '', name: "Can't load name" }}/>
            <Stack.Screen name="Products and Categories" component={ProductsAndCategoriesPage} options={{ title: language('productsAndCategories') }}/>
            <Stack.Screen name={"Personal Info"} component={ProfilePersonalInfo} options={{ title: language('personalInfo') }}/>
            <Stack.Screen name={"My Group"} component={MyGroup} options={{title: 'Моята Група'}}/>
            <Stack.Screen name={"Group Requests"} component={GroupRequests} options={{title: 'Покани за Групи'}}/>
            <Stack.Screen name={"Sent Requests"} component={SentRequests} options={{title: 'Изпратени Покани'}}/>


            <Stack.Screen name={"Recipe Details"} component={RecipeDetails} options={{headerShown: false}}/>
            <Stack.Screen name={"Cooks Details"} component={CookerDetails}/>

            <Stack.Screen name={"Week Menu Details"} component={WeekMenuDetails}/>
            <Stack.Screen name={"Week Menu Create"} component={WeekMenuCreate} options={{title: "Създай Седмично Меню"}}/>
            <Stack.Screen name={"Week Menu Add Recipes"} component={WeekMenuAddRecipes}
                          // options={({ route }) => ({ title: route.params.title ? route.params.title : 'Меню без заглавие' })}
                          />
            <Stack.Screen name={"Week Menu Pick Recipe"} component={WeekMenuPickARecipe} options={"Избери Рецепта"}/>
            <Stack.Screen name={"Week Menu Shopping List"} component={WeekMenuShoppingList} options={{title: "Създай Списък за Пазар"}}/>

            <Stack.Screen name={"Add Edit Recipe"} component={AddEditRecipe} initialParams={{recipeDetails: '', productList: '', stepList: '', edit: false } }/>

            <Stack.Screen name={"All Recipes"} component={AllRecipes} options={{title: "Рецепти"}}/>
        </Stack.Navigator>
    )
}


// Main Navigation
// export default function TabNavigator(props) {
//
//     return (
//         <Tab.Navigator
//             screenOptions={{
//
//                 unmountOnBlur: true,
//                 tabBarStyle: {padding: 10, height: 60},
//             }}>
//             <Tab.Screen
//                 name="ShoppingListStack"
//                 component={ShoppingListStack}
//                 options={{
//                     headerShown: false,
//                     tabBarLabel: '',
//                     tabBarIcon: ({focused}) => {return <MaterialCommunityIcons name={"cart-outline"} size={35} color={focused ? "#15A051" : "#C0C0C0"}/>},
//                 }}
//             />
//             <Tab.Screen name="RecipesStack" component={RecipesStack} options={{
//                 headerShown: false,
//                 tabBarLabel: '',
//                 tabBarIcon: ({focused}) => {return <MaterialIcons name={"dinner-dining"} color={focused ? "#15A051" : "#c0c0c0"} size={36}/>},
//             }}/>
//             <Tab.Screen name="CookingBookStack" component={CookingBookStack} options={{
//                 headerShown: false,
//                 tabBarLabel: '',
//                 tabBarIcon: ({focused}) => {return <MaterialCommunityIcons name={"book-open-page-variant-outline"} color={focused ? "#15A051" : "#C0C0C0"} size={34}/>},
//             }}/>
//             <Tab.Screen name="CookersStack" component={CookersStackScreen} options={{
//                 headerShown: false,
//                 tabBarLabel: '',
//                 tabBarIcon: ({focused}) => {return <Ionicons name={"people-outline"} color={focused ? "#15A051" : "#C0C0C0"} size={35}/>},
//             }}/>
//             <Tab.Screen name="WeekMenuStack" component={WeekMenuStack} options={{
//                 headerShown: false,
//                 tabBarLabel: '',
//                 tabBarIcon: ({focused}) => {return <Ionicons name={"calendar-outline"} color={focused ? "#15A051" : "#C0C0C0"} size={34}/>},
//             }}/>
//         </Tab.Navigator>
//     );
// }

