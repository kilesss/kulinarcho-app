import React, {useEffect, useState} from "react";
import {Button, FlatList, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import {ListCard} from "../../components/display/ListCard";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";
import language from "../../language/language";
import CookCard from "../../components/display/CookCard";
import renderLoading from "../../components/loading/ShowLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getWeeklyMenus} from "../../RestRequests/generalRequest";
import getRandomColor from "../../components/HelpFunctions";
import FloatingActionButton from "../../components/display/FloatingActionButton";

export default function WeekMenuPage({navigation}) {
    const [changeModalVisible, setChangeModalVisible] = useState(false);

    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [addModalVisible, setAddModalVisible] = useState(false);

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

                                      modalTitle={"change list name"}
                                      buttonTitle={language("change")}

                                      showDeleteOption={true}
                />
                <Text style={styles.heading}>{language("weeklyMenu")}</Text>

                <FlatList
                    data={menus}
                    style={{alignSelf: 'stretch'}}
                    renderItem={({item, index}) => (
                        <ListCard period={`${item.beginDate} - ${item.endDate}`}
                                  iconName={"calendar"}
                                  title={item.title}
                                  bgColor={getRandomColor(index)}
                                  onPress={() => navigation.navigate('Week Menu Details', {id: item.id})}
                                  onPressEdit={() => setChangeModalVisible(!changeModalVisible)}
                        />
                    )}/>
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
