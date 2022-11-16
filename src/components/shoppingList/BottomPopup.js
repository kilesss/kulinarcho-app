import {Modal, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "../display/CustomButton";
import React, {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getProducts} from "../../RestRequests/generalRequest";

// Component for Modal on shopping lists page
export default function BottomPopup({
                                        modalVisible,
                                        setModalVisible,
                                        price,
                                        newProduct,
                                        amount,
                                        returnData,
                                        product,
                                        description,
                                        finalPrice,
                                        title
                                    }) {

    const [txtProduct, setProduct] = useState("")
    let [txtAmount, setAmount] = useState("")
    let [txtPrice, setPrice] = useState("")
    let [txtDescription, setDescription] = useState("")
    const [txtFinalPrice, setFinalPrice] = useState("")
    const [selectedItem, setSelectedItem] = useState(null);
    const [item, setItem] = useState([]);

    useEffect(() => {
        if (amount) {
            setAmount(amount);
        }
        if (price) {
            setPrice(price);
        }
        if (description) {
            setDescription(description);
        }
        if (finalPrice) {
            setFinalPrice(finalPrice)
        }
        loadProducts();

    },[modalVisible]);
    const onInputChanged = function (changedText, set) {

        changedText = changedText.replace(',', '.')
        var final = '';
        if (set === 'amount') {
            setAmount(changedText)
            final = (parseFloat(changedText) * parseFloat(txtPrice)).toFixed(2)
        } else if (set === 'price') {
            setPrice(changedText)
            final = (parseFloat(changedText) * parseFloat(txtAmount)).toFixed(2)
        }
        if (isNaN(final)) {
            final = '0.00';
        }
        setFinalPrice(final);
    }


    function loadProducts() {
//load only once
        if (item.length === undefined || item.length === 0) {
            AsyncStorage.getItem('access_token').then((value) => {
                if (value) {
                    getProducts('GET', value).then(data => {
                        var arr = [];
                        if (data) {
                            Object.keys(data).map(function (key) {
                                arr.push({id: data[key].id.toString(), title: data[key].name},)
                            })
                            setItem(arr);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }, []);
        }
    }

    function resetFields(){
        setPrice('');
        setSelectedItem(null);
        setAmount('');
        setProduct('');
        setFinalPrice('0');
        setItem('');
        setDescription('');

    }

    function submitProduct() {
        returnData({
            price: txtPrice,
            finalPrice: txtFinalPrice,
            amount: txtAmount,
            productId: newProduct,
            newProductId: selectedItem,
            description: txtDescription
        })


        setModalVisible(!modalVisible);
    }


    function showDifferentButtonText() {
        if (newProduct === undefined) {
            return 'saveProduct';
        } else {
            return 'buyProduct';

        }
    }

    function showDifferentFields() {
        if (newProduct === undefined) {
            return <AutocompleteDropdown
                containerStyle={{width: '100%', zIndex: 10}}
                clearOnFocus={false}
                closeOnBlur={true}

                closeOnSubmit={false}
                initialValue={{}} // or just '2'
                onSelectItem={setSelectedItem}
                dataSet={item}
            />
        }
        return <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>{product}</Text>
    }

    function closeModal() {
        resetFields()
        setModalVisible(false)
    }

    return (
        <Modal animationType="slide"
               transparent={true}
               visible={modalVisible}
               // onShow={() => resetFields()}
               onRequestClose={() => closeModal()}
        >
            <TouchableWithoutFeedback style={shoppingListStyle.outsideTouchable}>
                <View style={{backgroundColor: "rgba(74,74,74,0.4)", flex: 1, justifyContent: "flex-end"}}>
                    <View style={shoppingListStyle.popup}>
                        <Text style={shoppingListStyle.popupTitle}>{language(title)}</Text>

                        <View>
                            <View style={{marginBottom: 10}}>
                                {showDifferentFields()}
                            </View>

                            <View style={{...shoppingListStyle.popupDescription}}>
                                <View>
                                    <Text style={styles.subHeading}>{language("description")}: </Text>
                                </View>

                                <View>
                                    <TextInput style={{...styles.customButton, padding: 8, alignSelf: "stretch"}}
                                               value={txtDescription}
                                               onChangeText={changedText => setDescription(changedText)}

                                               placeholder={""}
                                    />
                                </View>
                            </View>


                            <View style={{zIndex: 5}}>
                                <View style={{flexDirection: "row"}}>
                                    <View style={shoppingListStyle.popupAmount}>
                                        <Text style={styles.subHeading}>{language("amount")}</Text>
                                        <TextInput style={{...styles.customButton, padding: 8, alignSelf: "stretch"}}
                                                   value={txtAmount}
                                                   keyboardType={"number-pad"}
                                                   onChangeText={changedText => setAmount(changedText)}
                                                   placeholder={"0"}
                                        />
                                    </View>

                                    <View style={shoppingListStyle.popupPrice}>
                                        <Text style={styles.subHeading}>{language("price")}</Text>
                                        <TextInput style={{...styles.customButton, padding: 8, alignSelf: "stretch"}}
                                                   value={txtPrice}
                                                   keyboardType={"number-pad"}
                                                   onChangeText={changedText => onInputChanged(changedText, 'price')}
                                                   placeholder={"0лв"}/>
                                    </View>
                                </View>

                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#15A051', 'rgba(21,160,81,0.35)']}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}

                                    style={{height: 3, marginVertical: 15, marginBottom: -5}}
                                />

                                <View style={{flexDirection: "row", alignSelf: "flex-end", paddingBottom: 7}}>
                                    <Text style={styles.heading}>{language("price")}</Text>
                                    <Text style={{...styles.heading, color: "#15A051"}}>{txtFinalPrice} лв</Text>
                                </View>

                                <View style={{flexDirection: "row", alignSelf: "flex-end", alignItems: "center"}}>
                                    <Text style={{marginRight: 15}} onPress={() => closeModal()}>
                                        {language("cancel")}
                                    </Text>

                                    <CustomButton title={language(showDifferentButtonText())}
                                                  txtColor={"#fff"}
                                                  onPress={submitProduct}
                                                  padding={10}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}
