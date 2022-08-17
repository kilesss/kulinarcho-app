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

// export default class App extends React.Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Tab.Navigator
//           initialRouteName="Feed"
//           tabBarOptions={{
//             activeTintColor: '#42f44b',
//           }}>
//           <Tab.Screen
//             name="ShoppingListsPage"
//             component={ShoppingListsPage}
//             options={{
//               tabBarLabel: 'Списъци за пазар',
//               tabBarIcon: ({ focused, color, size }) => (
//                 <Image
//                   style={{
//                     width: size,
//                     height: size,
//                     borderRadius: size,
//                   }}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="ProductsAncCategoriesPage"
//             component={ProductsAndCategoriesPage}
//             options={{
//               tabBarLabel: 'Продукти и категории',
//               tabBarIcon: ({ focused, color, size }) => (
//                 <Image
//                   style={{
//                     width: size,
//                     height: size,
//                     borderRadius: size,
//                   }}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="CookingBookPage"
//             component={CookingBookPage}
//             options={{
//               tabBarLabel: 'Готварска книга',
//               tabBarIcon: ({ focused, color, size }) => (
//                 <Image
//                   style={{
//                     width: size,
//                     height: size,
//                     borderRadius: size,
//                   }}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="CookersPage"
//             component={CookersPage}
//             options={{
//               tabBarLabel: 'Готвачи',
//               tabBarIcon: ({ focused, color, size }) => (
//                 <Image
//                   style={{
//                     width: size,
//                     height: size,
//                     borderRadius: size,
//                   }}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="WeekMenuPage"
//             component={WeekMenuPage}
//             options={{
//               tabBarLabel: 'WeekMenuPage',
//               tabBarIcon: ({ focused, color, size }) => (
//                 <Image
//                   style={{
//                     width: size,
//                     height: size,
//                     borderRadius: size,
//                   }}
//                 />
//               ),
//             }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
// const Tab = createBottomTabNavigator();
// createAppContainer(MainNavigation);
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer screenOptions={{ headerShown: false }} >
      <Stack.Navigator >
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="ShoppingListsPage" component={ShoppingListsPage} />
      <Stack.Screen name="ProductsAndCategoriesPage" component={ProductsAndCategoriesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// export default class App extends React.Component {
//   render() {
//     return <AppContainer style={{backgroundColor:"blue"}} />;
//   }
// }

// const AppNavigator = createStackNavigator({
//   LoginPage: {screen: LoginPage},
//   SignupPage: {screen: SignupPage},
//   ForgottenPasswordPage: {screen: ForgottenPasswordPage},
//   ShoppingListsPage: {screen: ShoppingListsPage},
//   ProductsAndCategoriesPage: {screen: ProductsAndCategoriesPage},
//   CookingBookPage: {screen: CookingBookPage},
//   CookersPage: {screen: CookersPage},
//   WeekMenuPage: {screen: WeekMenuPage},
// },{
//   headerMode: 'none',
// });

// const AppContainer = createAppContainer(AppNavigator);

