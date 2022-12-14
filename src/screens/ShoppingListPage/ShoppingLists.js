import React, {useEffect, useState} from "react";
import {FlatList, Modal, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from '../../styles/styles'
import stylesShoppingList from "../../styles/stylesShoppingList";
import language from '../../language/language';
import {ListCard} from "../../components/display/ListCard";
import {CustomButton} from "../../components/display/CustomButton";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";
import randomColor from '../../components/HelpFunctions'
import renderLoading from "../../components/loading/ShowLoader";
import {firstLogin, getShopingList} from "../../RestRequests/generalRequest";
import FloatingActionButton from "../../components/display/FloatingActionButton";
import OnBoarding from "../../components/display/OnBoarding";
import {useIsFocused} from '@react-navigation/native'
import ExampleAdd from "../../components/ExampleAdd";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function ShoppingListsPage({navigation}) {

    const [shoppingLists, editShoppingLists] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [changeModalVisible, setChangeModalVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);

    const isFocused = useIsFocused()

    useEffect(() => {
        loadData();
    }, [isFocused]);

    const showEditProduct = (item) => {
        setModalData(item)
        setChangeModalVisible(true)
    };

    function setChangeModalVisible2() {
        setChangeModalVisible(!changeModalVisible)
        loadData();
    }

    const [onBoardingModal, setOnBoardingModal] = useState(false)

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                setDemoToken(value);
                getShopingList('GET', value).then(data => {
                    if (data) {
                        if (data.first_login === 1) {
                            setOnBoardingModal(true)

                        }
                        delete data.first_login;
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

    function closeOnBoardingModal() {
        setOnBoardingModal(false)
        firstLogin(DemoToken).then(r => {
        }).catch((err) => {
            console.log(err);
        });
    }


    function setAddModalVisible2() {
        setAddModalVisible(!addModalVisible)
        loadData();
    }


    return renderLoading(showLoader, <View style={{flex: 1}}>
        <View style={{...styles.container, marginBottom: 5}}>

            <Modal visible={onBoardingModal}>
                <OnBoarding closeOnBoardingModal={closeOnBoardingModal}/>
            </Modal>

            <AddShoppingListModal modalVisible={addModalVisible}
                                  setModalVisible={setAddModalVisible2}
                                  token={DemoToken}
                                  modalTitle={language("newShoppingList")}
                                  buttonTitle={language("add")}
                                  showDeleteOption={false}
            />
            <AddShoppingListModal modalVisible={changeModalVisible}
                                  setModalVisible={setChangeModalVisible2}
                                  token={DemoToken}
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
            <View style={{alignSelf: "stretch", flex: 1}}>
            <FlatList data={shoppingLists}
                      style={{alignSelf: "stretch", flex: 1, paddingBottom: 30}}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => (
                          <View>
                              {index !== 0 && index % 3 === 0 ? <ExampleAdd height={100}/> : ''}
                              {item !== 0 ?
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
                                  : ''}
                          </View>
                      )}/>
            {shoppingLists.length < 4 ? <ExampleAdd height={80}/> : ''}
            </View>


        </View>
        <FloatingActionButton navigation={navigation} addModalVisible={addModalVisible}
                              setAddModalVisible={setAddModalVisible}/>

    </View>)
}

