import {Image, Text, TouchableOpacity} from "react-native";
import styles from "../../styles/styles";
import {stylesProfile} from "../../styles/stylesProfile";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React from "react";

export default function SettingsCardLarge({name, image, onPress}) {
    return (
        <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardLarge]}
                          onPress={onPress}
        >
            <Image  source={image} style={{height: 50, width: 50}}/>
            <Text style={{...styles.subHeading, fontSize: 16, textAlign: "center", paddingHorizontal: 10}}>{name}</Text>
        </TouchableOpacity>
    )
}
