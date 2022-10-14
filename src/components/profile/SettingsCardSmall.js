import styles from "../../styles/styles";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {stylesProfile} from "../../styles/stylesProfile";

export default function SettingsCardSmall({name, icon, onPress, color = "#15A051"}) {
    return (
        <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardSmall]}
                          onPress={onPress}
        >
            <MaterialCommunityIcons name={icon} color={color} size={32}/>
            <Text style={{...styles.subHeading, flex: 1, paddingLeft: 7, fontSize: 16}}>{name}</Text>
            <MaterialIcons name={"keyboard-arrow-right"} color={"#c4c4c4"} size={35}/>
        </TouchableOpacity>
    )
}
