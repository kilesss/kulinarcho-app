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
import Images from "../../../public/images";


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
                <CustomButton
                    title={add}
                    txtColor={"#fff"}
                    padding={12}
                    onPress={() => setAddModalVisible(!addModalVisible)}
                />
                <SafeAreaView>
                    <FlatList
                        data={products}
                        style={{height: "89%"}}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({item}) => (
                            <ProductCard title={item.name}
                                         textRight={item.amount}
                                         image={getProductTypeIcon(item.types)}
                                         iconColor={item.color}
                                         onPress={() => showEdit(item)}
                            />
                        )}/>
                </SafeAreaView>
            </View>
        )
    } else {
        add = language("addCategory")
        change = language("edit")
        content = (
            <View style={{alignSelf: "stretch"}}>
                <CustomButton
                    title={add}
                    txtColor={"#fff"}
                    padding={12}
                    onPress={() => {
                        setAddModalVisible(!addModalVisible)
                    }}
                />
                <View>
                <FlatList
                    data={categories}
                    numColumns={2}
                    style={{height: "89%"}}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    columnWrapperStyle={{justifyContent: "space-between"}}
                    renderItem={({item}) => (
                        <SettingsCardLarge name={item.name}
                                           image={getProductTypeIcon(item.name)}
                                           onPress={() => showEdit(item)}
                        />
                    )}/>
                </View>
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
