import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import {stylesProfile} from "../../styles/stylesProfile";
import language from "../../language/language";
import {MaterialIcons} from "@expo/vector-icons";

function WeekMenuShoppingListItem({title, requiredAmount, onDelete}) {
    return (
        <View>
            <View style={{...styles.customButton, ...stylesProfile.requestComponent}}>
                <View style={{flex: 1}}>
                    <Text style={{...styles.heading, marginTop: 0}}>{title}</Text>
                    <Text style={{...styles.subHeading, fontWeight: "regular", marginTop: 0, marginBottom: 0}}>Нужно: <Text style={{color: "#15A051"}}>{requiredAmount}</Text>
                    </Text>
                </View>
                <TextInput style={styles.borderBottomTextInput} placeholder={"0"}/>
                <TouchableOpacity style={{...stylesProfile.requestButton, backgroundColor: "#D40000"}} onPress={() => onDelete}>
                    <MaterialIcons name={"delete"} size={25} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WeekMenuShoppingListItem;
