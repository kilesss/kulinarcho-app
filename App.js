import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';


//Import all the screens needed
import SignupPage from './src/screens/Auth/SignupPage';
import LoginPage from './src/screens/Auth/LoginPage';
import ForgottenPasswordPage from './src/screens/Auth/ForgottenPasswordPage';

import ShoppingListsPage from "./src/screens/ShoppingListPage/ShoppingLists";
import ProductsAndCategoriesPage from "./src/screens/ProfilePage/ProductsAndCategoriesPage";
import CookingBookPage from "./src/screens/CookingBookPage/CookingBookPage";
import CookersPage from "./src/screens/CookersPage/CookersPage";
import WeekMenuPage from "./src/screens/WeekMenuPage/WeekMenuPage";

global.MyVar = 'http://192.168.100.5/kulinarchophp/public/api/';

import {Text} from "react-native";
import TabNavigator from "./src/roots/TabNavigator";
import AuthSack from "./src/roots/AuthNavigation";
import FullNavigator from "./src/roots/TabNavigator";



function LogoTitle() {
    return (
        <Text style={{backgroundColor:'green', color:'#fff', height:40}}>Example</Text>
    );
}

function App() {
  return (
    // <TabNavigator/>
      <AuthSack/>
  );
}

export default App;

