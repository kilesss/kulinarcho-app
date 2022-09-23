import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {CardStyleInterpolators, TransitionPreset} from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import FirstPage from "../screens/FirstLogin/FirstPage";
import SecondPage from "../screens/FirstLogin/SecondPage";
import ThirdPage from "../screens/FirstLogin/ThirdPage";
import FourthPage from "../screens/FirstLogin/FourthPage";

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const StackNav = createNativeStackNavigator();
// Shopping List Page
export default function FirstLoginNavigation() {
    return (
        <StackNav.Navigator screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.horizontal
        }}>
            <StackNav.Screen name="Page 1" component={FirstPage} options={{ cardStyleInterpolator: forFade }}/>
            <StackNav.Screen name="Page 2" component={SecondPage} options={{ cardStyleInterpolator: forFade }}/>
            <StackNav.Screen name="Page 3" component={ThirdPage} options={{ cardStyleInterpolator: forFade }}/>
            <StackNav.Screen name="Page 4" component={FourthPage} options={{ cardStyleInterpolator: forFade }}/>
            <StackNav.Screen name="Shopping List" component={TabNavigator} options={{headerShown: false}}/>
        </StackNav.Navigator>
    );
}
