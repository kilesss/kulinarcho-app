import {TouchableOpacity, Text } from "react-native";
import styles from "../../styles/styles";

export const CustomButton = ({ onPress, title, txtColor, bgColor="#15A051", padding = 15}) => (

    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.customButton,
            {
                backgroundColor: bgColor,
                paddingTop: padding,
                paddingBottom: padding
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

CustomButton.default