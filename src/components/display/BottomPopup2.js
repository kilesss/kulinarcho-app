import {Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "./CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import React, {useState} from "react";

// Component for Modal on shopping lists page
export default function BottomPopup2 ({
                                             modalVisible,
                                             setModalVisible,
                                             price,
                                             amount,
                                             product,
                                             title
                                              })
{

    const [txtProduct, setProduct] = useState(" ")
    const [txtAmount, setAmount] = useState(" ")
    const [txtPrice, setPrice] = useState(" ")

    function onInputChanged(changedText, set, text) {
        console.log(changedText)
        set(text)
    }




    return (
        <Modal animationType="slide"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                   setModalVisible(!modalVisible);
               }}>
            <TouchableWithoutFeedback style={shoppingListStyle.outsideTouchable}
                                      onPress={() => {
                                          setModalVisible(!modalVisible)
                                      }}>
                <View style={{backgroundColor: "rgba(74,74,74,0.4)", flex:1, justifyContent:"flex-end"}}>
                    <View style={shoppingListStyle.popup}>
                        <Text style={shoppingListStyle.popupTitle}>{title}</Text>

                        <View>
                            <View style={shoppingListStyle.popupPrice}>
                                <TextInput style={[shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                                           placeholder={"e.g. Broccoli"}
                                           value={{txtProduct}}
                                           onChange={({changedText}) => onInputChanged(changedText, setProduct, txtProduct)}
                                />
                            </View>
                            <View style={shoppingListStyle.popupAmount}>
                                <Text>{language("amount")}</Text>
                                <TextInput style={shoppingListStyle.popupInput}
                                           value={{txtAmount}}
                                           onChange={({changedText}) => onInputChanged(changedText, setAmount, txtAmount)}
                                           placeholder={"2"}
                                />
                            </View>

                            <View style={shoppingListStyle.popupPrice}>
                                <Text>{language("price")}</Text>
                                <TextInput style={shoppingListStyle.popupInput}
                                           value={{txtPrice}}
                                           onChange={({changedText}) => {onInputChanged(changedText, setPrice, txtPrice)}}
                                           placeholder={"e.g. 3лв"}/>
                            </View>

                            <View style={shoppingListStyle.popupButtons}>
                                <Text style={{marginRight: 15}} >
                                    {language("cancel")}
                                </Text>

                                <CustomButton title={title}
                                              txtColor={"#fff"}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}