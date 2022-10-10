import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import {stylesProfile} from "../../styles/stylesProfile";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import language from "../../language/language";
import {deleteUserFromGroup} from "../../RestRequests/generalRequest";

function SentRequestsComponent({text, onDeleteRequest}) {
    return (
        <View>
            <View style={{...styles.customButton, ...stylesProfile.requestComponent}}>
                <View style={{flex: 1}}>
                    <Text style={{...styles.subHeading, fontWeight: "regular", marginTop: 0, marginBottom: 0}}>Покана до:
                    </Text>
                    <Text style={{...styles.heading, marginTop: 0}}>{text}</Text>
                </View>
                <View style={stylesProfile.pendingTag}>
                    <Text style={{color: "#fff", fontWeight: "bold"}}>{language("pending")}</Text>
                </View>
                <TouchableOpacity style={{...stylesProfile.requestButton, backgroundColor: "#D40000"}} onPress={onDeleteRequest}>
                    <MaterialIcons name={"delete"} size={25} color={"#fff"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SentRequestsComponent;
