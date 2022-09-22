import React, {useState} from 'react';
import {FloatingAction} from "react-native-floating-action";
import {View} from "react-native";
import language from "../../language/language";
import AddShoppingListModal from "../shoppingList/AddShoppingListModal";
import Images from "../../../public/images";

export const actions = [
    {
        text: "Добави Списък за Пазар",
        icon: Images.navIcons.shoppingLists,
        name: "addList",
        position: 2,
        color: "#15a051",
        buttonSize: 43,
    },
    {
        text: "Добави Рецепта",
        icon: Images.navIcons.recipes,
        name: "bt_accessibility",
        position: 1,
        color: "#15a051",
        buttonSize: 43,
    },
];

function FloatingActionButton({navigation, addModalVisible, setAddModalVisible}) {
    return (

        <FloatingAction
            actions={actions}
            buttonSize={60}
            distanceToEdge={25}
            color={'#15A051'}
            onPressItem={name => {
                if (name === "addList") {
                    setAddModalVisible(!addModalVisible)
                } else {
                    navigation.navigate("Add Edit Recipe")
                }
            }}
        />

    );
}

export default FloatingActionButton;
