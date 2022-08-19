import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'

export default function ProductsAndCategoriesPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Ionicons name="cart-outline" size={100} style={styles.bottomNavIcon} />
            <Text>Product and Categories Page</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}