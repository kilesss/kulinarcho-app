import {Button, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as React from "react";

import RBSheet from "react-native-raw-bottom-sheet";
import {useEffect, useRef, useState} from "react";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import Checkbox from "expo-checkbox";
import language from "../../language/language";
import {stylesRecipes} from "../../styles/stylesRecipes";
import {ProductCard} from "../../components/display/ProductCard";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {AddProductPopup} from "./AddProductPopup";
import DropDownPicker from 'react-native-dropdown-picker';
import {loadData} from "../../components/HelpFunctions";
import renderLoading from "../../components/loading/ShowLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories} from "../../RestRequests/generalRequest";

export default function AddEditRecipe() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: '1'},
        {label: 'Banana', value: '2'},
        {label: 'Apple', value: '3'},
        {label: 'Banana', value: '4'},
        {label: 'Apple', value: '5'},
        {label: 'Banana', value: '6'},

    ]);

    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    function onInputChanged(changedText, set, text) {
        console.log(changedText)
        set(text)
    }

    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [size, setSize] = useState("");


    const addProduct = useRef();
    const openAddProduct = (item) => {
        setProduct(item)
        setAmount(item)
        setSize(item)
        addProduct.current.open()
    };

    const addStep = useRef();


    const [categories, setCategories] = useState([])
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getCategories('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        for(let i of result){
                            console.log({label: i.title, value: i.id})
                            setCategories(oldArray => [...oldArray, {label: i.title, value: i.id}] );
                        }
                        console.log(categories)
                        console.log(items)
                        setShowLoader(false);
                    }

                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadData(setCategories, setShowLoader, setDemoToken);
    }, []);



    return (
        renderLoading(showLoader, <ScrollView>

            <View style={{...styles.container, alignSelf: "stretch"}}>

                <RBSheet
                    ref={addStep}
                    height={300}
                    openDuration={200}
                    customStyles={{
                        container: {
                            backgroundColor: "#f5f5f5",
                            padding: 25,
                            justifyContent: "flex-start",
                            borderTopRightRadius: 25,
                            borderTopLeftRadius: 25,
                        }
                    }}
                >
                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Стъпка</Text>
                    <TextInput multiline={true}
                               style={{...styles.customButton, padding: 10, height: 140, textAlignVertical: "top"}}/>

                    <View style={{...shoppingListStyle.popupButtons, marginRight: 0, marginTop: 15}}>
                        <Text style={{marginRight: 15}} onPress={() => addStep.current.close()}>
                            {language("cancel")}
                        </Text>
                        <CustomButton title={"Добави"}
                                      padding={10}
                                      txtColor={"#fff"}/>
                    </View>

                </RBSheet>


                <View style={{alignSelf: "stretch", alignItems: "center"}}>
                    {image && <Image source={{uri: image}} style={{width: "100%", height: 220, borderRadius: 8}}/>}
                </View>
                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Снимка<Text
                    style={{color: "#15A051"}}>*</Text></Text>
                <CustomButton title={"Pick image..."} onPress={pickImage} padding={12} txtColor={"#4B4C4C"}
                              bgColor={"#cccccc"}/>

                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("title")}<Text
                    style={{color: "#15A051"}}>*</Text></Text>
                <TextInput style={{...styles.customButton, padding: 10}}/>

                <View style={stylesRecipes.addRecipeProductsContainer}>
                    <Checkbox color={"#15A051"}/>
                    <Text style={{...styles.heading, marginBottom: 5, marginTop: -3, marginLeft: 5}}>{language("public")}
                        рецепта<Text style={{color: "#15A051"}}>*</Text></Text>
                </View>

                <View style={stylesRecipes.addRecipeProductsContainer}>
                    <Text style={{...styles.heading, marginBottom: 0, flex: 1}}>{language("products")}<Text
                        style={{color: "#15A051"}}>*</Text></Text>
                    <CustomButton title={language("add")}
                                  txtColor={"#fff"}
                                  padding={5}
                                  onPress={() => addProduct.current.open()}/>
                </View>

                <ProductCard title={product}
                             icon={"carrot"}
                             iconColor={"#c5550f"}
                             textRight={amount}
                             onPress={() => openAddProduct("hello")}
                />

                <View style={stylesRecipes.addRecipeProductsContainer}>
                    <Text style={{...styles.heading, marginBottom: 0, flex: 1}}>{language("steps")}<Text
                        style={{color: "#15A051"}}>*</Text></Text>
                    <CustomButton title={language("add")}
                                  txtColor={"#fff"}
                                  padding={5}
                                  onPress={() => addStep.current.open()}
                    />
                </View>

                {/*Steps*/}
                <View style={[stylesRecipes.productCard, {flexDirection: "column", alignItems: "flex-start"}]}>
                    <Text style={[styles.smallGreenText, {fontSize: 16}]}>Стъпка 1</Text>
                    <Text style={[styles.subHeading, {fontWeight: "regular"}]}>
                        Просто тест бе
                    </Text>
                </View>

                <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("category")}<Text
                    style={{color: "#15A051"}}>*</Text></Text>
                <View>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={categories}
                    setOpen={setOpen}
                    setValue={setValue}
                    listMode={"SCROLLVIEW"}
                    listItemLabelStyle={{
                        color: "#4B4C4C",
                    }}
                    setItems={setItems}
                    style={{...styles.customButton, padding: 10, borderWidth: 0}}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        elevation: 3,
                        shadowColor: "#888"
                    }}
                />
                </View>

                <View style={stylesRecipes.addRecipeWrapContainer}>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("preparation")}<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}} keyboardType={"numeric"}/>
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("cooking")}<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}} keyboardType={"numeric"}/>
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("totalTime")}<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}} keyboardType={"numeric"}/>
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("portions")}<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}} keyboardType={"numeric"}/>
                    </View>
                </View>

                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("description")}</Text>
                <TextInput multiline={true}
                           style={{...styles.customButton, padding: 10, height: 140, textAlignVertical: "top"}}/>


                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("videoLink")}</Text>
                <TextInput style={{...styles.customButton, padding: 10, marginBottom: 15}}/>

                <CustomButton title={language("add")} txtColor={"#fff"}/>



                <AddProductPopup ref={addProduct} product={product} amount={amount} size={size}/>

            </View>
        </ScrollView>
        ));
}
