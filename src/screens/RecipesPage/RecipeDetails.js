import React, {useRef, useState} from 'react';
import {View, ScrollView, Image, Animated, Text} from 'react-native';
import {BANNER_H} from '../../components/constants';
import TopNavigation from '../../components/display/TopNavigation';
import {stylesRecipes} from "../../styles/stylesRecipes";
import {styles} from "../../styles/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";
import {ConditionalCard} from "../../components/display/ConditionalCard";

export default function RecipeDetails({navigation}) {
    const scrollA = useRef(new Animated.Value(0)).current;

    const [steps, setSteps] = useState(false)

    function renderStepsOrProducts(steps) {

        if (steps) {
            return <Text>Rendered Steps</Text>;
        }
        return <Text>Rendered Products</Text>;
    }

    return (
        <View>
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

                <View style={stylesRecipes.recipeDetails}>

                    <View style={stylesRecipes.topLine}/>

                    <View style={stylesRecipes.headingSection}>
                        <Text style={styles.bigHeading}>Recipe Title</Text>
                        <View style={stylesRecipes.timeSection}>
                            <MaterialCommunityIcons name={"pot-mix-outline"} size={25} color={"#4B4C4C"}/>
                            <Text style={[styles.subHeading, {fontWeight: "regular"}]}>30 min</Text>
                        </View>
                    </View>

                    <View style={stylesRecipes.portionsSection}>
                        <MaterialCommunityIcons name={"pot-mix-outline"} size={30} color={"#4B4C4C"}/>
                        <Text style={[styles.subHeading, {fontWeight: "regular"}]}>5 порции</Text>
                    </View>

                    <Text style={[styles.subHeading, {textAlign: "justify", lineHeight: 15, fontWeight: "regular"}]}>Lorem ipsum iste laborum maxime minima natus nemo neque, nostrum odio omnis perferendis perspiciatis quam quia quo quod recusandae reiciendis repellat reprehenderit tempore unde ut voluptates voluptatum? Distinctio, soluta.</Text>

                    <View style={stylesRecipes.cookCard}>
                        <Image source={require("../../../public/images/testimonial-2.jpg")} style={stylesRecipes.cookCardImage}/>
                        <View style={{paddingLeft: 7}}>
                            <Text style={[styles.heading, {marginTop: 0}]}>The Name of The Cook</Text>
                            <Text style={[styles.smallGreenText, {marginTop: -13,}]}>13 recepies</Text>
                        </View>
                    </View>

                    <SwitchSelector
                        initial={0}
                        onPress={value => setSteps(value)}
                        textColor={"#4B4C4C"} //'#7a44cf'
                        selectedColor={"#fff"}
                        buttonColor={"#15A051"}
                        backgroundColor={"#e8e8e8"}
                        height={47}
                        textStyle={{fontSize: 16}}
                        selectedTextStyle={{fontSize: 16}}
                        bold={true}
                        animationDuration={180}
                        options={[
                            { label: "Products", value: false, }, //images.feminino = require('./path_to/assets/img/feminino.png')
                            { label: "Steps", value: true,} //images.masculino = require('./path_to/assets/img/masculino.png')
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                    />

                    <ConditionalCard condition={steps}/>


                </View>

            </Animated.ScrollView>
        </View>
    );
};
