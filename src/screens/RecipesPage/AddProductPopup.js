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
import {getCategories, getProducts} from "../../RestRequests/generalRequest";
import {Formik} from "formik";

export const AddProductPopup = React.forwardRef((
        {
            product,
            amount,
            size,
            getSelectedProduct
        }, ref) => {

        const [showLoader, setShowLoader] = useState(true);

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
                        console.log(err);
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

        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([]);
        const [productInput, setProduct] = useState("");
        const [amountInput, setAmount] = useState("");
        const [sizeInput, setSize] = useState("");


        function constructItem(value2) {
            let obj = items.find(obj => {
                return obj.value === value2
            })
            let objCopy = {...obj}
            objCopy['name'] = objCopy['label'];
            delete objCopy['label'];
            objCopy['amount'] = amountInput
            objCopy['unitid'] = "2"
            objCopy['hint'] = "need add hint option"
            objCopy['productId'] = objCopy['value']
            delete objCopy['value'];
            ref.current.close()
            return objCopy
        }

        function onInputChanged(changedText, set) {
            console.log(changedText)
            set(changedText)
        }

        function defaultText() {
            if (amountInput === '') {
                return amount
            }
            return amountInput;
        }


    return (
            <RBSheet
                ref={ref}
                height={310}
                openDuration={200}
                closeOnDragDown={true}
                onClose={() => setValue(null)}
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
                <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("product")}</Text>
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

                    // renderListItem={(props) => (
                    //     <TouchableOpacity onPress={{}}>
                    //         <ProductCard title={props.label}/>
                    //     </TouchableOpacity>
                    // )}
                    style={{...styles.customButton, padding: 10, borderWidth: 0}}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        elevation: 3,
                        shadowColor: "#888"
                    }}
                />

                <View style={stylesRecipes.addRecipeWrapContainer}>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("amount")}</Text>
                        <TextInput
                            style={{...styles.customButton, padding: 10}}
                            defaultValue={amountInput}
                            onChangeText={(changedText) => onInputChanged(changedText, setAmount)}
                        />
                    </View>
                    <View style={{width: "47%"}}>
                        <Text
                            style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("portionType")}</Text>
                        <TextInput
                            style={{...styles.customButton, padding: 10}}
                            defaultValue={sizeInput}
                            onChangeText={(changedText) => onInputChanged(changedText, setSize)}
                        />
                    </View>
                </View>


                <View style={{...shoppingListStyle.popupButtons, marginRight: 0, marginTop: 15}}>
                    <Text style={{marginRight: 15}} onPress={() => ref.current.close()}>
                        {language("cancel")}
                    </Text>
                    <CustomButton title={"Добави"}
                                  padding={10}
                                  txtColor={"#fff"}
                                  onPress={() => getSelectedProduct(constructItem(value))}
                    />
                </View>

            </RBSheet>
        )
    }
)
