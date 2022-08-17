import React from 'react';
import 'react-native-gesture-handler';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'


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

const Navigation = createStackNavigator({

  //Stack Navigator for Login and Sign up Screen 
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgottenPasswordPage: {
    screen: ForgottenPasswordPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignupPage: {
    screen: SignupPage,
    navigationOptions: {
      headerShown: false,
    },
  },

  //this page show where to go first
  LoginPage: {
    screen: LoginPage,
    navigationOptions: {
      headerShown: false,
    },
  },

  //this page show where to go first
  ShoppingListsPage: {
    screen: ShoppingListsPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  //this page show where to go first
  ProductsAndCategoriesPage: {
    screen: ProductsAndCategoriesPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  //this page show where to go first
  CookingBookPage: {
    screen: CookingBookPage,
    navigationOptions: {
      headerShown: false,
    },
  },
  //this page show where to go first
  CookersPage: {
    screen: CookersPage,
    navigationOptions: {
      headerShown: false,
    },
  },

});

/* Switch Navigator for those screens which needs to be switched only once
and we don't want to switch back once we switch from them to the next one */
// const App = createSwitchNavigator({Navigation});

export default createAppContainer(createSwitchNavigator({Navigation}));