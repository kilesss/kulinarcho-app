import {Text, TouchableOpacity} from "react-native";
import styles from "../../styles/styles";
import {stylesProfile} from "../../styles/stylesProfile";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";

export default function SettingsCardLarge({name, icon, iconColor="#15A051", onPress}) {
    return (
        <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardLarge]}
                          onPress={onPress}
        >
            <MaterialCommunityIcons name={icon} color={iconColor} size={40}/>
            <Text style={{...styles.subHeading, fontSize: 16}}>{name}</Text>
        </TouchableOpacity>
    )
}
