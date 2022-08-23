import {TouchableOpacity, Text, Image, StyleSheet, View, Animated} from "react-native";
import styles from "../../styles/styles";
import React, {Component} from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const rightSwipeActions = (progress, dragX) => {
    const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [-20, 0, 0, 1],
    });
    return (
        <Animated.View
            style={{
                backgroundColor: '#D40000',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingVertical: 5,
                marginLeft: -5,
                paddingHorizontal: 30,
                height: 46,
                transform: [{ translateX: 0 }],

            }}
        >
            <MaterialIcons name={"delete"} size={30} color={"#fff"} />
        </Animated.View>
    );
};

const swipeFromLeftOpen = () => {
    alert('Swipe from left');
};
const swipeFromRightOpen = () => {
    alert('Swipe from right');
};


export const ShoppingListItem = ({ onPress, title, tickColor, circleColor, price, num}) => (
    <GestureHandlerRootView>
    <Swipeable
        renderRightActions={rightSwipeActions}
        // onSwipeableRightOpen={swipeFromRightOpen}
        // onSwipeableLeftOpen={swipeFromLeftOpen}
        >
        <TouchableOpacity
            onPress={onPress}
            style={[shoppingListStyle.item,]}>
            <View style={[
                shoppingListStyle.checkBox, {backgroundColor: circleColor}]}>
                <Ionicons name={"checkmark-outline"} size={20} color={tickColor}/>
            </View>
            <View>
                <Text style={shoppingListStyle.itemTitle}>{title}</Text>
                <Text style={shoppingListStyle.itemSubHeading}>{price} x {num} = 3лв</Text>
            </View>

        </TouchableOpacity>
    </Swipeable>
    </GestureHandlerRootView>
);

