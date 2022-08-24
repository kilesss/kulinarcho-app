import {TouchableOpacity, Text, View} from "react-native";
import styles from "../../styles/styles";
import { LinearGradient } from 'expo-linear-gradient';

export const CustomButton = ({ onPress, title, txtColor, bgColor="#15A051", padding = 15}) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.customButton,
            {
                backgroundColor: bgColor,
                paddingVertical: padding,
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