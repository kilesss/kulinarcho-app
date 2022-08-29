import {TouchableOpacity, Text} from "react-native";
import styles from "../../styles/styles";
import {LinearGradient} from "expo-linear-gradient";

export const CustomButton = ({onPress, title, txtColor, bgColor = "#15A051", padding = 15}) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.customButton}>
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={[bgColor, bgColor+"8C"]}
            style={[
                {
                    borderRadius: 8,
                    paddingVertical: padding,
                }]}
        >
            <Text
                style={[
                    styles.customButtonText,
                    {
                        color: txtColor
                    }
                ]}>{title}</Text>
        </LinearGradient>
    </TouchableOpacity>
);

CustomButton.default
