import {Image, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
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
import renderLoading from "../../components/loading/ShowLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addEditRecipe, getCategories, updateList} from "../../RestRequests/generalRequest";
import {Formik} from "formik";
import {getProductTypeIcon} from "../../components/HelpFunctions";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function AddEditRecipe() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [image, setImage] = useState(null);

    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [size, setSize] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [products, setProducts] = useState([]);
    const [step, setStep] = useState("");
    const [steps, setSteps] = useState([]);

    const [categories, setCategories] = useState()
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    const pickImage = async () => {
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

    function onInputChanged(changedText, set) {
        console.log(changedText)
        set(changedText)
    }

    const addProduct = useRef();

    const addStep = useRef();

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getCategories('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        let arr = []
                        result.forEach(item =>
                            arr.push({label: item.title, value: item.id}))

                        setCategories(arr)
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

    useEffect(() => {
        // console.log(products)
    }, [products]);


    const getSelectedProduct = (product) => {
        let joined = products.concat(product);
        setProducts(joined)
    }

    function openPopUp({name, amount, units}) {
        setProduct(name)
        setAmount(amount)
        setSize(units)
        addProduct.current.open()
    }

    async function submitRecipe(body) {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {

                addEditRecipe(JSON.stringify(body), value).then()
                    .then(response => {
                        console.log(response)
                        if (response.errors) {
                            const restErr = JSON.stringify(response.errors);
                            console.log(restErr);
                        }
                    })
            }
        })
    }

    function onPressDeleteProduct(i) {
        let newItemsList = [];
        Object.keys(products).forEach(function (key) {
            if (products[key] !== i) {
                newItemsList.push(products[key])
            }
        })
        setProducts(newItemsList);
    }

    return (renderLoading(showLoader,
        <ScrollView>
            <View
                style={{...styles.container, alignSelf: "stretch"}}>

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
                    }}>
                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Стъпка</Text>
                    <TextInput
                        multiline={true}
                        style={{...styles.customButton, padding: 10, height: 140, textAlignVertical: "top"}}
                        defaultValue={step}
                        onChangeText={(changedText) => onInputChanged(changedText, setStep)}
                    />

                    <View style={{...shoppingListStyle.popupButtons, marginRight: 0, marginTop: 15}}>
                        <Text
                            style={{marginRight: 15}}
                            onPress={() => addStep.current.close()}>
                            {language("cancel")}
                        </Text>
                        <CustomButton title={"Добави"}
                                      padding={10}
                                      txtColor={"#fff"}
                                      onPress={() => {
                                          setSteps(steps.concat(step))
                                          addStep.current.close()
                                      }}
                        />
                    </View>
                </RBSheet>


                <Formik
                    initialValues={{
                        title: '', public: false, preparation: '',
                        cooking: '', total_time: '', portions: '', description: '', video_link: ''
                    }}
                    onSubmit={(values) => {
//                         let body =
//                             `{
//     "portions":"${values.portions}",
//     "title":"${values.title}",
//     "time1":"${values.preparation}",
//     "time2":"${values.cooking}",
//     "time3":"${values.total_time}",
//     "description":${JSON.stringify(values.description)},
//     "category":"${value}",
//     "textInputIngridients":${JSON.stringify(products)},
//     "textInput": ${JSON.stringify(steps)},
//     "photo":"",
//     "public":"${toggleCheckBox}"
// }`

                        let obj = {
                            portions: values.portions,
                            title: values.title,
                            time1: values.preparation,
                            time2: values.cooking,
                            time3: values.total_time,
                            description: values.description,
                            category: value,
                            textInputIngridients: products,
                            textInput: steps,
                            photo: '',
                            public: toggleCheckBox
                        }


                        submitRecipe(obj).then(r => console.log(r))


                    }}>
                    {(props) => (
                        <View style={{alignSelf: "stretch"}}>
                            <View style={{alignSelf: "stretch", alignItems: "center"}}>
                                {image && <Image
                                    source={{uri: image}}
                                    style={{width: "100%", height: 220, borderRadius: 8}}/>}
                            </View>
                            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Снимка
                                <Text style={{color: "#15A051"}}>*</Text>
                            </Text>
                            <CustomButton
                                title={"Pick image..."}
                                onPress={pickImage}
                                padding={12}
                                txtColor={"#4B4C4C"}
                                bgColor={"#cccccc"}
                            />

                            <Text
                                style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("title")}<Text
                                style={{color: "#15A051"}}>*</Text></Text>
                            <TextInput
                                style={{...styles.customButton, padding: 10}}
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                            />

                            <View style={stylesRecipes.addRecipeProductsContainer}>
                                <Checkbox
                                    color={"#15A051"}
                                    style={{height: 30, width: 30, borderRadius: 20, marginBottom: 4}}
                                    boxType={'circle'}
                                    disabled={false}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                />
                                <Text
                                    style={{
                                        ...styles.heading,
                                        marginBottom: 5,
                                        marginTop: 0,
                                        marginLeft: 5
                                    }}>{language("public")} Рецепта<Text style={{color: "#15A051"}}>*</Text></Text>
                            </View>

                            <View style={stylesRecipes.addRecipeProductsContainer}>
                                <Text style={{
                                    ...styles.heading,
                                    marginBottom: 0,
                                    flex: 1
                                }}>{language("products")}<Text
                                    style={{color: "#15A051"}}>*</Text></Text>
                                <CustomButton
                                    title={language("add")}
                                    txtColor={"#fff"}
                                    padding={5}
                                    onPress={() => addProduct.current.open()}
                                />
                            </View>

                            <SafeAreaView>
                                {products.length !== 0 ? '' :
                                    <Text style={{paddingVertical: 10}}>No products selected yet...</Text>}
                                {products.map((product) => {
                                    return (
                                        <Swipeable
                                            containerStyle={{paddingTop: 0}}
                                            renderRightActions={
                                                (progress, dragX) =>
                                                    rightSwipeActions(progress, dragX, () => onPressDeleteProduct(product), 42, 3)}
                                        >
                                            <ProductCard title={product.name}
                                                         textRight={`${product.amount} ${product.unitid}`}
                                                         image={getProductTypeIcon(product.types)}
                                                         onPress={() => {
                                                             openPopUp(product.name, product.volume, product.unitid)
                                                         }}
                                            />
                                        </Swipeable>
                                    );
                                })}
                            </SafeAreaView>


                            <View style={stylesRecipes.addRecipeProductsContainer}>
                                <Text style={{...styles.heading, marginBottom: 0, flex: 1}}>{language("steps")}
                                    <Text style={{color: "#15A051"}}>*</Text>
                                </Text>
                                <CustomButton
                                    title={language("add")}
                                    txtColor={"#fff"}
                                    padding={5}
                                    onPress={() => addStep.current.open()}
                                />
                            </View>

                            <SafeAreaView>
                                {steps.length !== 0 ? '' :
                                    <Text style={{paddingVertical: 10}}>No steps added yet...</Text>}
                                {steps.map((step) => {
                                    return (
                                        <Swipeable
                                            containerStyle={{paddingTop: 0}}
                                            renderRightActions={
                                                (progress, dragX) =>
                                                    rightSwipeActions(progress, dragX, () => onPressDeleteStep(step), 42, 3)}
                                        >
                                            <View style={[stylesRecipes.productCard, {
                                                flexDirection: "column",
                                                alignItems: "flex-start"
                                            }]}>
                                                <Text
                                                    style={[styles.smallGreenText, {fontSize: 16}]}>Стъпка {steps.indexOf(step) + 1}</Text>
                                                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>
                                                    {step}
                                                </Text>
                                            </View>
                                        </Swipeable>
                                    );
                                })}
                            </SafeAreaView>

                            <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("category")}
                                <Text style={{color: "#15A051"}}>*</Text>
                            </Text>
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
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: 0,
                                        marginTop: 10
                                    }}>{language("preparation")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 10}}
                                        keyboardType={"numeric"}
                                        onChangeText={props.handleChange('preparation')}
                                        value={props.values.preparation}
                                    />
                                </View>
                                <View style={{width: "47%"}}>
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: 0,
                                        marginTop: 10
                                    }}>{language("cooking")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 10}}
                                        keyboardType={"numeric"}
                                        onChangeText={props.handleChange('cooking')}
                                        value={props.values.cooking}
                                    />
                                </View>
                                <View style={{width: "47%"}}>
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: 0,
                                        marginTop: 10
                                    }}>{language("totalTime")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 10}}
                                        keyboardType={"numeric"}
                                        onChangeText={props.handleChange('total_time')}
                                        value={props.values.total_time}
                                    />
                                </View>
                                <View style={{width: "47%"}}>
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: 0,
                                        marginTop: 10
                                    }}>{language("portions")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 10}}
                                        keyboardType={"numeric"}
                                        onChangeText={props.handleChange('portions')}
                                        value={props.values.portions}
                                    />
                                </View>
                            </View>

                            <Text style={{
                                ...styles.heading,
                                marginBottom: 0,
                                marginTop: 5
                            }}>{language("description")}</Text>
                            <TextInput
                                multiline={true}
                                style={{...styles.customButton, padding: 10, height: 140, textAlignVertical: "top"}}
                                onChangeText={props.handleChange('description')}
                                value={props.values.description}
                            />

                            <CustomButton
                                title={language("add")}
                                txtColor={"#fff"}
                                onPress={props.handleSubmit}
                            />

                        </View>
                    )}
                </Formik>

            </View>
            <AddProductPopup
                ref={addProduct}
                product={product}
                amount={amount}
                size={size}
                getSelectedProduct={getSelectedProduct}
            />
        </ScrollView>
    ));
}
