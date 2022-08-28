import {ActivityIndicator,  View} from "react-native";
import styles from "../../styles/styles";
import React from "react";

export default function renderLoading(loading, render){
    if (loading == true) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    } else {
    return render;
    }
}