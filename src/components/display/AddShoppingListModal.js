import {Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "./CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {updateList} from "../../RestRequests/generalRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Determines whether to show delete button or not
function showDeleteIcon(show, onPress) {
    if (show) {
        return (<View style={shoppingListStyle.modalDeleteButton}>
                <TouchableOpacity onPress={onPress} style={{flexDirection: 'row'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>Изтрий</Text>
                    <MaterialIcons name={"delete"} size={23} color={"#fff"}/>
                </TouchableOpacity>
            </View>)
    } else {
        return <View></View>
    }
}

// Component for Modal on shopping lists page
export default function AddShoppingListModal({
                                                 modalVisible,
                                                 setModalVisible,
                                                 modalTitle,
                                                 token,
                                                 buttonTitle,
                                                 modalData,
                                                 modalId,
                                                 deleteFunctionality,
                                                 showDeleteOption,
                                             }) {
    const [text, setText] = useState("")
    const [id] = useState("")


    async function submitNewShoppingList(text) {

        var requestBody = {
            name: text, isShared: true
        };
        if (modalId !== '') {
            requestBody.id = id
        }
        await updateList(JSON.stringify(requestBody), token).then()
            .then(response => {
                if (response.access_token) {
                    /** Set JWT  **/
                    AsyncStorage.setItem('access_token', response.access_token);
                }
                if (response.errors) {
                    const restErr = JSON.stringify(response.errors);
                    //TODO: connect with error messages
                    console.log(restErr);
                }
            })
    }

    function onInputChanged(changedText) {
        setText(changedText)
    }

    function defaultText() {
        if (text === '') {
            return modalData
        }
        return text;
    }

    return (<Modal animationType="slide"
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
                            <Text style={{...styles.heading, marginBottom: -5}}>{modalTitle}</Text>
                        </View>

                        <TextInput
                            style={[{marginVertical: 25}, shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                            defaultValue={defaultText()}
                            placeholder={"Име за списъка..."}
                            onChangeText={(changedText) => onInputChanged(changedText)}
                        />
                        <CustomButton
                            onPress={() => {
                                submitNewShoppingList(text).then(r => {
                                })
                            }} asd
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
        </Modal>)
}
