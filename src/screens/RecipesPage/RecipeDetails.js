import React, {useRef, useState} from 'react';
import {View, ScrollView, Image, Animated, Text, SafeAreaView} from 'react-native';
import {BANNER_H} from '../../components/constants';
import TopNavigation from '../../components/display/TopNavigation';
import {stylesRecipes} from "../../styles/stylesRecipes";
import {styles} from "../../styles/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";
import {ConditionalCard} from "../../components/display/ConditionalCard";
import CookCard from "../../components/display/CookCard";

export default function RecipeDetails({navigation}) {
    const scrollA = useRef(new Animated.Value(0)).current;

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
        <SafeAreaView>
            <TopNavigation title="Home"
                           scrollA={scrollA}
                           onPressBack={() => navigation.goBack()}/>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollA}}}],
                    {useNativeDriver: true},
                )}
                scrollEventThrottle={16}>

                <View style={stylesRecipes.recipeDetailsBanner}>
                    <Animated.Image
                        style={stylesRecipes.banner(scrollA)}
                        source={require('../../../public/images/eggs.jpg')}
                    />
                </View>

                <SafeAreaView style={stylesRecipes.recipeDetails}>

                    <View style={stylesRecipes.topLine}/>

                    <View style={stylesRecipes.headingSection}>
                        <Text style={styles.bigHeading}>Recipe Title</Text>
                        <View style={stylesRecipes.timeSection}>
                            <MaterialCommunityIcons name={"progress-clock"} size={25} color={"#4B4C4C"}/>
                            <Text style={[styles.subHeading, {fontWeight: "regular"}]}>30 min</Text>
                        </View>
                    </View>

                    <View style={stylesRecipes.portionsSection}>
                        <MaterialCommunityIcons name={"pot-mix-outline"} size={30} color={"#4B4C4C"}/>
                        <Text style={[styles.subHeading, {fontWeight: "regular"}]}>5 порции</Text>
                    </View>

                    <Text style={[styles.subHeading, stylesRecipes.paragraph]}>Lorem ipsum iste laborum maxime minima natus nemo neque, nostrum odio omnis perferendis perspiciatis quam quia quo quod recusandae reiciendis repellat reprehenderit tempore unde ut voluptates voluptatum? Distinctio, soluta.</Text>

                    <CookCard name={"The name of the cook"} numRecipes={13} img={"../../../public/images/testimonial-2.jpg"}/>

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
                            { label: "Products", value: false, },
                            { label: "Steps", value: true,}
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                    />

                    <ConditionalCard condition={toggle} steps={steps} products={products}/>


                </SafeAreaView>

            </Animated.ScrollView>
        </SafeAreaView>
    );
};
