import {Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "./CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";

// Determines whether to show delete button or not
function showDeleteIcon(show, onPress){
    if(show){
        return (
            <TouchableOpacity onPress={onPress}>
                <MaterialIcons name={"delete"} size={30} color={"red"} />
            </TouchableOpacity>
        )
    }else{
        return <View></View>
    }
}

// Component for Modal on shopping lists page
export default function AddShoppingListModal ({ modalVisible,
                                         setModalVisible,
                                         modalTitle,
                                         buttonTitle,
                                         modalData,
                                         deleteFunctionality,
                                         showDeleteOption,
                                         addFunctionality,
                                         changeFunctionality
                                     })
{
    const [text, setText] = useState("")

    useEffect(() => {
        setText(modalData)
    });

    function onInputChanged(changedText) {
        console.log(changedText)
        setText(text)
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
            <View style={[styles.centeredView, {backgroundColor: "rgba(74,74,74,0.4)"}]}>
                <View style={stylesShoppingList.addListModal}>
                    {showDeleteIcon(showDeleteOption, deleteFunctionality)}
                    <View>
                        <Text style={[styles.heading, styles]}>{modalTitle}</Text>
                    </View>

                    <TextInput
                        style={[{marginVertical: 30}, shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                        defaultValue={text}
                        placeholder={"Име за списъка..."}
                        onChangeText={(changedText) => onInputChanged(changedText)}
                    />
                    <CustomButton
                        onPress={() => {
                            if(addFunctionality) {
                                addFunctionality(text, 2, `#${Math.floor(Math.random() * 16777215).toString(16)}`)
                            }else {
                                console.log(modalData)
                            }
                        }}
                        title={buttonTitle}
                        txtColor={"#fff"}
                        padding={10}
                    />
                    <Text onPress={() => setModalVisible(!modalVisible)}>
                        {language("cancel")}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
    )
}