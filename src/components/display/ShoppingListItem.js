import {TouchableOpacity, Text, Image, StyleSheet, View, Animated} from "react-native";
import styles from "../../styles/styles";
import React, {Component} from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export const rightSwipeActions = (progress, dragX, onPressDelete, height) => {
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
                marginLeft: -7,
                paddingHorizontal: 30,
                height: height,
                transform: [{ translateX: 0 }],

            }}
        >
            <TouchableOpacity onPress={onPressDelete}>
                <MaterialIcons name={"delete"} size={30} color={"#fff"} style={{padding: 5, paddingRight: 0}} />
            </TouchableOpacity>
        </Animated.View>
    );
};


export const ShoppingListItem = ({ onPress, title, price, num, checked, onPressDelete}) => (
    <GestureHandlerRootView>
    <Swipeable
        renderRightActions={(progress, dragX) => rightSwipeActions(progress, dragX, onPressDelete, 46)}
        >
        <TouchableOpacity
            onPress={onPress}
            // TODO: check both ways to see whats better
            activeOpacity={1}
            style={[shoppingListStyle.item,]}>
            <Checkbox style={shoppingListStyle.checkBox}
                      value={checked}
                      color={"#15A051"}
                      // TODO: I don't know how to make the checkbox change
                      onValueChange={() => checked = !checked}
            />
            <View>
                <Text style={shoppingListStyle.itemTitle}>{title}</Text>
                <Text style={shoppingListStyle.itemSubHeading}>{price}лв x {num} = 3лв</Text>
            </View>

        </TouchableOpacity>
    </Swipeable>
    </GestureHandlerRootView>
);

