import {Alert, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "../display/CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {addEditProduct, AddEditProductType, deleteProduct, deleteProductTypes} from "../../RestRequests/generalRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";


function showDeleteIcon(show, onPress) {
    if (show) {
        return (<View style={shoppingListStyle.modalDeleteButton}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={onPress}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>{language("delete")}</Text>
                <MaterialIcons name={"delete"} size={23} color={"#fff"}/>
            </TouchableOpacity>
        </View>)
    } else {
        return <View></View>
    }
}


export default function EditProductTypesModal(
    {
        modalVisible,
        token,
        setModalVisible,
        modalTitle,
        buttonTitle,
        modalDataName,
        modalDataID,
        showDeleteOption,
        product,
        refresh,
        categories,
        modalDataTypesID
    })
{

    const canNotDeleteAlert = (restErr) =>
        Alert.alert(
            "Съществуващи Продукти",
            restErr.existing_recipes
        );

    async function submitNewProductType(text) {
        setModalVisible(!modalVisible)

        let requestBody = {
            name: text
        };
        if (modalDataID) {
            requestBody.id = modalDataID
        }
        await AddEditProductType(JSON.stringify(requestBody), token).then()
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
                setText('')
            })
        refresh()
    }

    async function deleteProductType(){
        await deleteProductTypes(JSON.stringify({id: modalDataID}), token).then()
            .then(response => {
                setModalVisible(!modalVisible)
                if (response.access_token) {
                    /** Set JWT  **/
                    AsyncStorage.setItem('access_token', response.access_token);
                }
                if (response.errors) {
                    const restErr = JSON.stringify(response.errors);

                    canNotDeleteAlert(response.errors)

                }
            })
        refresh()
    }

    async function submitNewProduct(text) {
        let requestBody = {
            name: text
        };
        if (modalDataID) {
            requestBody.id = modalDataID
        }
        value ? requestBody.typeId = value : ''
        await addEditProduct(JSON.stringify(requestBody), token).then()
            .then(response => {
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
        refresh()
    }

    async function deleteAProduct(){
        await deleteProduct(JSON.stringify({id: modalDataID}), token).then()
            .then(response => {
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
        refresh()
    }

    const [text, setText] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    useEffect(() => {
        setValue(modalDataTypesID)
    }, [modalDataTypesID]);



    function onInputChanged(changedText) {
        setText(changedText)
    }

    function defaultText() {
        if (text === '') {
            return modalDataName
        }
        return text;
    }
    return(
    <TouchableWithoutFeedback style={shoppingListStyle.outsideTouchable}
                              onPress={() => setModalVisible(!modalVisible)}>
        <Modal animationType="slide"
               transparent={true}
               visible={modalVisible}
               onRequestClose={() => {
                   setModalVisible(!modalVisible);
               }}>
            <View style={[styles.centeredView, {backgroundColor: "rgba(74,74,74,0.4)"}]}>
                <View style={stylesShoppingList.addListModal}>
                    {showDeleteIcon(showDeleteOption, () => product ? deleteAProduct() : deleteProductType())}
                    <View>
                        <Text style={[styles.heading, {marginBottom: -5}]}>{modalTitle}</Text>
                    </View>
                    {product ?
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
                        : ''
                    }

                    <TextInput
                        style={[{marginVertical: 20}, shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                        defaultValue={defaultText()}
                        placeholder={"Име..."}
                        onChangeText={(changedText) => onInputChanged(changedText)}
                    />
                    <CustomButton
                        onPress={() => {
                            product ? submitNewProduct(text).then(r => {}) : submitNewProductType(text).then(r => {})
                        }}
                        title={buttonTitle}
                        txtColor={"#fff"}
                        padding={10}
                    />
                    <Text onPress={() => {setModalVisible(!modalVisible)}}>
                        {language("cancel")}
                    </Text>
                </View>
            </View>
        </Modal>
    </TouchableWithoutFeedback>
    )
}
