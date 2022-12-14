import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import styles from '../../styles/styles'
import {ListCard} from "../../components/display/ListCard";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";
import language from "../../language/language";
import renderLoading from "../../components/loading/ShowLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getWeeklyMenus,deleteWeekMenu} from "../../RestRequests/generalRequest";
import getRandomColor from "../../components/HelpFunctions";
import FloatingActionButton from "../../components/display/FloatingActionButton";
import {CustomButton} from "../../components/display/CustomButton";
import stylesShoppingList from "../../styles/stylesShoppingList";
import ExampleAdd from "../../components/ExampleAdd";
import * as navigation from "expo-updates";

export default function WeekMenuPage({navigation}) {
    const [changeModalVisible, setChangeModalVisible] = useState(false);

    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [modalID, setModalID] = useState(0);

    const [menus, setMenus] = useState([]);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getWeeklyMenus('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setMenus(result)
                        setShowLoader(false);
                    }

                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadData();

    }, []);


    return (
        renderLoading(showLoader, <>
            <View style={{...styles.container, marginBottom: 5}}>
                <AddShoppingListModal modalVisible={changeModalVisible}
                                      setModalVisible={setChangeModalVisible}
                                      typeRequest = {"week_menu"}
                                      modalTitle={language("changeWeekMenu")}
                                      buttonTitle={language("change")}
                                      showDeleteOption={true}
                                      modalId={modalID}
                                      goBack={() => loadData()}

                />
                <View style={stylesShoppingList.buttonWithTitle}>
                    <View style={{flex: 2}}>
                        <Text style={styles.heading}>{language("weeklyMenu")}</Text>
                    </View>
                    <View>
                        <CustomButton title={language("add")}
                                      bgColor={"#15A051"}
                                      txtColor={"#fff"}
                                      padding={7}
                                      onPress={() => navigation.navigate("Week Menu Create")}
                        />
                    </View>
                </View>

                <FlatList
                    data={menus}
                    style={{alignSelf: 'stretch'}}
                    renderItem={({item, index}) => (
                        <View>
                            {index !== 0 && index % 2 === 0 ? <ExampleAdd height={150}/> : ''}
                            <ListCard period={`${item.beginDate} - ${item.endDate}`}
                                      iconName={"calendar"}
                                      title={item.title}
                                      bgColor={getRandomColor(index)}
                                      onPress={() => navigation.navigate('Week Menu Details', {id: item.id})}
                                      onPressEdit={() => {
                                          setModalID(item.id)
                                          setChangeModalVisible(!changeModalVisible)
                                      }}
                            />
                        </View>
                    )}/>
                {menus ? menus.length < 2 ? <ExampleAdd height={70}/> : '' : '' }
            </View>
            <FloatingActionButton navigation={navigation} addModalVisible={addModalVisible}
                                  setAddModalVisible={setAddModalVisible}/>
            <AddShoppingListModal modalVisible={addModalVisible}
                                  setModalVisible={setAddModalVisible}
                                  token={DemoToken}
                                  modalTitle={language("newShoppingList")}
                                  buttonTitle={language("add")}
                                  showDeleteOption={false}
                                  goBack={() => navigation.navigate("Shopping List")}
            />
        </>)
    );
}
