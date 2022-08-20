import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "../styles/styles";

export const CustomButton = ({ onPress, title, txtColor, bgColor }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.customButton,
            {
                backgroundColor: bgColor
            }]}>
        <Text
            style={[
            styles.customButtonText,
            {
                color: txtColor
            }
            ]}>{title}</Text>
    </TouchableOpacity>
);