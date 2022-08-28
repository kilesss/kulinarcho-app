import {Text, View} from "react-native";
import styles from "../../styles/styles";
import React from "react";

export default function renderLoading(loading, render){
    if (loading == true) {
        return (
            <View style={styles.container}>
                <Text>loading</Text>
            </View>
        );
    } else {
    return render;
    }
}