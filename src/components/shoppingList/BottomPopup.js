import {Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "../display/CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
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
        if (txtAmount === "") {
            setAmount(amount);
        }
        if (txtPrice === "") {
            setPrice(price);
        }
        if (txtDescription === "") {
            setDescription(description);
        }
        if (txtFinalPrice === "") {
            setFinalPrice(finalPrice)
        }
        loadProducts();

    });
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

    function submitProduct() {
        returnData({
            price: txtPrice,
            finalPrice: txtFinalPrice,
            amount: txtAmount,
            productId: newProduct,
            newProductId: selectedItem,
            description: txtDescription        })

        setPrice('');
        setSelectedItem(null);
        setAmount('');
        setProduct('');
        setFinalPrice('');
        setItem('');
        setDescription('');
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

                onChangeText={(data) => {
                    console.log(data)
                }}
                closeOnSubmit={false}
                initialValue={{}} // or just '2'
                onSelectItem={setSelectedItem}
                dataSet={item}
            />
        }
        return <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', width: '100%'}}>{product}</Text>
    }
function closeModal(){
    setPrice('');
    setSelectedItem(null);
    setAmount('');
    setProduct('');
    setFinalPrice('');
    setItem('');
    setDescription('');

}
    return (
        <Modal animationType="slide"
               transparent={true}
               visible={modalVisible}
        >
            <TouchableWithoutFeedback style={shoppingListStyle.outsideTouchable}
                                      onPressOut={() => { closeModal()}}
                                      onPress={() => {
                                          setModalVisible(!modalVisible)
                                      }}>
                <View style={{backgroundColor: "rgba(74,74,74,0.4)", flex: 1, justifyContent: "flex-end"}}>
                    <View style={shoppingListStyle.popup}>
                        <Text style={shoppingListStyle.popupTitle}>{language(title)}</Text>

                        <View>
                            <View style={{...shoppingListStyle.popupPrice}}>
                                {showDifferentFields()}
                            </View>
                            <View style={{...shoppingListStyle.popupPrice}}>
                                <View>
                                    <Text style={{fontSize: 16}}>{language("description")}: </Text>
                                </View>

                                <View>
                                    <TextInput style={{...shoppingListStyle.popupInput, flex: 1}}
                                               value={txtDescription}
                                               onChangeText={changedText => setDescription(changedText)}

                                               placeholder={""}
                                    />
                                </View>
                            </View>
                            <View style={{zIndex: 5}}>
                                <View style={shoppingListStyle.popupAmount}>
                                    <Text style={{fontSize: 16}}>{language("amount")}</Text>
                                    <TextInput style={shoppingListStyle.popupInput}
                                               value={txtAmount}
                                               onChangeText={changedText => onInputChanged(changedText, 'amount')}

                                               placeholder={"2"}
                                    />
                                </View>

                                <View style={shoppingListStyle.popupPrice}>
                                    <Text style={{fontSize: 16}}>{language("price")}</Text>
                                    <TextInput style={shoppingListStyle.popupInput}
                                               value={txtPrice}

                                               onChangeText={changedText => onInputChanged(changedText, 'price')}

                                               placeholder={"e.g. 3лв"}/>
                                </View>

                                <LinearGradient
                                    // Background Linear Gradient
                                    colors={['#15A051', 'rgba(21,160,81,0.35)']}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}

                                    style={{height: 2, margin: 10, marginBottom: -5}}
                                />

                                <View style={shoppingListStyle.popupPrice}>
                                    <Text style={{fontSize: 16, fontWeight: "bold"}}>{language("price")}</Text>
                                    <Text style={{fontSize: 16, fontWeight: "bold"}}>{txtFinalPrice} лв</Text>
                                </View>

                                <View style={shoppingListStyle.popupButtons}>
                                    <Text style={{marginRight: 15}}>
                                        {language("cancel")}
                                    </Text>

                                    <CustomButton title={language(showDifferentButtonText())}
                                                  txtColor={"#fff"}
                                                  onPress={submitProduct}
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
