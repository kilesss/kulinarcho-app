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
import {MenuProvider} from "react-native-popup-menu";
import Images from "../../../public/images";
import {getIconInfo} from "../../components/HelpFunctions";

export default function RecipeDetails({route, navigation}) {



    const scrollA = useRef(new Animated.Value(0)).current;

    const [toggle, setToggle] = useState(false)

    const cook = {key: 1, name: "Bob Marley", recipes: 420}

    const {recipeId} = route.params;
    const [recipeDetails, setRecipeDetails] = useState([])
    const [steps, setSteps] = useState([])
    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState([])
    const [showLoader, setShowLoader] = useState(true);
    const [iconInfo, setIconInfo] = useState('');
    const [DemoToken, setDemoToken] = useState(true);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getSingleRecipe('GET', value, recipeId).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setRecipeDetails(result[0])
                        setProducts(result[1])
                        setSteps(Object.values(result[2]))
                        setUserData(result[4])
                        // console.log(result[0].categories)
                        setShowLoader(false);
                        setIconInfo(getIconInfo(result[0].categories))
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
        renderLoading(showLoader,
            <MenuProvider>
            <SafeAreaView>
                <TopNavigation
                    recipeDetails={recipeDetails}
                    products={products}
                    steps={steps}
                    scrollA={scrollA}
                    navigation={navigation}
                    onPressBack={() => navigation.goBack()}
                />

                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollA}}}],
                        {useNativeDriver: true},
                    )}
                    scrollEventThrottle={16}>

                    <View style={stylesRecipes.recipeDetailsBanner}>
                        <Animated.Image
                            style={stylesRecipes.banner(scrollA)}
                            source={
                                recipeDetails.photo ?
                                    {uri: 'https://kulinarcho.com' + recipeDetails.photo,}
                                    : Images.defaultRecipe
                        }
                        />

                    </View>

                    <SafeAreaView style={stylesRecipes.recipeDetails}>

                        <View style={stylesRecipes.topLine}/>

                        <View style={stylesRecipes.headingSection}>
                            <Text style={styles.bigHeading}>{recipeDetails.title}</Text>
                            <View style={stylesRecipes.timeSection}>
                                <MaterialCommunityIcons name={"progress-clock"} size={25} color={"#4B4C4C"}/>
                                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>{recipeDetails.all_time} {language("min")}</Text>
                            </View>
                        </View>
                        {/*TODO: Fix the category not showing up correctly*/}
                        <Text style={{color:"#4B4C4C"}}>Категория: <Text style={{color: "#15A051", fontWeight: "bold"}}>{iconInfo.title}</Text>
                        </Text>

                        <View style={stylesRecipes.portionsSection}>
                            <MaterialCommunityIcons name={"pot-mix-outline"} size={30} color={"#4B4C4C"}/>
                            <Text style={[styles.subHeading, {fontWeight: "regular"}]}>{recipeDetails.portion} {language("servings")}</Text>
                        </View>

                        <Text style={[styles.subHeading, stylesRecipes.paragraph]}>{recipeDetails.description}</Text>

                        <CookCard name={userData.name}
                                  hideNumRecipes={true}
                                  numRecipes={userData.count}
                                  image={userData.picture}
                                  onPress={() => navigation.navigate("Cooks Details", {cookId: userData.id})}/>

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
            </MenuProvider>
        ));
};
