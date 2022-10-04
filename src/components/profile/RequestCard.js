import React from 'react';
import styles from "../../styles/styles";
import {Text, TouchableOpacity, View} from "react-native";
import {stylesProfile} from "../../styles/stylesProfile";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

function RequestCard({text, groupID}) {
    return (
        <View style={{...styles.customButton, padding: 10, flexDirection: "row", alignItems: "center", minHeight: 65}}>
            <Text style={{...styles.heading, marginTop: 0, flex: 1}}>{text}</Text>
            <TouchableOpacity style={stylesProfile.requestButton}>
                <MaterialCommunityIcons name={"check-bold"} size={25} color={"#fff"}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...stylesProfile.requestButton, backgroundColor: "#D40000"}}>
                <MaterialIcons name={"delete"} size={25} color={"#fff"}/>
            </TouchableOpacity>
        </View>
    );
}

export default RequestCard;
