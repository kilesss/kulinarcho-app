import React from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'

export default function RecipesPage({ navigation }) {
    return (
        <View style={styles.container}>
            <Ionicons name="person-outline" size={100} style={styles.bottomNavIcon} />
            <Text>Profile Page - settings etc</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.push('Profile Details')}
            />
        </View>
    );
}