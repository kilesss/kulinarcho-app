import React, {useState} from 'react'
import {View, Text, FlatList, SafeAreaView} from 'react-native'
import {stylesRecipes} from "../../styles/stylesRecipes";
import styles from "../../styles/styles";
import {ProductCard} from "../display/ProductCard";
import SettingsCardLarge from "./SettingsCardLarge";
import {stylesProfile} from "../../styles/stylesProfile";
import {CustomButton} from "../display/CustomButton";
import language from "../../language/language";
import EditProductsCategoriesModal from "./EditProductsCategoriesModal";
import {getProductTypeIcon} from "../HelpFunctions";


export const ProductsCategoriesToggle = ({condition, categories, products}) => {
    let content
    let add
    let change

    const [text, setText] = useState("")
    const [modalData, setModalData] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [changeModalVisible, setChangeModalVisible] = useState(false);

    const showEdit = (item) => {
        setChangeModalVisible(true)
        setModalData(item)
    };



    if (condition) {
        add = language("addProduct")
        change = language("edit")
        content = (
            <View style={{alignSelf: "stretch"}}>
                <CustomButton title={add} txtColor={"#fff"}
                              onPress={() => setAddModalVisible(!addModalVisible)}
                />

                <SafeAreaView>
                    {products.map((product) => {
                        return (
                            <ProductCard title={product.title}
                                         textRight={product.amount}
                                         icon={product.icon}
                                         iconColor={product.color}
                                         onPress={() => showEdit(product)}
                            />
                        )
                    })}
                </SafeAreaView>
            </View>
        )
    } else {
        add = language("addCategory")
        change = language("edit")
        content = (
            <View style={{alignSelf: "stretch"}}>
                <CustomButton title={add} txtColor={"#fff"}
                              onPress={() => {setAddModalVisible(!addModalVisible)}}
                />
                <SafeAreaView style={stylesProfile.largeSettingsSection}>
                    {categories.map((category) => {
                        return (
                            <SettingsCardLarge name={category.name}
                                               image={getProductTypeIcon(category.name)}
                                               onPress={() => showEdit(category)}
                            />
                        );
                    })}
                </SafeAreaView>
            </View>
        )
    }

    return (
        <View style={{alignSelf: "stretch"}}>

            {content}
            <EditProductsCategoriesModal modalVisible={addModalVisible}
                                  setModalVisible={setAddModalVisible}
                                  modalTitle={add}
                                  buttonTitle={language("add")}
                                  showDeleteOption={false}
            />

            <EditProductsCategoriesModal modalVisible={changeModalVisible}
                                         setModalVisible={setChangeModalVisible}
                                         modalTitle={change}
                                         buttonTitle={change}
                                         showDeleteOption={true}
                                         modalData={modalData.title}
            />

        </View>
    )
}
