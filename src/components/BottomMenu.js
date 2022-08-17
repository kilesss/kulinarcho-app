import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";


import ShoppingListsPage from "./../screens/ShoppingLists";
import ProductsAndCategoriesPage from "./../screens/ProductsAndCategoriesPage";
import CookingBookPage from "./../screens/CookingBookPage";
import CookersPage from "./../screens/CookersPage";
import WeekMenuPage from "./../screens/WeekMenuPage";



const BottomTab = createBottomTabNavigator();

function BottomMenu() {
	return <NavigationContainer>
		<BottomTab.Navigator>
			<BottomTab.Screen name="ShoppingListsPage" component={ShoppingListsPage} options={{
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
			}} />
			<BottomTab.Screen name="ProductsAndCategoriesPage" component={ProductsAndCategoriesPage} options={{
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
			}} />
            <BottomTab.Screen name="CookingBookPage" component={CookingBookPage} options={{
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
			}} />
            <BottomTab.Screen name="CookersPage" component={CookersPage} options={{
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
			}} />
            <BottomTab.Screen name="WeekMenuPage" component={WeekMenuPage} options={{
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
			}} />
            
		</BottomTab.Navigator>
	</NavigationContainer>

}