import React from 'react';
import 'react-native-gesture-handler';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationContainer } from '@react-navigation/native';

import { Image } from "react-native";

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

const Auth = createStackNavigator({
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

      title: 'Register',
      headerStyle: {
        backgroundColor: '#689F38',
      },
      headerTintColor: '#fff',
    },
  },
  ShoppingListsPage: {
    screen: ShoppingListsPage,
    navigationOptions: {
      title: 'ShoppingListsPage',
      headerStyle: {
        backgroundColor: '#689F38',
      },
      headerTintColor: '#fff',
    },
  },

});

/* Switch Navigator for those screens which needs to be switched only once
 and we don't want to switch back once we switch from them to the next one */
const MainNavigation = createSwitchNavigator({
  Auth: {
    /* Auth Navigator which includer Login Signup will come once */
    screen: Auth,
  },

  ShoppingListsPage: {
    screen: ShoppingListsPage,
    navigationOptions: {
      title: 'ProductsSettings',
      headerStyle: {
        backgroundColor: '#689F38',
      },
      headerTintColor: '#fff',
    },
  }
});

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          tabBarOptions={{
            activeTintColor: '#42f44b',
          }}>
          <Tab.Screen
            name="ShoppingListsPage"
            component={ShoppingListsPage}
            options={{
              tabBarLabel: 'Списъци за пазар',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ProductsAncCategoriesPage"
            component={ProductsAndCategoriesPage}
            options={{
              tabBarLabel: 'Продукти и категории',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CookingBookPage"
            component={CookingBookPage}
            options={{
              tabBarLabel: 'Готварска книга',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CookersPage"
            component={CookersPage}
            options={{
              tabBarLabel: 'Готвачи',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="WeekMenuPage"
            component={WeekMenuPage}
            options={{
              tabBarLabel: 'WeekMenuPage',
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size,
                  }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
const Tab = createBottomTabNavigator();
createAppContainer(MainNavigation);