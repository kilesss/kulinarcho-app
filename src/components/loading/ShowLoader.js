import {ActivityIndicator,  View} from "react-native";
import styles from "../../styles/styles";
import React from "react";

export default function renderLoading(loading, render){
    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 70}}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    } else {
    return render;
    }
}
