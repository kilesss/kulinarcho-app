import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';


//Import all the screens needed
import SignupPage from './src/screens/Auth/SignupPage';
import LoginPage from './src/screens/Auth/LoginPage';
import ForgottenPasswordPage from './src/screens/Auth/ForgottenPasswordPage';

import ShoppingListsPage from "./src/screens/ShoppingLists";
import ProductsAndCategoriesPage from "./src/screens/ProductsAndCategoriesPage";
import CookingBookPage from "./src/screens/CookingBookPage";
import CookersPage from "./src/screens/CookersPage";
import WeekMenuPage from "./src/screens/WeekMenuPage";

global.MyVar = 'http://192.168.100.5/kulinarchophp/public/api/';

import { createStackNavigator } from '@react-navigation/stack';
import {Text} from "react-native";

const Stack = createStackNavigator();

function LogoTitle() {
    return (
        <Text style={{backgroundColor:'green', color:'#fff', height:40}}>Example</Text>
    );
}

function App() {
  return (
    <NavigationContainer screenOptions={{ headerShown: false }} >
      <Stack.Navigator >
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="ShoppingListsPage" component={ShoppingListsPage} options={{ headerTitle: props => <LogoTitle {...props} /> }} />
      <Stack.Screen name="ProductsAndCategoriesPage" component={ProductsAndCategoriesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

