import React, {useState} from "react";
import {Button, Text, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../styles/styles'
import SwitchSelector from "react-native-switch-selector";
import language from "../../language/language";
import {ConditionalCard} from "../../components/recipes/ConditionalCard";

export default function ProductsAndCategoriesPage({ navigation }) {

    const [toggle, setToggle] = useState(false)

    const [steps, setSteps] = useState([
        {key: "1", title: "Step 1", description: "Some text for the description part of the step with details blah blah"},
        {key: "2", title: "Step 2", description: "Some text for the description part of the step with details blah blah. Some text for the description part of the step with details blah blah"},
        {key: "3", title: "Step 3", description: "Some text for the description part of the step with details blah blah, Some text for the description part of the step with details blah blah, Some text for the description part of the step with details blah blah"},
        {key: "4", title: "Step 4", description: "Some text for the description part of the step with details blah blah"},
        {key: "5", title: "Step 5", description: "Some text for the description part of the step with details blah blah"},
        {key: "6", title: "Step 6", description: "Some text for the description part of the step with details blah blah"}

    ])

    const [products, setProducts] = useState([
        {key: "1", title: "Carrot", icon: "carrot", amount: "100g", color: "#FF7410"},
        {key: "2", title: "Apple", icon: "food-apple", amount: "100g", color: "#d91212"},
        {key: "3", title: "Rice", icon: "rice", amount: "100g", color: "#cec6c2"},
        {key: "4", title: "Carrot", icon: "food-drumstick", amount: "100g", color: "#693000"},
        {key: "5", title: "Apple", icon: "food-apple", amount: "100g", color: "#e30000"},
        {key: "6", title: "Rice", icon: "rice", amount: "100g", color: "#cec6c2"},
        {key: "7", title: "Carrot", icon: "carrot", amount: "100g", color: "#FF7410"},
        {key: "8", title: "Apple", icon: "food-apple", amount: "100g", color: "#e30000"},
        {key: "9", title: "Rice", icon: "rice", amount: "100g", color: "#cec6c2"},
    ])

    return (
        <View style={styles.container}>
            <SwitchSelector
                initial={0}
                onPress={value => setToggle(value)}
                textColor={"#4B4C4C"} //'#7a44cf'
                selectedColor={"#fff"}
                buttonColor={"#15A051"}
                backgroundColor={"#e8e8e8"}
                height={50}
                style={{marginBottom: 10, marginTop: 20}}
                textStyle={{fontSize: 18}}
                selectedTextStyle={{fontSize: 18}}
                bold={true}
                animationDuration={180}
                options={[
                    { label: language("products"), value: false, },
                    { label: language("steps"), value: true,}
                ]}
                testID="gender-switch-selector"
                accessibilityLabel="gender-switch-selector"
            />

            <ConditionalCard condition={toggle} steps={steps} products={products}/>
        </View>
    );
}
