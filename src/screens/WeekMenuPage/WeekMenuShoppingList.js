import React from 'react';
import {Text, View} from "react-native";
import styles from "../../styles/styles";
import WeekMenuShoppingListItem from "../../components/shoppingList/WeekMenuShoppingListItem";

function WeekMenuShoppingList({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Рецепти</Text>
            <Text style={{...styles.heading, color: "#15A051", marginTop: 0}}>A recipe</Text>
            <Text style={{...styles.heading, color: "#15A051", marginTop: 0}}>Another recipe</Text>

            <Text style={styles.heading}>Списък за Пазар</Text>
            <View style={{alignSelf: "stretch"}}>
            <WeekMenuShoppingListItem/>
            </View>
        </View>
    );
}

export default WeekMenuShoppingList;
