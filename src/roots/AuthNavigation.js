import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ShoppingList from "../screens/ShoppingListPage/ShoppingLists";
import ShoppingListDetails from "../screens/ShoppingListPage/ShoppingListDetails";
import LoginPage from "../screens/Auth/LoginPage";
import SignupPage from "../screens/Auth/SignupPage";
import ForgottenPasswordPage from "../screens/Auth/ForgottenPasswordPage";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./TabNavigator";

const AuthNavigation = createNativeStackNavigator();
// Shopping List Page
export default function AuthStack() {
    return (
        <NavigationContainer>
        <AuthNavigation.Navigator >
            <AuthNavigation.Screen name="Login" component={LoginPage} />
            <AuthNavigation.Screen name="Forgotten Password" component={ForgottenPasswordPage} />
            <AuthNavigation.Screen name="Signup" component={SignupPage} />
            <AuthNavigation.Screen name="Shopping List" component={TabNavigator} options={{headerShown: false}}/>
        </AuthNavigation.Navigator>
        </NavigationContainer>
    );
}