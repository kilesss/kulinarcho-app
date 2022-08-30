import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'

export default function ProfileDetailsPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Ionicons name="cart-outline" size={100}  />
            <Text>Pforile Details</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}
