import {Alert, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "../display/CustomButton";
import {MaterialIcons} from "@expo/vector-icons";
import {useState} from "react";

function showDeleteIcon(show, onPress) {
    if (show) {
        return (<View style={shoppingListStyle.modalDeleteButton}>
            <TouchableOpacity style={{flexDirection:'row'}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>{language("delete")}</Text>
                <MaterialIcons name={"delete"} size={23} color={"#fff"}/>
            </TouchableOpacity>
        </View>)
    } else {
        return <View></View>
    }
}


export default function EditProductsCategoriesModal({ modalVisible,
                                         setModalVisible,
                                         modalTitle,
                                         buttonTitle,
                                         modalData,
                                         deleteFunctionality,
                                         showDeleteOption})
{
    const [text, setText] = useState("")

    function onInputChanged(changedText) {
        setText(changedText)
    }

    function defaultText() {
        if (text === '') {
            return modalData
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
                    {showDeleteIcon(showDeleteOption, deleteFunctionality)}
                    <View>
                        <Text style={[styles.heading, {marginBottom: -5}]}>{modalTitle}</Text>
                    </View>

                    <TextInput
                        style={[{marginVertical: 20}, shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                        defaultValue={defaultText()}
                        placeholder={"Име..."}
                        onChangeText={(changedText) => onInputChanged(changedText)}
                    />
                    <CustomButton
                        onPress={() => setModalVisible(!modalVisible)}
                        title={buttonTitle}
                        txtColor={"#fff"}
                        padding={10}
                    />
                    <Text onPress={() => setModalVisible(!modalVisible)}>
                        {language("cancel")}
                    </Text>
                </View>
            </View>
        </Modal>
    </TouchableWithoutFeedback>
    )
}
