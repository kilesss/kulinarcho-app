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
import {addRecipe, editRecipe, getCategories, updateList} from "../../RestRequests/generalRequest";
import {Formik} from "formik";
import {getProductTypeIcon} from "../../components/HelpFunctions";
import {rightSwipeActions} from "../../components/shoppingList/ShoppingListItem";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as yup from 'yup';
import {useIsFocused} from '@react-navigation/native'
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export default function AddEditRecipe({route}) {
    const isFocused = useIsFocused()

    const {recipeDetails, productList, stepList, edit} = route.params

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [image, setImage] = useState(null);

    const [product, setProduct] = useState("");
    const [amount, setAmount] = useState("");
    const [size, setSize] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(true)

    const [products, setProducts] = useState([]);
    const [step, setStep] = useState();
    const [steps, setSteps] = useState([]);

    const [categories, setCategories] = useState()
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    const [productsError, setProductsError] = useState('');
    const [stepsError, setStepsError] = useState('');
    const [valueError, setValueError] = useState('');


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const manipResult = await ImageManipulator.manipulateAsync(
            result.localUri || result.uri,
            [],
            { format: 'jpeg' }
        );
        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, { encoding: 'base64' });

        console.log(base64)
        console.log('asdasdasdasdasdasd')
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    

    function onInputChanged(changedText, set) {
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
        recipeDetails ? console.log("Loaded Details") : console.log("Didn't load")

        if (productList) {
            for (let product in productList) {
                let objCopy = {...productList[product]}
                objCopy['amount'] = objCopy['volume']
                objCopy['unitid'] = objCopy['unitId']
                setProducts(oldArray =>
                    [...oldArray, objCopy])
            }

        }

        if (stepList) {
            for (let step in stepList) {
                setSteps(oldArray => [...oldArray, {value: stepList[step].step, key: stepList[step].stepId}])
            }
        }

        if (recipeDetails.categories) {
            setValue(recipeDetails.categories)
        }

        loadData();
    }, [isFocused]);

    useEffect(() => {
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
                console.log(body);
                console.log(value);
                addRecipe(JSON.stringify(body), value).then()
                    .then(response => {
                        if (response.errors) {
                            const restErr = JSON.stringify(response.errors);
                            console.log(restErr);
                        }
                    })
            }
        })
    }

    async function editExistingRecipe(body) {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                editRecipe(JSON.stringify(body), value).then()
                    .then(response => {
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

    function onPressDeleteStep(e) {
        let newItemsList = [];
        Object.keys(steps).forEach(function (key) {
            if (steps[key] !== e) {
                newItemsList.push(steps[key])
            }
        })
        setSteps(newItemsList);
    }

    function resetOtherFields() {
        setProducts([])
        setSteps([])
        setValue('')
        setImage(null)
    }

    let schema = yup.object().shape({
        title: yup.string().min(3, "Поне 3 букви...").required("Заглавието е задължително поле"),
        preparation: yup.number().required('Задължително поле').positive().integer(),
        cooking: yup.number().required('Задължително поле').positive().integer(),
        total_time: yup.number().required('Задължително поле').positive().integer(),
        portions: yup.number().required('Задължително поле').positive().integer(),
    });


    return (renderLoading(showLoader,
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View
                style={{...styles.container, alignSelf: "stretch"}}>

                <RBSheet
                    ref={addStep}
                    height={310}
                    openDuration={200}
                    closeOnDragDown={true}
                    customStyles={{
                        container: {
                            backgroundColor: "#f5f5f5",
                            padding: 25,
                            paddingTop: 10,
                            justifyContent: "flex-start",
                            borderTopRightRadius: 25,
                            borderTopLeftRadius: 25,
                        }
                    }}>
                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 2}}>Стъпка</Text>
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
                                          setSteps(oldArray => [...oldArray, {value: step, key: steps.length + 1}])
                                          // setSteps(steps.concat(step))
                                          addStep.current.close()
                                      }}
                        />
                    </View>
                </RBSheet>


                <Formik
                    initialValues={{
                        title: recipeDetails ? recipeDetails.title : '',
                        public: recipeDetails ? recipeDetails.public : true,
                        preparation: recipeDetails.prep_time ? String(recipeDetails.prep_time) : '',
                        cooking: recipeDetails.cook_time ? String(recipeDetails.cook_time) : '',
                        total_time: recipeDetails.all_time ? String(recipeDetails.all_time) : '',
                        portions: recipeDetails.all_time ? String(recipeDetails.portion) : '',
                        description: recipeDetails ? recipeDetails.description : '',
                        video_link: ''
                    }}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        let stepsValues = steps.map(a => a.value);
                        let obj = {
                            id: recipeDetails.id,
                            portions: values.portions,
                            title: values.title,
                            time1: values.preparation,
                            time2: values.cooking,
                            time3: values.total_time,
                            description: values.description,
                            category: value,
                            textInputIngridients: products,
                            textInput: stepsValues,
                            photo: image,
                            public: values.public
                        }

                        products.length !== 0 ? setProductsError('') : setProductsError('Добавете продукти')
                        steps.length !== 0 ? setStepsError('') : setStepsError('Добавете стъпки')
                        value ? setValueError('') : setValueError('Изберете категория')


                        if (products && steps) {
                            if (edit) {
                                editExistingRecipe(obj).then(r => {
                                    actions.resetForm()
                                    resetOtherFields()
                                })
                            } else {
                                submitRecipe(obj).then(r => {
                                    actions.resetForm()
                                    resetOtherFields()
                                })
                            }
                        }

                    }}>
                    {(props) => (
                        <View style={{alignSelf: "stretch"}}>
                            <View style={{alignSelf: "stretch", alignItems: "center"}}>
                                {image && <Image
                                    source={{uri: image}}
                                    style={{width: "100%", height: 220, borderRadius: 8}}/>}
                            </View>
                            <Text style={{...styles.heading, marginBottom: -4, marginTop: 5}}>Снимка
                                <Text style={{color: "#15A051"}}>*</Text>
                            </Text>
                            <CustomButton
                                title={"Pick image..."}
                                onPress={pickImage}
                                padding={11}
                                txtColor={"#4B4C4C"}
                                bgColor={"#cccccc"}
                            />

                            <Text
                                style={{...styles.heading, marginBottom: -4, marginTop: 5}}>{language("title")}<Text
                                style={{color: "#15A051"}}>*</Text></Text>
                            <TextInput
                                style={{...styles.customButton, padding: 8}}
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                            />
                            <Text style={styles.errorMessage}>{props.errors.title}</Text>

                            <View style={stylesRecipes.addRecipeProductsContainer}>
                                <Text style={{
                                    ...styles.heading,
                                    marginBottom: 2,
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
                                {products.map((product, index) => {
                                    return (
                                        <Swipeable
                                            key={index}
                                            containerStyle={{paddingTop: 0}}
                                            renderRightActions={
                                                (progress, dragX) =>
                                                    rightSwipeActions(progress, dragX, () => onPressDeleteProduct(product), 42, 3)}
                                        >
                                            <ProductCard title={product.productName}
                                                         textRight={`${product.amount} ${product.unitsName}`}
                                                         image={getProductTypeIcon(product.catName)}
                                                         onPress={() => {
                                                             openPopUp(product.name, product.amount, product.unitid)
                                                         }}
                                            />
                                        </Swipeable>
                                    );
                                })}
                                <Text style={styles.errorMessage}>{productsError}</Text>
                            </SafeAreaView>


                            <View style={{...stylesRecipes.addRecipeProductsContainer, marginTop: 8}}>
                                <Text style={{...styles.heading, marginBottom: 2, flex: 1}}>{language("steps")}
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
                                {steps.map((step, index) => {
                                    return (
                                        <Swipeable
                                            key={index}
                                            containerStyle={{paddingTop: 0}}
                                            renderRightActions={
                                                (progress, dragX) =>
                                                    rightSwipeActions(progress, dragX, () => onPressDeleteStep(step), 42, 3)}
                                        >
                                            <View style={[stylesRecipes.productCard, {
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                            }]}>
                                                <Text
                                                    style={[styles.smallGreenText, {fontSize: 16}]}>Стъпка {steps.indexOf(step) + 1}</Text>
                                                <Text style={[styles.subHeading, {fontWeight: "regular"}]}>
                                                    {step.value}
                                                </Text>
                                            </View>
                                        </Swipeable>
                                    );
                                })}

                                <Text style={styles.errorMessage}>{stepsError}</Text>
                            </SafeAreaView>

                            <Text style={{...styles.heading, marginBottom: -4, marginTop: 10}}>{language("category")}
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
                                <Text style={styles.errorMessage}>{valueError}</Text>
                            </View>

                            <View style={stylesRecipes.addRecipeWrapContainer}>
                                <View style={{width: "47%"}}>
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: -4,
                                        marginTop: 10
                                    }}>{language("preparation")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 8}}
                                        keyboardType={"numeric"}
                                        onChangeText={props.handleChange('preparation')}
                                        value={props.values.preparation}
                                    />
                                    <Text style={styles.errorMessage}>{props.errors.preparation}</Text>
                                </View>
                                <View style={{width: "47%"}}>
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: -4,
                                        marginTop: 10
                                    }}>{language("cooking")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 8}}
                                        keyboardType={"numeric"}
                                        onChangeText={props.handleChange('cooking')}
                                        value={props.values.cooking}
                                    />
                                    <Text style={styles.errorMessage}>{props.errors.cooking}</Text>
                                </View>
                                <View style={{width: "47%"}}>
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: -4,
                                        marginTop: 10
                                    }}>{language("totalTime")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 8}}
                                        keyboardType={"numeric"}
                                        onChangeText={props.handleChange('total_time')}
                                        value={props.values.total_time}
                                    />
                                    <Text style={styles.errorMessage}>{props.errors.total_time}</Text>
                                </View>
                                <View style={{width: "47%"}}>
                                    <Text style={{
                                        ...styles.heading,
                                        marginBottom: -4,
                                        marginTop: 10
                                    }}>{language("portions")}<Text
                                        style={{color: "#15A051"}}>*</Text></Text>
                                    <TextInput
                                        style={{...styles.customButton, padding: 8}}
                                        // keyboardType={"numeric"}
                                        onChangeText={props.handleChange('portions')}
                                        value={props.values.portions}
                                    />
                                    <Text style={styles.errorMessage}>{props.errors.portions}</Text>
                                </View>
                            </View>

                            <Text style={{
                                ...styles.heading,
                                marginBottom: -4,
                                marginTop: 5
                            }}>{language("shortDescription")}</Text>
                            <TextInput
                                multiline={true}
                                style={{...styles.customButton, padding: 8, height: 125, textAlignVertical: "top"}}
                                onChangeText={props.handleChange('description')}
                                value={props.values.description}
                            />

                            <View
                                style={{...stylesRecipes.addRecipeProductsContainer, marginTop: 10, marginBottom: 10}}>
                                <Checkbox
                                    color={"#15A051"}
                                    style={{height: 30, width: 30, borderRadius: 20, marginBottom: 4}}
                                    boxType={'circle'}
                                    disabled={false}
                                    value={props.values.public}
                                    onValueChange={(newValue) => props.setFieldValue("public", newValue)}
                                />
                                <Text
                                    style={{
                                        ...styles.heading,
                                        marginBottom: 5,
                                        marginTop: 0,
                                        marginLeft: 5
                                    }}>{language("public")} Рецепта<Text style={{color: "#15A051"}}>*</Text></Text>
                            </View>

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
