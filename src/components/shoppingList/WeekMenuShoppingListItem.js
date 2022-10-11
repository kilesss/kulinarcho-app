import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import {stylesProfile} from "../../styles/stylesProfile";
import language from "../../language/language";
import {MaterialIcons} from "@expo/vector-icons";

function WeekMenuShoppingListItem(props) {
    return (
        <View>
            <View style={{...styles.customButton, ...stylesProfile.requestComponent}}>
                <View style={{flex: 1}}>
                    <Text style={{...styles.heading, marginTop: 0}}>Ябълки</Text>
                    <Text style={{...styles.subHeading, fontWeight: "regular", marginTop: 0, marginBottom: 0}}>Нужно количество:
                    </Text>
                </View>
                <TextInput style={{borderBottomColor: "#ccc", borderBottomWidth: 3, width: 40, height: 30, marginHorizontal: 20, paddingBottom: 0, textAlign: "center"}}/>
                <TouchableOpacity style={{...stylesProfile.requestButton, backgroundColor: "#D40000"}} onPress={() => console.log("Pressed Delete")}>
                    <MaterialIcons name={"delete"} size={25} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WeekMenuShoppingListItem;
