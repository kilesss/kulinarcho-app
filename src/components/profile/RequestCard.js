import React from 'react';
import styles from "../../styles/styles";
import {Text, TouchableOpacity, View} from "react-native";
import {stylesProfile} from "../../styles/stylesProfile";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

function RequestCard({text, onAcceptRequest, onDeleteRequest}) {
    return (
        <View style={{...styles.customButton, padding: 10, flexDirection: "row", alignItems: "center", minHeight: 65}}>
            <View style={{flex: 1}}>
                <Text style={{...styles.subHeading, fontWeight: "regular", marginTop: 0, marginBottom: 0}}>Покана от:
                </Text>
                <Text style={{...styles.heading, marginTop: 0}}>{text}</Text>
            </View>
            <TouchableOpacity style={stylesProfile.requestButton} onPress={onAcceptRequest}>
                <MaterialCommunityIcons name={"check-bold"} size={25} color={"#fff"}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...stylesProfile.requestButton, backgroundColor: "#D40000"}} onPress={onDeleteRequest}>
                <MaterialIcons name={"delete"} size={25} color={"#fff"}/>
            </TouchableOpacity>
        </View>
    );
}

export default RequestCard;
