import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import {stylesRecipes} from "../../styles/stylesRecipes";
import shoppingListStyle from "../../styles/stylesShoppingList";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import RBSheet from "react-native-raw-bottom-sheet";
import * as React from "react";
import {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import {ProductCard} from "../../components/display/ProductCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCategories, getProducts, getUnits} from "../../RestRequests/generalRequest";
import {Formik} from "formik";

export const AddProductPopup = React.forwardRef((
        {
            product,
            amount,
            size,
            getSelectedProduct
        }, ref) => {

        const [showLoader, setShowLoader] = useState(true);
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([]);
        const [productInput, setProduct] = useState("");
        const [amountInput, setAmount] = useState("");
        const [hint, setHint] = useState("");
        const [error, setError] = useState("");
        const [amountError, setErrorAmount] = useState(null);
        const [unitError, setErrorUnit] = useState(null);

        const [units, setUnits] = useState([]);
        const [open2, setOpen2] = useState(false);
        const [valueUnit, setValueUnit] = useState(null);


        function loadData() {
            AsyncStorage.getItem('access_token').then((value) => {
                if (value) {
                    getProducts('GET', value).then(data => {
                        if (data) {
                            const result = Object.values(data);
                            let arr = []
                            result.forEach(item =>
                                arr.push({label: item.name, value: item.id, types: item.types}))
                            setItems(arr)
                            setShowLoader(false);
                        }
                    }).catch((err) => {
                        console.log(JSON.stringify(err));
                    });
                    getUnits('GET', value).then(data => {
                        if (data) {
                            const result = Object.values(data);
                            let arr = []
                            result.forEach(item =>
                                arr.push({...item, label: item.name, value: item.id, types: item.types}))
                            setUnits(arr)
                        }
                    }).catch((err) => {
                        console.log(JSON.stringify(err));
                    });
                }
            }, []);
        }

        useEffect(() => {
            loadData();
            setProduct(product)
        }, []);

        useEffect(() => {
            setProduct(product)
        }, [product]);

        useEffect(() => {
            value ? setError('') : null;
            amountInput ? setErrorAmount('') : null;
            valueUnit ? setErrorUnit('') : null;
        }, [value, valueUnit, amountInput]);

        function constructItem(value2) {
            let obj = items.find(obj => {
                return obj.value === value2
            })
            let objCopy = {...obj}
            let unitName = units.find(unitName => {
                return unitName.value === valueUnit
            })
            objCopy['productName'] = objCopy['label'];
            delete objCopy['label'];
            objCopy['amount'] = amountInput
            objCopy['unitid'] = valueUnit
            objCopy['unitsName'] = unitName.label
            objCopy['hint'] = hint
            objCopy['productId'] = objCopy['value']
            delete objCopy['value'];
            objCopy['catName'] = objCopy['types']
            delete objCopy['types'];
            console.log(objCopy)
            ref.current.close()
            return objCopy
        }

        function onInputChanged(changedText, set) {
            set(changedText)
        }

        function handleOnClose(){
            setValue(null)
            setValueUnit('')
            setAmount('')
            setError('')
            setErrorUnit('')
            setErrorAmount('')
        }


        return (
            <RBSheet
                ref={ref}
                height={420}
                openDuration={200}
                closeOnDragDown={true}
                onClose={() => {handleOnClose()}}
                customStyles={{
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: "#f5f5f5",
                        paddingHorizontal: 30,
                        paddingTop: 10,
                        justifyContent: "flex-start",
                    }
                }}
            >
                <Text style={{...styles.heading, marginBottom: 0, marginTop: 2}}>{language("product")}</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    listMode={"MODAL"}
                    modalTitle={"Избери Продукт"}
                    searchable={true}
                    modalContentContainerStyle={{
                        backgroundColor: "#f2f2f2",
                        padding: 20
                    }}
                    listItemLabelStyle={{
                        color: "#4B4C4C",
                    }}

                    addCustomItem={true}

                    style={{...styles.customButton, padding: 10, borderWidth: 0}}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        elevation: 3,
                        shadowColor: "#888"
                    }}
                />

                <Text style={styles.errorMessage}>{error}</Text>

                <View style={stylesRecipes.addRecipeWrapContainer}>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 8}}>{language("amount")}</Text>
                        <TextInput
                            style={{...styles.customButton, padding: 10}}
                            defaultValue={amountInput}
                            onChangeText={(changedText) => onInputChanged(changedText, setAmount)}
                        />
                        <Text style={styles.errorMessage}>{amountError}</Text>
                    </View>
                    <View style={{width: "47%"}}>
                        <Text
                            style={{...styles.heading, marginBottom: 0, marginTop: 8}}>{language("portionType")}</Text>
                        <DropDownPicker
                            open={open2}
                            value={valueUnit}
                            items={units}
                            setOpen={setOpen2}
                            setValue={setValueUnit}
                            listMode={"SCROLLVIEW"}
                            listItemLabelStyle={{
                                color: "#4B4C4C",
                            }}
                            style={{...styles.customButton, padding: 10, borderWidth: 0}}
                            dropDownContainerStyle={{
                                borderWidth: 0,
                                elevation: 3,
                                shadowColor: "#888",
                                height: 170,
                            }}
                        />
                        <Text style={styles.errorMessage}>{unitError}</Text>
                    </View>
                </View>

                <View>
                    <Text
                        style={{...styles.heading, marginBottom: 0, marginTop: 6}}>{language("hint")}</Text>
                    <TextInput
                        style={{...styles.customButton, padding: 10}}
                        onChangeText={(changedText) => onInputChanged(changedText, setHint)}
                    />
                </View>


                <View style={{...shoppingListStyle.popupButtons, marginRight: 0, marginTop: 15}}>
                    <Text style={{marginRight: 15}} onPress={() => ref.current.close()}>
                        {language("cancel")}
                    </Text>
                    <CustomButton title={"Добави"}
                                  padding={10}
                                  txtColor={"#fff"}
                                  onPress={() => {
                                      value ? setError('') : setError('Изберте продукт')
                                      valueUnit ? setErrorUnit('') : setErrorUnit('Изберете разфасовка')
                                      valueUnit && value ? getSelectedProduct(constructItem(value)) : console.log("required fields")
                                  }}
                    />
                </View>

            </RBSheet>
        )
    }
)
