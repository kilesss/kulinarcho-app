import {Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "../display/CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {deleteList, updateList,deleteWeekMenu} from "../../RestRequests/generalRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import renderLoading from "../loading/ShowLoader";
import * as navigation from "expo-updates";



// Component for Modal on shopping lists page
export default function AddShoppingListModal({
                                                 modalVisible,
                                                 setModalVisible,
                                                 typeRequest,
                                                 modalTitle,
                                                 token,
                                                 buttonTitle,
                                                 modalData,
                                                 modalId,
                                                 deleteFunctionality,
                                                 showDeleteOption,
                                                 goBack,
                                             }) {
    const [text, setText] = useState("")
    const [id] = useState("")
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('asdasdasd');
        });
        return unsubscribe;
    }, [navigation]);
    async function  deleteShoppingList(){
        setShowLoader(true);
        await deleteList(JSON.stringify({id: modalId}), token).then()
            .then(response => {
                setShowLoader(false);
                setModalVisible(!modalVisible)
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

    async function deleteWeekMen(){
        setShowLoader(true);
        await deleteWeekMenu(JSON.stringify({id: modalData.id}), token).then()
            .then(response => {
                console.log(response);
                setShowLoader(false);
                setModalVisible(!modalVisible)
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

    function deleteRequest(){
        if (typeRequest === 'week_menu'){

            deleteWeekMen().then(r => {})
            console.log(modalId,modalData);
        }else{
            deleteShoppingList().then(r => {});
        }
    }

// Determines whether to show delete button or not
    function showDeleteIcon(show, onPress) {
        if (show) {
            return (<View style={shoppingListStyle.modalDeleteButton}>
                <TouchableOpacity onPress={deleteRequest} style={{flexDirection:'row'}}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>Изтрий</Text>
                    <MaterialIcons name={"delete"} size={23} color={"#fff"}/>
                </TouchableOpacity>
            </View>)
        } else {
            return <View></View>
        }
    }
    async function submitNewShoppingList(text) {
        setShowLoader(true);

        var requestBody = {
            name: text, isShared: true
        };
        if (modalId !== '') {
            requestBody.id = modalId
        }
        await updateList(JSON.stringify(requestBody), token).then()
            .then(response => {
                console.log(JSON.stringify(requestBody))
                setShowLoader(false);
                if(goBack){goBack()}
                setModalVisible(!modalVisible)
                if (response.access_token) {
                    /** Set JWT  **/
                    AsyncStorage.setItem('access_token', response.access_token);
                }
                if (response.errors) {
                    const restErr = JSON.stringify(response.errors);
                    //TODO: connect with error messages
                    console.log(restErr);
                }
                setText('')
            })
    }

    function onInputChanged(changedText) {
        setText(changedText)
    }

    function defaultText() {
        if (modalData) {
            return modalData
        }
        return text;
    }

    return renderLoading(showLoader,<Modal animationType="slide"
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
                            defaultValue={modalData ? modalData : text}
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
