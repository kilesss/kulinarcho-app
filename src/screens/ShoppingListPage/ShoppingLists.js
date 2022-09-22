import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from '../../styles/styles'
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from '../../language/language';
import {ListCard} from "../../components/display/ListCard";
import {CustomButton} from "../../components/display/CustomButton";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";
import randomColor from '../../components/HelpFunctions'
import renderLoading from "../../components/loading/ShowLoader";
import {getShopingList} from "../../RestRequests/generalRequest";
import FloatingActionButton from "../../components/display/FloatingActionButton";

export default function ShoppingListsPage({navigation}) {

    const [shoppingLists, editShoppingLists] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [changeModalVisible, setChangeModalVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    useEffect(() => {
        console.log('ssssssssssss');
        loadData();
    }, []);

    const showEditProduct = (item) => {
        setChangeModalVisible(true)
        setModalData(item)
    };
 function setChangeModalVisible2(){
     setChangeModalVisible(!changeModalVisible)
     loadData();
 }

    function loadData(){
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                setDemoToken(value);
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
    }

    function setAddModalVisible2(){
        setAddModalVisible(!addModalVisible)
       loadData();
    }

    return renderLoading(showLoader, <View style={{flex: 1}}>
        <View style={styles.container}>

        <AddShoppingListModal modalVisible={addModalVisible}
                              setModalVisible={setAddModalVisible2}
                              token = {DemoToken}
                              modalTitle={language("newShoppingList")}
                              buttonTitle={language("add")}
                              showDeleteOption={false}
        />
        <AddShoppingListModal modalVisible={changeModalVisible}
                              setModalVisible={setChangeModalVisible2}
                              token = {DemoToken}
                              modalTitle={language("editShoppingList")}
                              buttonTitle={language("change")}
                              modalData={modalData.name}
                              modalId={modalData.id}
                              showDeleteOption={true}
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
                      <ListCard bgColor={randomColor(index)}
                                title={item.name}
                                iconName={"receipt"}
                                numItems={item.count}
                                onPress={() => navigation.navigate('Shopping List Details', {
                                            key: item.id,
                                            title: item.name,
                                        })}
                                onPressEdit={() => {
                                            showEditProduct(item)
                                        }}
                      />
                  )}/>

    </View>
        <FloatingActionButton navigation={navigation} addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible}/>
    </View>)
}

