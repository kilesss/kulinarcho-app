import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, Image, Animated, Text, SafeAreaView} from 'react-native';
import {BANNER_H} from '../../components/constants';
import TopNavigation from '../../components/display/TopNavigation';
import {stylesRecipes} from "../../styles/stylesRecipes";
import {styles} from "../../styles/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";
import {ConditionalCard} from "../../components/recipes/ConditionalCard";
import CookCard from "../../components/display/CookCard";
import language from "../../language/language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSingleRecipe} from "../../RestRequests/generalRequest";
import renderLoading from "../../components/loading/ShowLoader";

export default function RecipeDetails({route, navigation}) {

    const scrollA = useRef(new Animated.Value(0)).current;

    const [toggle, setToggle] = useState(false)

    // const [steps, setSteps] = useState([
    //     {
    //         key: "1",
    //         title: "Step 1",
    //         description: "Some text for the description part of the step with details blah blah"
    //     },
    //     {
    //         key: "2",
    //         title: "Step 2",
    //         description: "Some text for the description part of the step with details blah blah. Some text for the description part of the step with details blah blah"
    //     },
    //     {
    //         key: "3",
    //         title: "Step 3",
    //         description: "Some text for the description part of the step with details blah blah, Some text for the description part of the step with details blah blah, Some text for the description part of the step with details blah blah"
    //     },
    //     {
    //         key: "4",
    //         title: "Step 4",
    //         description: "Some text for the description part of the step with details blah blah"
    //     },
    //     {
    //         key: "5",
    //         title: "Step 5",
    //         description: "Some text for the description part of the step with details blah blah"
    //     },
    //     {
    //         key: "6",
    //         title: "Step 6",
    //         description: "Some text for the description part of the step with details blah blah"
    //     }
    //
    // ])

    // const [products, setProducts] = useState([
    //     {key: "1", title: "Carrot", icon: "carrot", amount: "100g", color: "#FF7410"},
    //     {key: "2", title: "Apple", icon: "food-apple", amount: "100g", color: "#d91212"},
    //     {key: "3", title: "Rice", icon: "rice", amount: "100g", color: "#cec6c2"},
    //     {key: "4", title: "Carrot", icon: "food-drumstick", amount: "100g", color: "#693000"},
    //     {key: "5", title: "Apple", icon: "food-apple", amount: "100g", color: "#e30000"},
    //     {key: "6", title: "Rice", icon: "rice", amount: "100g", color: "#cec6c2"},
    //     {key: "7", title: "Carrot", icon: "carrot", amount: "100g", color: "#FF7410"},
    //     {key: "8", title: "Apple", icon: "food-apple", amount: "100g", color: "#e30000"},
    //     {key: "9", title: "Rice", icon: "rice", amount: "100g", color: "#cec6c2"},
    // ])

    const cook = {key: 1, name: "Bob Marley", recipes: 420}

    const {recipeId} = route.params;
    const [recipeDetails, setRecipeDetails] = useState([])
    const [steps, setSteps] = useState([])
    const [products, setProducts] = useState([])
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getSingleRecipe('GET', value, recipeId).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setRecipeDetails(result[0])
                        // console.log("---Recipe ID---\n" + result[0].id + "\n---------------")
                        setProducts(result[1])
                        setSteps(Object.values(result[2]))
                        setShowLoader(false);
                    }

                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadData();

    }, []);

    return (
        renderLoading(showLoader, <SafeAreaView>
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
                            source={{
                                uri: 'https://kulinarcho.com' + recipeDetails.photo,
                            }}
                        />
                    </View>

                    <SafeAreaView style={stylesRecipes.recipeDetails}>

                        <View style={stylesRecipes.topLine}/>

                        <View style={stylesRecipes.headingSection}>
                            <Text style={styles.bigHeading}>{recipeDetails.title}</Text>
                            <View style={stylesRecipes.timeSection}>
                                <MaterialCommunityIcons name={"progress-clock"} size={25} color={"#4B4C4C"}/>
                                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>{recipeDetails.all_time} min</Text>
                            </View>
                        </View>

                        <View style={stylesRecipes.portionsSection}>
                            <MaterialCommunityIcons name={"pot-mix-outline"} size={30} color={"#4B4C4C"}/>
                            <Text style={[styles.subHeading, {fontWeight: "regular"}]}>{recipeDetails.portion} порции</Text>
                        </View>

                        <Text style={[styles.subHeading, stylesRecipes.paragraph]}>{recipeDetails.description}</Text>

                        <CookCard name={"The name of the cook"}
                                  numRecipes={13}
                                  img={"../../../public/images/testimonial-2.jpg"}
                                  onPress={() => navigation.navigate("Cooks Details", {cook: cook})}/>

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
                                {label: language("products"), value: false,},
                                {label: language("steps"), value: true,}
                            ]}
                            testID="gender-switch-selector"
                            accessibilityLabel="gender-switch-selector"
                        />

                        <ConditionalCard condition={toggle} steps={steps} products={products}/>


                    </SafeAreaView>

                </Animated.ScrollView>
            </SafeAreaView>
        ));
};
