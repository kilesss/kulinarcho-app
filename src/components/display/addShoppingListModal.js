import {Alert, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../../styles/styles";
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from "../../language/language";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "./CustomButton";
import {MaterialIcons} from "@expo/vector-icons";

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


export const AddShoppingListModal = ({ modalVisible,
                                         setModalVisible,
                                         modalTitle,
                                         buttonTitle,
                                         modalData,
                                         deleteFunctionality,
                                         showDeleteOption}) => (
    <TouchableWithoutFeedback style={shoppingListStyle.outsideTouchable}
                              onPress={() => {setModalVisible(false)}}>
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
                        <Text style={[styles.heading, styles]}>{modalTitle}</Text>
                    </View>

                    <TextInput style={[{marginVertical: 30},shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                               value={modalData}
                               placeholder={"Име за списъка..."}
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