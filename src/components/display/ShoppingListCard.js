import {TouchableOpacity, Text, Image, StyleSheet, View, Animated} from "react-native";
import styles from "../../styles/styles";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";



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
                height: 130,
                transform: [{ translateX: 0 }],

            }}
        >

            <TouchableOpacity>
                <MaterialIcons name={"delete"} size={30} color={"#fff"} />
            </TouchableOpacity>
        </Animated.View>
    );
};


export const ShoppingListCard = ({ onPress, bgColor, title, numItems, onPressEdit }) => (
    <GestureHandlerRootView>
        <Swipeable
            renderRightActions={(progress, dragX) => rightSwipeActions(progress, dragX)}
            // onSwipeableRightOpen={swipeFromRightOpen}
            // onSwipeableLeftOpen={swipeFromLeftOpen}
        >
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.customButton,
            shoppingListStyle.card,
            {
                backgroundColor: bgColor,
            }]}>
        <View style={shoppingListStyle.cardText}>
            <Text style={shoppingListStyle.cardSubHeading}>{numItems} артикула</Text>
            <Text style={shoppingListStyle.cardTitle}>{title}</Text>
        </View>
        <Image source={require('../../../public/images/icons/ion_receipt.png')} style={shoppingListStyle.receipt}/>
        <View style={shoppingListStyle.editContainer}>
            <TouchableOpacity onPress={onPressEdit}>
                <Ionicons name="create-outline" size={35} style={shoppingListStyle.editButton}/>
            </TouchableOpacity>
        </View>

    </TouchableOpacity>

        </Swipeable>
    </GestureHandlerRootView>
);

