import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from '../../styles/styles'
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from '../../language/language';
import {ShoppingListCard} from "../../components/display/ShoppingListCard";
import {CustomButton} from "../../components/display/CustomButton";
import AddShoppingListModal from "../../components/display/AddShoppingListModal";
import randomColor from '../../components/HelpFunctions'
import renderLoading from "../../components/loading/ShowLoader";
import {getShopingList} from "../../RestRequests/generalRequest";

export default function ShoppingListsPage({navigation}) {

    const [shoppingLists, editShoppingLists] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [changeModalVisible, setChangeModalVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                getShopingList('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        editShoppingLists(result)
                        setShowLoader(false);
                    }

                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }, []);
    
    const remove = (i) => {
        const arr = shoppingLists.filter((item) => item.key !== i);
        editShoppingLists(arr);
        setChangeModalVisible(!changeModalVisible)
    };

    const add = (text, numItems, bgColor) => {
        editShoppingLists((prevShoppingLists) => {
            setAddModalVisible(!addModalVisible)
            return [
                {key: Math.random().toString(), title: text, numItems: numItems, bgColor: bgColor},
                ...prevShoppingLists
            ]
        })
    }
    const change = (item) => {
        console.log("edit function")
    }

    const showEditProduct = (item) => {
        setChangeModalVisible(true)
        setModalData(item)
    };

    return renderLoading(showLoader, <View style={styles.container}>

        <AddShoppingListModal modalVisible={addModalVisible}
                              setModalVisible={setAddModalVisible}
                              modalTitle={language("newShoppingList")}
                              buttonTitle={language("add")}
                              showDeleteOption={false}
                              addFunctionality={add}
        />
        <AddShoppingListModal modalVisible={changeModalVisible}
                              setModalVisible={setChangeModalVisible}
                              modalTitle={language("editShoppingList")}
                              buttonTitle={language("change")}
                              modalData={modalData.name}
                              showDeleteOption={true}
                              deleteFunctionality={() => remove(modalData.id)}
        />
        <View style={stylesShoppingList.buttonWithTitle}>
            <View style={{flex: 2}}>
                <Text style={styles.heading}>{language("shoppingLists")}</Text>
            </View>
            <View>
                <CustomButton title={language("add")}
                              bgColor={"#15A051"}
                              txtColor={"#fff"}
                              padding={7}
                              onPress={() => setAddModalVisible(true)}
                />
            </View>
        </View>
        <FlatList data={shoppingLists}
                  style={{alignSelf: "stretch"}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                      <ShoppingListCard bgColor={randomColor(index)}
                                        title={item.name}
                                        numItems={item.count}
                                        onPress={() => navigation.navigate('Shopping List Details', {
                                            key: item.key,
                                            title: item.name,
                                        })}
                                        onPressEdit={() => {
                                            showEditProduct(item)
                                        }}
                      />
                  )}/>

    </View>)
}

