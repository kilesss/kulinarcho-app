import React, {useState} from "react";
import {Button, ScrollView, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import styles from '../../styles/styles'
import {ListCard} from "../../components/display/ListCard";
import AddShoppingListModal from "../../components/display/AddShoppingListModal";
import language from "../../language/language";
import CookCard from "../../components/display/CookCard";

export default function WeekMenuPage({navigation}) {
    const [changeModalVisible, setChangeModalVisible] = useState(false);
    const menus = [
        {name: "Some Weekly Menu 1", period: "25/08-30/08", bgColor: "#a433c7"},
        {name: "Some Weekly Menu 1", period: "25/08-30/08", bgColor: "#3f78be"},
        {name: "Some Weekly Menu 1", period: "25/08-30/08", bgColor: "#08a260"},
        {name: "Some Weekly Menu 1", period: "25/08-30/08", bgColor: "#d7710a"},
        {name: "Some Weekly Menu 1", period: "25/08-30/08", bgColor: "#a6a6a6"}
    ]
    return (
        <ScrollView>
            <View style={{...styles.container, alignItems: "flex-start", justifyContent: "flex-start"}}>
                <AddShoppingListModal modalVisible={changeModalVisible}
                                      setModalVisible={setChangeModalVisible}

                                      modalTitle={"change list name"}
                                      buttonTitle={language("change")}

                                      showDeleteOption={true}
                />
                <Text style={styles.heading}>{language("weeklyMenu")}</Text>

                {menus.map((menu) => {
                    return (
                        <ListCard period={menu.period}
                                  iconName={"calendar"}
                                  title={menu.name}
                                  bgColor={menu.bgColor}
                                  onPress={() => navigation.navigate('Week Menu Details')}
                                  onPressEdit={() => setChangeModalVisible(!changeModalVisible)}
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
}
